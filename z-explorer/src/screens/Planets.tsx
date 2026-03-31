import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../App';
import { ApiPlanet, fetchPlanets, fetchPlanetById } from '../lib/api';
import { translateToEnglish } from '../lib/translate';

export default function Planets() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [planets, setPlanets] = useState<ApiPlanet[]>([]);
  const [selected, setSelected] = useState<ApiPlanet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedDesc, setTranslatedDesc] = useState('');
  const [translating, setTranslating] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const filteredPlanets = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return planets;
    return planets.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, planets]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPlanets();
        setPlanets(data);
        if (data.length > 0) {
          const fullFirst = await fetchPlanetById(data[0].id);
          setSelected(fullFirst);
          const desc = await translateToEnglish(fullFirst.description);
          setTranslatedDesc(desc);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load planets');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSelectPlanet = async (planet: ApiPlanet) => {
    if (selected?.id === planet.id) return;
    setSelected(planet);
    setTranslatedDesc('');
    setTranslating(true);
    const [fullPlanet, desc] = await Promise.all([
      fetchPlanetById(planet.id),
      translateToEnglish(planet.description),
    ]);
    setSelected(fullPlanet);
    setTranslatedDesc(desc);
    setTranslating(false);
  };

  if (loading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator size="large" color="#FF9F4A" />
        <Text style={styles.stateText}>Loading planets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header row */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>PLANETS</Text>
        <Pressable
          style={styles.searchIconBtn}
          onPress={() => {
            if (searchOpen) setQuery('');
            setSearchOpen((v) => !v);
          }}
          hitSlop={8}
        >
          <Ionicons
            name={searchOpen ? 'close' : 'search'}
            size={22}
            color={searchOpen ? '#FF9F4A' : '#A5ABBB'}
          />
        </Pressable>
      </View>

      {searchOpen && (
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search planets..."
            placeholderTextColor="#4A5568"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoFocus
          />
        </View>
      )}

      {/* Hero text */}
      <View style={styles.hero}>
        <Text style={styles.heroGhost}>COSMOS</Text>
        <Text style={styles.heroTitle}>CELESTIAL</Text>
        <Text style={[styles.heroTitle, styles.heroAccent]}>WORLDS</Text>
        <Text style={styles.heroSubtitle}>Select a planet</Text>
      </View>

      {filteredPlanets.length === 0 && query.trim().length > 0 && (
        <Text style={styles.noResults}>No planets match "{query}"</Text>
      )}

      {/* Planet carousel */}
      <ScrollView
        horizontal
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        showsHorizontalScrollIndicator={false}
      >
        {filteredPlanets.map((planet) => {
          const isActive = selected?.id === planet.id;
          return (
            <Pressable
              key={planet.id}
              style={[styles.planetCard, isActive && styles.planetCardActive]}
              onPress={() => handleSelectPlanet(planet)}
            >
              <Image source={{ uri: planet.image }} style={styles.planetImage} />
              <View style={styles.planetOverlay}>
                {planet.isDestroyed && (
                  <View style={styles.destroyedBadge}>
                    <Text style={styles.destroyedBadgeText}>DESTROYED</Text>
                  </View>
                )}
                <Text style={styles.planetName}>{planet.name}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Selected planet detail */}
      {selected && (
        <>
          {/* Stats */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Data Scan</Text>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Status</Text>
              <Text style={selected.isDestroyed ? styles.statValueDanger : styles.statValueSafe}>
                {selected.isDestroyed ? 'Destroyed' : 'Active'}
              </Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>Known Fighters</Text>
              <Text style={styles.statValue}>{selected.characters?.length ?? 0}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Origins &amp; Legacy</Text>
            {translating ? (
              <ActivityIndicator size="small" color="#FF9F4A" style={{ alignSelf: 'flex-start' }} />
            ) : (
              <Text style={styles.paragraph}>{translatedDesc || selected.description}</Text>
            )}
          </View>

          {/* Character cards */}
          {(selected.characters ?? []).length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Known Fighters</Text>
              </View>
              <ScrollView
                horizontal
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
                showsHorizontalScrollIndicator={false}
              >
                {(selected.characters ?? []).map((char) => (
                  <Pressable
                    key={char.id}
                    style={styles.charCard}
                    onPress={() => navigation.navigate('CharacterDetail', { id: String(char.id) })}
                  >
                    <Image source={{ uri: char.image }} style={styles.charImage} />
                    <View style={styles.charOverlay}>
                      <Text style={styles.charName}>{char.name}</Text>
                      <Text style={styles.charRace}>{char.race}</Text>
                      <Text style={styles.charAffiliation}>{char.affiliation}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredState: {
    flex: 1,
    backgroundColor: '#080E1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  stateText: {
    color: '#A5ABBB',
    fontSize: 14,
  },
  errorText: {
    color: '#FF7351',
    fontSize: 14,
    paddingHorizontal: 18,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#080E1A',
  },
  content: {
    paddingBottom: 34,
  },
  hero: {
    paddingHorizontal: 18,
    marginBottom: 22,
  },
  heroGhost: {
    color: '#1D2636',
    fontSize: 56,
    fontWeight: '900',
    marginBottom: -6,
  },
  heroTitle: {
    color: '#E5EBFC',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 42,
  },
  heroAccent: {
    color: '#FF9F4A',
  },
  heroSubtitle: {
    color: '#A5ABBB',
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#FF9F4A',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  searchIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0D1320',
    borderWidth: 1,
    borderColor: '#232C3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRow: {
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#0D1320',
    borderWidth: 1,
    borderColor: '#FF9F4A',
    borderRadius: 12,
    color: '#E5EBFC',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  noResults: {
    color: '#4A5568',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  carousel: {
    marginBottom: 20,
  },
  carouselContent: {
    paddingHorizontal: 18,
    gap: 14,
  },
  planetCard: {
    width: 250,
    height: 320,
    borderRadius: 24,
    backgroundColor: '#18202F',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  planetCardActive: {
    borderColor: '#FF9F4A',
    borderWidth: 2,
  },
  planetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  planetOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 14, 26, 0.88)',
    padding: 14,
    gap: 6,
  },
  destroyedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF735120',
    borderWidth: 1,
    borderColor: '#FF7351',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  destroyedBadgeText: {
    color: '#FF7351',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  planetName: {
    color: '#E5EBFC',
    fontSize: 22,
    fontWeight: '800',
  },
  card: {
    marginHorizontal: 18,
    marginBottom: 14,
    backgroundColor: '#0D1320',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  cardTitle: {
    color: '#E5EBFC',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  statBlock: {
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#81ECFF',
    paddingLeft: 10,
  },
  statLabel: {
    color: '#A5ABBB',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  statValue: {
    color: '#E5EBFC',
    fontSize: 20,
    fontWeight: '800',
  },
  statValueDanger: {
    color: '#FF7351',
    fontSize: 20,
    fontWeight: '800',
  },
  statValueSafe: {
    color: '#81ECFF',
    fontSize: 20,
    fontWeight: '800',
  },
  paragraph: {
    color: '#A5ABBB',
    lineHeight: 20,
  },
  sectionHeader: {
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#E5EBFC',
    fontSize: 20,
    fontWeight: '800',
  },
  charCard: {
    width: 200,
    height: 280,
    borderRadius: 20,
    backgroundColor: '#18202F',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  charImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  charOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 14, 26, 0.88)',
    padding: 12,
  },
  charName: {
    color: '#E5EBFC',
    fontSize: 18,
    fontWeight: '800',
  },
  charRace: {
    color: '#81ECFF',
    fontSize: 11,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  charAffiliation: {
    color: '#A5ABBB',
    fontSize: 11,
    marginTop: 2,
  },
});

