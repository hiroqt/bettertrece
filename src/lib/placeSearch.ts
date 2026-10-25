export interface SearchableCityPlace {
  id: string;
  label: string;
  class: string;
  subclass: string;
  categories?: string[];
}

export interface LocatedCityPlace extends SearchableCityPlace {
  coordinate: [number, number];
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll('_', ' ')
    .replace(/[:;]/g, ' ')
    .toLocaleLowerCase()
    .trim()
    .replace(/\bcafes\b/g, 'cafe')
    .replace(/\bmalls\b/g, 'mall')
    .replace(/\bresorts\b/g, 'resort')
    .replace(/\bgyms\b/g, 'gym')
    .replace(/\bshops\b/g, 'shop')
    .replace(/\brestaurants\b/g, 'restaurant')
    .replace(/\bstores\b/g, 'store')
    .replace(/\bcoffee shop\b/g, 'coffee')
    .replace(/\b(all|in|near|at|the|trece|martires|city|cavite|ph)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchTerms(place: SearchableCityPlace) {
  const type = normalize(
    `${place.class} ${place.subclass} ${place.categories?.join(' ') ?? ''}`
  );
  const terms = [normalize(place.label), type];
  if (/\bcafe\b|\bcoffee\b/.test(type)) terms.push('cafe cafes coffee');
  if (
    /shop|grocery|supermarket|convenience|market|department store/.test(type)
  ) {
    terms.push('shop shops store stores retail shopping');
  }
  if (/mall/.test(type)) terms.push('mall malls shopping mall');
  if (/grocery|supermarket|convenience|greengrocer/.test(type)) {
    terms.push('grocery groceries supermarket');
  }
  if (/resort|lodging|hotel|motel|camp|tourism/.test(type)) {
    terms.push('resort resorts hotel hotels');
  }
  if (/sport|fitness|gym|pitch/.test(type)) {
    terms.push('gym gyms fitness sports centre sports center');
  }
  return terms.join(' ');
}

function matchesCategory(place: SearchableCityPlace, query: string) {
  const type = normalize(
    `${place.class} ${place.subclass} ${place.categories?.join(' ') ?? ''}`
  );
  const has = (pattern: RegExp) => pattern.test(type);
  if (query === 'cafe' || query === 'coffee') return has(/\b(cafe|coffee)\b/);
  if (query === 'mall') return has(/\bmall\b/);
  if (query === 'resort')
    return has(/\b(resort|hotel|motel|campsite|campground)\b/);
  if (query === 'gym')
    return has(/\b(gym|fitness|sports centre|sports hall)\b/);
  if (query === 'shop')
    return has(/\b(shop|grocery|supermarket|convenience|market)\b/);
  if (query === 'restaurant') return has(/\brestaurant\b/);
  return null;
}

export function searchCityPlaces<T extends SearchableCityPlace>(
  places: readonly T[],
  query: string
): T[] {
  const normalized = normalize(query);
  if (normalized.length < 2) return [];
  if (
    ['cafe', 'coffee', 'mall', 'resort', 'gym', 'shop', 'restaurant'].includes(
      normalized
    )
  ) {
    return places
      .filter(place => matchesCategory(place, normalized) === true)
      .sort((a, b) => a.label.localeCompare(b.label));
  }
  return places
    .filter(place =>
      normalized.split(' ').every(term => searchTerms(place).includes(term))
    )
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function dedupeCityPlaces<T extends LocatedCityPlace>(places: T[]): T[] {
  return places.filter((place, index) =>
    places.slice(0, index).every(existing => {
      if (
        existing.label.toLocaleLowerCase() !== place.label.toLocaleLowerCase()
      )
        return true;
      const latitude =
        ((existing.coordinate[1] + place.coordinate[1]) / 2) * (Math.PI / 180);
      const east =
        (existing.coordinate[0] - place.coordinate[0]) *
        111_320 *
        Math.cos(latitude);
      const north = (existing.coordinate[1] - place.coordinate[1]) * 111_320;
      return Math.hypot(east, north) >= 60;
    })
  );
}
