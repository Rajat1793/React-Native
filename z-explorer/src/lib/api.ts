const API_BASE = 'https://dragonball-api.com/api';

export interface ApiPlanetCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

export interface ApiTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface ApiPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  characters?: ApiPlanetCharacter[];
}

export interface ApiCharacter {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  originPlanet?: ApiPlanet;
  transformations?: ApiTransformation[];
}

// In-memory session cache for API responses. This is a simple optimization to avoid redundant network requests
const cache = new Map<string, unknown>();

// Deduplicate in-flight requests: if two callers ask for the same URL at the
// same time, only one network request is made and both await the same promise.
const inFlight = new Map<string, Promise<unknown>>();

async function getJson<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  if (!inFlight.has(url)) {
    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        cache.set(url, data);
        inFlight.delete(url);
        return data;
      })
      .catch((err) => {
        inFlight.delete(url);
        throw err;
      });
    inFlight.set(url, promise);
  }

  return inFlight.get(url) as Promise<T>;
}

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  if (value && typeof value === 'object') {
    const maybeItems = (value as { items?: unknown }).items;
    if (Array.isArray(maybeItems)) {
      return maybeItems as T[];
    }
  }
  return [];
}

export async function fetchCharacterById(id: string | number): Promise<ApiCharacter> {
  return getJson<ApiCharacter>(`${API_BASE}/characters/${id}`);
}

export async function fetchPlanetById(id: string | number): Promise<ApiPlanet> {
  return getJson<ApiPlanet>(`${API_BASE}/planets/${id}`);
}

export async function fetchPlanets(): Promise<ApiPlanet[]> {
  try {
    const raw = await getJson<unknown>(`${API_BASE}/planets?limit=20`);
    const parsed = toArray<ApiPlanet>(raw);
    if (parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback below.
  }

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const results = await Promise.allSettled(ids.map(id => fetchPlanetById(id)));
  return results
    .filter((entry): entry is PromiseFulfilledResult<ApiPlanet> => entry.status === 'fulfilled')
    .map(entry => entry.value);
}

export async function fetchCharacters(): Promise<ApiCharacter[]> {
  try {
    const raw = await getJson<unknown>(`${API_BASE}/characters?limit=58`);
    const parsed = toArray<ApiCharacter>(raw);
    if (parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback below.
  }

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const results = await Promise.allSettled(ids.map(id => fetchCharacterById(id)));
  return results
    .filter((entry): entry is PromiseFulfilledResult<ApiCharacter> => entry.status === 'fulfilled')
    .map(entry => entry.value);
}
