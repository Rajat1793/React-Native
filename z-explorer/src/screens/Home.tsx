import { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KiGauge } from '../components/KiGauge';
import type { RootStackParamList } from '../App';
import { ApiCharacter, fetchCharacters } from '../lib/api';

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [characters, setCharacters] = useState<ApiCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const RACES = [
    'Human', 'Saiyan', 'Namekian', 'Majin', 'Frieza Race',
    'Android', 'Jiren Race', 'God', 'Angel', 'Evil',
    'Nucleico', 'Nucleico benigno', 'Unknown',
  ];

  const filteredCharacters = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters.filter((c) => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q);
      const matchesRace = !selectedRace || c.race === selectedRace;
      return matchesQuery && matchesRace;
    });
  }, [query, selectedRace, characters]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters();
        setCharacters(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load characters');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator size="large" color="#FF9F4A" />
        <Text style={styles.stateText}>Loading characters...</Text>
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
        <Text style={styles.headerTitle}>Z-EXPLORER</Text>
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
            placeholder="Search characters..."
            placeholderTextColor="#4A5568"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoFocus
          />
        </View>
      )}

      <View style={styles.hero}>
        <Text style={styles.heroGhost}>{(selectedRace ?? 'ALL').toUpperCase()}</Text>
        <Text style={styles.heroTitle}>LEGENDARY</Text>
        <Text style={[styles.heroTitle, styles.heroAccent]}>WARRIORS</Text>
        <Text style={styles.heroSubtitle}>Select your champion</Text>
      </View>

      <ScrollView
        horizontal
        style={styles.filterRow}
        contentContainerStyle={styles.filterRowContent}
        showsHorizontalScrollIndicator={false}
      >
        {/* All chip */}
        <Pressable
          style={[styles.chip, selectedRace === null && styles.chipActive]}
          onPress={() => setSelectedRace(null)}
        >
          <Text style={[styles.chipText, selectedRace === null && styles.chipTextActive]}>All</Text>
        </Pressable>

        {RACES.map((race) => {
          const active = selectedRace === race;
          return (
            <Pressable
              key={race}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSelectedRace(active ? null : race)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{race}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {filteredCharacters.length === 0 && (
        <Text style={styles.noResults}>
          {query.trim() || selectedRace ? 'No characters match the current filters' : ''}
        </Text>
      )}

      <ScrollView
        horizontal
        style={styles.horizontalList}
        contentContainerStyle={styles.horizontalListContent}
        showsHorizontalScrollIndicator={false}
      >
        {filteredCharacters.map((char) => (
          <Pressable
            key={char.id}
            style={styles.characterCard}
            onPress={() => navigation.navigate('CharacterDetail', { id: String(char.id) })}
          >
            <Image source={{ uri: char.image }} style={styles.characterImage} />
            <View style={styles.characterOverlay}>
              <Text style={styles.characterName}>{char.name}</Text>
              <Text style={styles.kiLabel}>Ki Level</Text>
              <Text style={styles.kiValue}>{char.ki}</Text>
              <KiGauge percent={80} style={{ marginTop: 10 }} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080E1A',
  },
  content: {
    paddingBottom: 30,
  },
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
  filterRow: {
    marginBottom: 14,
  },
  filterRowContent: {
    paddingHorizontal: 18,
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#232C3E',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#0D1320',
  },
  chipActive: {
    borderColor: '#FF9F4A',
    backgroundColor: '#FF9F4A18',
  },
  chipText: {
    color: '#A5ABBB',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FF9F4A',
  },
  noResults: {
    color: '#4A5568',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  horizontalList: {
    marginBottom: 24,
  },
  horizontalListContent: {
    paddingHorizontal: 18,
    gap: 14,
  },
  characterCard: {
    width: 250,
    height: 430,
    borderRadius: 25,
    backgroundColor: '#18202F',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  characterOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 14, 26, 0.88)',
    padding: 14,
  },
  characterName: {
    color: '#E5EBFC',
    fontSize: 24,
    fontWeight: '800',
  },
  kiLabel: {
    color: '#81ECFF',
    fontSize: 11,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  kiValue: {
    color: '#FFD709',
    fontSize: 18,
    fontWeight: '800',
  },
});
