export interface SunPosition {
  azimuthDegrees: number;
  elevationDegrees: number;
}

export interface ShadowOffset {
  eastMeters: number;
  northMeters: number;
  lengthMeters: number;
}

export type BuildingGeometry =
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] };

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
const toDegrees = (radians: number) => (radians * 180) / Math.PI;
const normalizeDegrees = (degrees: number) => ((degrees % 360) + 360) % 360;

export function getSunPosition(
  latitudeDegrees: number,
  longitudeDegrees: number,
  date: Date
): SunPosition {
  if (
    !Number.isFinite(latitudeDegrees) ||
    latitudeDegrees < -90 ||
    latitudeDegrees > 90 ||
    !Number.isFinite(longitudeDegrees) ||
    longitudeDegrees < -180 ||
    longitudeDegrees > 180 ||
    Number.isNaN(date.getTime())
  ) {
    throw new RangeError('A valid coordinate and date are required.');
  }

  const julianDay = date.getTime() / 86_400_000 + 2_440_587.5;
  const century = (julianDay - 2_451_545) / 36_525;
  const meanLongitude = normalizeDegrees(
    280.46646 + century * (36_000.76983 + century * 0.0003032)
  );
  const meanAnomaly =
    357.52911 + century * (35_999.05029 - 0.0001537 * century);
  const eccentricity =
    0.016708634 - century * (0.000042037 + 0.0000001267 * century);
  const anomalyRadians = toRadians(meanAnomaly);
  const equationOfCenter =
    Math.sin(anomalyRadians) *
      (1.914602 - century * (0.004817 + 0.000014 * century)) +
    Math.sin(2 * anomalyRadians) * (0.019993 - 0.000101 * century) +
    Math.sin(3 * anomalyRadians) * 0.000289;
  const trueLongitude = meanLongitude + equationOfCenter;
  const omega = 125.04 - 1934.136 * century;
  const apparentLongitude =
    trueLongitude - 0.00569 - 0.00478 * Math.sin(toRadians(omega));
  const meanObliquity =
    23 +
    (26 +
      (21.448 - century * (46.815 + century * (0.00059 - century * 0.001813))) /
        60) /
      60;
  const obliquity = meanObliquity + 0.00256 * Math.cos(toRadians(omega));
  const declination = Math.asin(
    Math.sin(toRadians(obliquity)) * Math.sin(toRadians(apparentLongitude))
  );
  const y = Math.tan(toRadians(obliquity) / 2) ** 2;
  const longitudeRadians = toRadians(meanLongitude);
  const equationOfTime =
    4 *
    toDegrees(
      y * Math.sin(2 * longitudeRadians) -
        2 * eccentricity * Math.sin(anomalyRadians) +
        4 *
          eccentricity *
          y *
          Math.sin(anomalyRadians) *
          Math.cos(2 * longitudeRadians) -
        0.5 * y ** 2 * Math.sin(4 * longitudeRadians) -
        1.25 * eccentricity ** 2 * Math.sin(2 * anomalyRadians)
    );
  const utcMinutes =
    date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  const solarMinutes =
    (((utcMinutes + equationOfTime + 4 * longitudeDegrees) % 1440) + 1440) %
    1440;
  const hourAngle = toRadians(solarMinutes / 4 - 180);
  const latitudeRadians = toRadians(latitudeDegrees);
  const cosZenith =
    Math.sin(latitudeRadians) * Math.sin(declination) +
    Math.cos(latitudeRadians) * Math.cos(declination) * Math.cos(hourAngle);
  const elevationDegrees =
    90 - toDegrees(Math.acos(Math.max(-1, Math.min(1, cosZenith))));
  const azimuthDegrees = normalizeDegrees(
    toDegrees(
      Math.atan2(
        Math.sin(hourAngle),
        Math.cos(hourAngle) * Math.sin(latitudeRadians) -
          Math.tan(declination) * Math.cos(latitudeRadians)
      )
    ) + 180
  );

  return { azimuthDegrees, elevationDegrees };
}

export function getShadowOffsetMeters(
  heightMeters: number,
  sunAzimuthDegrees: number,
  sunElevationDegrees: number
): ShadowOffset | null {
  if (
    !Number.isFinite(heightMeters) ||
    heightMeters < 0 ||
    !Number.isFinite(sunAzimuthDegrees) ||
    !Number.isFinite(sunElevationDegrees) ||
    sunElevationDegrees < -90 ||
    sunElevationDegrees > 90
  ) {
    throw new RangeError('Valid height and sun angles are required.');
  }
  if (heightMeters === 0 || sunElevationDegrees <= 0) return null;

  const lengthMeters = heightMeters / Math.tan(toRadians(sunElevationDegrees));
  const shadowDirection = toRadians(sunAzimuthDegrees + 180);

  return {
    eastMeters: lengthMeters * Math.sin(shadowDirection),
    northMeters: lengthMeters * Math.cos(shadowDirection),
    lengthMeters,
  };
}

// shortcut: convex hull fills footprint recesses; replace with polygon union if local shade accuracy is validated.
export function projectShadowPolygons(
  geometry: BuildingGeometry,
  offset: ShadowOffset | null
): number[][][][] {
  if (!offset) return [];

  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  const earthRadiusMeters = 6_378_137;

  return polygons.flatMap(polygon => {
    const ring = polygon[0];
    if (!ring || ring.length < 4) return [];

    const originLongitude = ring[0][0];
    const originLatitude = ring[0][1];
    const latitudeScale = Math.cos(toRadians(originLatitude));
    const points = ring.slice(0, -1).map(([longitude, latitude]) => ({
      x:
        toRadians(longitude - originLongitude) *
        earthRadiusMeters *
        latitudeScale,
      y: toRadians(latitude - originLatitude) * earthRadiusMeters,
    }));
    const candidates = points.flatMap(point => [
      point,
      { x: point.x + offset.eastMeters, y: point.y + offset.northMeters },
    ]);
    const sorted = candidates.sort((a, b) => a.x - b.x || a.y - b.y);
    const cross = (
      origin: (typeof sorted)[number],
      point: (typeof sorted)[number],
      next: (typeof sorted)[number]
    ) =>
      (point.x - origin.x) * (next.y - origin.y) -
      (point.y - origin.y) * (next.x - origin.x);
    const lower: typeof sorted = [];
    const upper: typeof sorted = [];

    for (const point of sorted) {
      while (
        lower.length >= 2 &&
        cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
      ) {
        lower.pop();
      }
      lower.push(point);
    }
    for (const point of [...sorted].reverse()) {
      while (
        upper.length >= 2 &&
        cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
      ) {
        upper.pop();
      }
      upper.push(point);
    }

    const hull = [...lower.slice(0, -1), ...upper.slice(0, -1)].map(point => [
      originLongitude +
        toDegrees(point.x / (earthRadiusMeters * latitudeScale)),
      originLatitude + toDegrees(point.y / earthRadiusMeters),
    ]);
    if (hull.length < 3) return [];
    hull.push(hull[0]);
    return [[hull]];
  });
}
