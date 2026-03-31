# Z-Explorer — React Native (Expo)

A Dragon Ball Z explorer app built with Expo and React Navigation. Browse characters and planets sourced live from the [Dragon Ball API](https://dragonball-api.com), with Spanish-to-English translation, race filtering, and full character/planet detail screens.

---

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Xcode (iOS simulator, macOS only)
- Android Studio (Android emulator)

---

## Install & Run

```bash
# Install dependencies
npm install

# Start Expo dev server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in browser (web preview)
npm run web

# TypeScript type check
npm run lint
```

---

## Project Structure

```
z-explorer/
├── index.js                    ← Expo entry point (registers App component)
├── app.json                    ← Expo config (name, slug, icons, splash screen)
├── package.json                ← Dependencies & npm scripts
├── tsconfig.json               ← TypeScript config (extends expo/tsconfig.base)
├── babel.config.js             ← Babel config (babel-preset-expo)
└── src/
    ├── App.tsx                 ← Root: navigation container + stack/tab setup
    ├── lib/
    │   ├── api.ts              ← All API types + fetch functions
    │   └── translate.ts        ← Spanish → English translation utility
    ├── components/
    │   ├── KiGauge.tsx         ← Animated Ki power progress bar
    │   └── Navigation.tsx      ← TopBar component (used in detail screens)
    └── screens/
        ├── Home.tsx            ← Characters tab
        ├── CharacterDetail.tsx ← Character detail screen
        ├── Planets.tsx         ← Planets tab
        └── Transformations.tsx ← Transformations screen
```

---

## Navigation Architecture

```
App (SafeAreaProvider)
└── NavigationContainer (dark theme)
    └── Stack.Navigator  [RootStackParamList]
        ├── MainTabs            ← headerShown: false (entry screen)
        │   └── Tab.Navigator  [MainTabParamList]
        │       ├── Characters  → Home.tsx
        │       └── Planet      → Planets.tsx
        ├── CharacterDetail     ← receives { id: string } from route params
        └── Transformations     ← receives { id: string } from route params
```

### Type Maps (exported from `App.tsx`)

| Type | Screens |
|---|---|
| `RootStackParamList` | `MainTabs`, `CharacterDetail`, `Transformations` |
| `MainTabParamList` | `Characters`, `Planet` |

---

## Code Flow

### 1. App Launch

```
index.js
  └── registerRootComponent(App)   ← Expo registers App.tsx as the root
```

### 2. Root Component — `App.tsx`

```
App()
  └── SafeAreaProvider              ← makes insets available app-wide
      └── NavigationContainer       ← owns navigation state + dark theme
          └── StatusBar             ← light text, solid #080E1A background
          └── Stack.Navigator
              ├── MainTabs          ← shown first (no header)
              ├── CharacterDetail   ← pushed when a character card is tapped
              └── Transformations   ← pushed from CharacterDetail
```

### 3. Tab Navigation — `MainTabs()` (inside App.tsx)

```
MainTabs()
  ├── useSafeAreaInsets()
  └── Tab.Navigator
      ├── sceneStyle.paddingTop = insets.top       ← prevents content under status bar
      ├── tabBarStyle.height = 58 + insets.bottom  ← prevents tab bar under home indicator
      ├── Tab: "Characters"  → Home.tsx
      └── Tab: "Planet"      → Planets.tsx
```

### 4. Characters Tab — `Home.tsx`

```
Home()
  ├── STATE
  │   ├── characters[]        ← raw API list
  │   ├── loading / error
  │   ├── query               ← search input string
  │   ├── selectedRace        ← active race chip (null = show all)
  │   └── searchOpen          ← toggles TextInput visibility
  │
  ├── useMemo → filteredCharacters
  │   └── filters characters[] by query AND selectedRace simultaneously
  │
  ├── useEffect (on mount)
  │   └── fetchCharacters()
  │       └── GET /api/characters → setCharacters(data)
  │
  └── RENDER
      ├── Header row  (title left, search icon button right)
      │   └── [if searchOpen] TextInput with autoFocus → updates query
      ├── Hero text block  (LEGENDARY WARRIORS)
      ├── Race chips ScrollView  → updates selectedRace (null toggles off)
      ├── [if no results] "No characters match the current filters"
      └── Horizontal ScrollView of character cards (250×360)
          ├── cover image
          ├── name overlay
          ├── Ki level value
          ├── KiGauge bar
          └── onPress → navigate('CharacterDetail', { id })
```

### 5. Character Detail Screen — `CharacterDetail.tsx`

```
CharacterDetail({ route.params.id })
  ├── STATE
  │   ├── character             ← full ApiCharacter object
  │   ├── loading / error
  │   ├── translatedDesc        ← English character description
  │   ├── translatedPlanetDesc  ← English origin planet description
  │   └── showOriginPlanet      ← boolean toggle for planet card
  │
  ├── useEffect (on id change)
  │   ├── fetchCharacterById(id)
  │   │   └── GET /api/characters/:id → setCharacter(data)
  │   └── Promise.all([
  │         translateToEnglish(description),
  │         translateToEnglish(originPlanet.description)
  │       ]) → setTranslatedDesc / setTranslatedPlanetDesc
  │
  └── RENDER
      ├── Hero card             (image, name, affiliation badge)
      ├── Ki metrics card       (ki, maxKi values + KiGauge)
      ├── Action row
      │   ├── Transformations button → navigate('Transformations', { id })
      │   └── Origin Planet button  → toggles showOriginPlanet
      ├── Warrior Profile card  (translatedDesc)
      ├── Tactical Analysis     (race, gender, affiliation, origin planet name)
      └── [if showOriginPlanet] Origin Planet card
          └── planet image, name, Active/Destroyed status, translatedPlanetDesc
```

### 6. Transformations Screen — `Transformations.tsx`

```
Transformations({ route.params.id })
  ├── useEffect (on mount)
  │   └── fetchCharacterById(id)
  │       └── uses character.transformations[] from the same endpoint
  │
  └── RENDER
      └── ScrollView of transformation cards
          ├── Image (resizeMode: contain, dark background)
          ├── Transformation name
          ├── Ki value
          ├── KiGauge  (percent = min(100, 40 + index × 12))
          └── [if name matches /ssj4|ultra|primal|ego/i] gold "PRIMAL" badge
```

### 7. Planets Tab — `Planets.tsx`

```
Planets()
  ├── STATE
  │   ├── planets[]         ← shallow list (NO characters[] from list endpoint)
  │   ├── selected          ← full planet object (WITH characters[])
  │   ├── loading / error
  │   ├── translatedDesc    ← English planet description
  │   ├── translating       ← spinner flag during translation
  │   ├── query             ← search input string
  │   └── searchOpen        ← toggles TextInput visibility
  │
  ├── useMemo → filteredPlanets
  │   └── filters planets[] by query
  │
  ├── useEffect (on mount)
  │   ├── fetchPlanets()
  │   │   └── GET /api/planets → shallow ApiPlanet[] (no characters[])
  │   ├── fetchPlanetById(data[0].id)
  │   │   └── GET /api/planets/:id → full ApiPlanet WITH characters[]
  │   │       └── setSelected(fullFirst)
  │   └── translateToEnglish(description) → setTranslatedDesc
  │
  ├── handleSelectPlanet(planet)
  │   ├── setSelected(planet)   ← optimistic shallow update (instant UI response)
  │   └── Promise.all([
  │         fetchPlanetById(planet.id),        ← GET /api/planets/:id
  │         translateToEnglish(description)
  │       ])
  │       └── setSelected(fullPlanet) + setTranslatedDesc
  │
  └── RENDER
      ├── Header row  (title left, search icon button right)
      │   └── [if searchOpen] TextInput with autoFocus → updates query
      ├── Hero text block  (CELESTIAL WORLDS)
      ├── [if no results] "No planets match..."
      ├── Planet carousel  (filteredPlanets, 250×320 cards)
      │   ├── cover image
      │   ├── [if isDestroyed] red DESTROYED badge
      │   ├── planet name overlay
      │   └── onPress → handleSelectPlanet(planet)  [active = orange border]
      └── [if selected]
          ├── Data Scan card     (status, Known Fighters count, planet ID)
          ├── Origins & Legacy   (translatedDesc / spinner while translating)
          └── Known Fighters carousel  (selected.characters[])
              └── each card (200×280) → navigate('CharacterDetail', { id })
```

---

## Data Layer — `src/lib/api.ts`

**Base URL:** `https://dragonball-api.com/api`

| Function | Endpoint | Returns |
|---|---|---|
| `fetchCharacters()` | `GET /characters` | `ApiCharacter[]` |
| `fetchCharacterById(id)` | `GET /characters/:id` | `ApiCharacter` |
| `fetchPlanets()` | `GET /planets` | `ApiPlanet[]` (shallow — no `characters[]`) |
| `fetchPlanetById(id)` | `GET /planets/:id` | `ApiPlanet` (full — includes `characters[]`) |

> **Note:** The list endpoints return shallow objects. `characters[]` is only present on the individual `/planets/:id` response. `Planets.tsx` always calls `fetchPlanetById` after selection and on initial load to get the full object.

**Fallback strategy:** Both list functions catch errors and fall back to fetching a hardcoded set of IDs individually via `Promise.allSettled`, so the app still works if the list endpoint is unavailable.

### TypeScript Interfaces

```ts
ApiCharacter {
  id, name, ki, maxKi, race, gender,
  description, image, affiliation,
  originPlanet?: ApiPlanet,
  transformations?: ApiTransformation[]
}

ApiPlanet {
  id, name, isDestroyed,
  description, image,
  characters?: ApiPlanetCharacter[]
}

ApiPlanetCharacter {
  id, name, ki, maxKi, race,
  gender, description, image, affiliation
}

ApiTransformation {
  id, name, image, ki
}
```

---

## Translation Layer — `src/lib/translate.ts`

| Concern | Detail |
|---|---|
| Service | MyMemory free API — no API key required |
| Endpoint | `api.mymemory.translated.net/get?q=...&langpair=es\|en` |
| Chunk splitting | Texts > 490 chars split at word boundaries, translated in parallel via `Promise.all`, then rejoined |
| Caching | In-memory `Map<string, string>` — same text is never re-translated in a session |
| Fallback | Returns original Spanish text silently on any network error |

```
translateToEnglish(text)
  ├── cache hit?  → return cached result immediately
  ├── splitIntoChunks(text, 490)   ← split at word boundaries
  ├── Promise.all(chunks.map(translateChunk))   ← parallel API calls
  └── join chunks → store in cache → return
      (any error at any stage → return original text)
```

---

## Shared Components

### `KiGauge.tsx`
Animated horizontal progress bar representing Ki power level.

| Prop | Type | Default | Description |
|---|---|---|---|
| `percent` | `number` | required | Fill level 0–100 |
| `style` | `ViewStyle` | — | Extra container styles |
| `glowColor` | `string` | `#ffd709` | Shadow/glow colour |

```
Animated.Value(0)
  └── Animated.timing → toValue: percent, duration: 850ms
      └── width interpolated: '0%' → '100%'
          (useNativeDriver: false — width requires JS driver)
```

### `Navigation.tsx` — `TopBar`
Used only in stack screens (`CharacterDetail`, `Transformations`). Tab screens manage their own inline headers.

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `'Z-EXPLORER'` |

Reads `useSafeAreaInsets().top` to apply correct top padding on all devices.

---

## Safe Area Strategy

| Location | How it's handled |
|---|---|
| Tab screens (`Home`, `Planets`) | Inline header uses `useSafeAreaInsets().top + 12` |
| Stack screens (`CharacterDetail`, `Transformations`) | React Navigation native header handles it automatically |
| Tab bar | `height: 58 + insets.bottom`, `paddingBottom: max(8, insets.bottom)` |
| Status bar | `expo-status-bar` — `translucent={false}`, `backgroundColor="#080E1A"` |

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Background | `#080E1A` | All screen backgrounds |
| Card background | `#0D1320` | Cards, inputs |
| Card border | `#232C3E` | All borders |
| Accent orange | `#FF9F4A` | Active states, headings, buttons |
| Text primary | `#E5EBFC` | Main text |
| Text secondary | `#A5ABBB` | Labels, subtitles |
| Danger red | `#FF7351` | Destroyed badge, errors |
| Ki yellow | `#FFD709` | KiGauge fill |
| Cyan | `#81ECFF` | Stat labels |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `expo` | `^55.0.0` | App runtime & toolchain |
| `react-native` | `0.83.4` | Core framework |
| `@react-navigation/native` | `^7.1.18` | Navigation container |
| `@react-navigation/native-stack` | `^7.3.29` | Stack navigator |
| `@react-navigation/bottom-tabs` | `^7.4.2` | Tab navigator |
| `react-native-safe-area-context` | `~5.6.2` | Safe area insets |
| `react-native-screens` | `~4.23.0` | Native screen optimisation |
| `expo-status-bar` | `~55.0.4` | Status bar control |
| `@expo/vector-icons` | bundled with expo | Ionicons (search, close, planet, home) |
