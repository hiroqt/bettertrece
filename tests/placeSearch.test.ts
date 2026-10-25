import test from 'node:test';
import assert from 'node:assert/strict';
import {
  dedupeCityPlaces,
  searchCityPlaces,
  type SearchableCityPlace,
} from '../src/lib/placeSearch.ts';

const places: SearchableCityPlace[] = [
  { id: 'cafe', label: 'Brew House', class: 'amenity', subclass: 'cafe' },
  { id: 'mall', label: 'SM Trece', class: 'shop', subclass: 'mall' },
  {
    id: 'resort',
    label: 'Cabuco Springs',
    class: 'tourism',
    subclass: 'hotel',
    categories: ['tourism:hotel'],
  },
  {
    id: 'gym',
    label: 'Fit Trece',
    class: 'leisure',
    subclass: 'fitness_centre',
    categories: ['leisure:fitness_centre'],
  },
  { id: 'shop', label: 'Trece Bookshop', class: 'shop', subclass: 'books' },
  {
    id: 'grocery',
    label: 'Profit Saver',
    class: 'shop',
    subclass: 'supermarket',
  },
  {
    id: 'cafeteria',
    label: 'Cafeteria Outdoor Seating',
    class: 'amenity',
    subclass: 'cafeteria',
  },
];

test('city place search matches venue names and common category terms', () => {
  assert.deepEqual(
    searchCityPlaces(places, 'cafe').map(place => place.id),
    ['cafe']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'coffee shop').map(place => place.id),
    ['cafe']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'malls').map(place => place.id),
    ['mall']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'resort').map(place => place.id),
    ['resort']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'gyms').map(place => place.id),
    ['gym']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'shop').map(place => place.id),
    ['grocery', 'mall', 'shop']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'bookshop').map(place => place.id),
    ['shop']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'grocery').map(place => place.id),
    ['grocery']
  );
  assert.deepEqual(
    searchCityPlaces(places, 'cafes in Trece').map(place => place.id),
    ['cafe']
  );
});

test('city place search returns every match in stable name order', () => {
  const cafes = [
    { id: 'z', label: 'Z Cafe', class: 'amenity', subclass: 'cafe' },
    { id: 'a', label: 'A Cafe', class: 'amenity', subclass: 'cafe' },
  ];
  assert.deepEqual(
    searchCityPlaces(cafes, 'coffee').map(place => place.id),
    ['a', 'z']
  );
  assert.deepEqual(searchCityPlaces(places, 'x'), []);
});

test('duplicate tile and directory entries for the same nearby place collapse', () => {
  const results = dedupeCityPlaces([
    { ...places[1], coordinate: [120.865, 14.281] as [number, number] },
    {
      ...places[1],
      id: 'tile-copy',
      coordinate: [120.8651, 14.281] as [number, number],
    },
    {
      ...places[1],
      id: 'other-branch',
      coordinate: [120.87, 14.281] as [number, number],
    },
  ]);
  assert.deepEqual(
    results.map(place => place.id),
    ['mall', 'other-branch']
  );
});
