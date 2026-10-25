import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getSunPosition,
  getShadowOffsetMeters,
  projectShadowPolygons,
} from '../src/lib/sunPosition.ts';

test('Trece sun is nearly overhead and north at local noon on the June solstice', () => {
  const sun = getSunPosition(
    14.2828,
    120.8667,
    new Date('2026-06-21T04:00:00Z')
  );

  assert.ok(Math.min(sun.azimuthDegrees, 360 - sun.azimuthDegrees) < 3);
  assert.ok(Math.abs(sun.elevationDegrees - 80.9) < 0.5);
});

test('a 10 m object at 45 degrees casts a 10 m shadow opposite the sun', () => {
  const shadow = getShadowOffsetMeters(10, 90, 45);

  assert.ok(shadow);
  assert.ok(Math.abs(shadow.eastMeters + 10) < 1e-9);
  assert.ok(Math.abs(shadow.northMeters) < 1e-9);
});

test('shadow length increases as the sun gets lower', () => {
  const morning = getShadowOffsetMeters(10, 90, 30);
  const noon = getShadowOffsetMeters(10, 90, 60);

  assert.ok(morning);
  assert.ok(noon);
  assert.ok(morning.lengthMeters > noon.lengthMeters);
});

test('objects have no sun-cast shadow when the sun is below the horizon', () => {
  assert.equal(getShadowOffsetMeters(10, 180, -5), null);
});

test('a shadow polygon extends down-sun from a known footprint', () => {
  const shadow = projectShadowPolygons(
    {
      type: 'Polygon',
      coordinates: [
        [
          [0, 0],
          [0.0001, 0],
          [0.0001, 0.0001],
          [0, 0.0001],
          [0, 0],
        ],
      ],
    },
    { eastMeters: -10, northMeters: 0, lengthMeters: 10 }
  );

  assert.equal(shadow.length, 1);
  assert.ok(Math.abs(shadow[0][0][0][0] + 0.0000898315) < 1e-8);
  assert.ok(Math.abs(shadow[0][0][1][0] - 0.0001) < 1e-8);
});
