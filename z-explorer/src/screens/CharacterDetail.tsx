import { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { KiGauge } from '../components/KiGauge';
import type { RootStackParamList } from '../App';
import { ApiCharacter, fetchCharacterById } from '../lib/api';
import { translateToEnglish } from '../lib/translate';

export default function CharacterDetail() {
  const route = useRoute<RouteProp<RootStackParamList, 'CharacterDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } = route.params;
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOriginPlanet, setShowOriginPlanet] = useState(false);
  const [translatedDesc, setTranslatedDesc] = useState('');
  const [translatedPlanetDesc, setTranslatedPlanetDesc] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterById(id);
        setCharacter(data);
        setError(null);
        // Kick off translations in parallel — update state when ready
        const [desc, planetDesc] = await Promise.all([
          translateToEnglish(data.description),
          data.originPlanet?.description
            ? translateToEnglish(data.originPlanet.description)
            : Promise.resolve(''),
        ]);
        setTranslatedDesc(desc);
        setTranslatedPlanetDesc(planetDesc);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load character');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.notFoundContainer}>
        <ActivityIndicator size="large" color="#FF9F4A" />
        <Text style={styles.notFoundText}>Loading character...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>{error}</Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Character not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Image source={{ uri: character.image }} style={styles.heroImage} />
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroLabel}>Elite Class Warrior</Text>
          <Text style={styles.heroName}>{character.name}</Text>
          <Text style={styles.heroTitle}>{character.affiliation}</Text>
        </View>
      </View>

      <View style={styles.metricsCard}>
        <Text style={styles.metricLabel}>Current Ki Level</Text>
        <Text style={styles.metricValue}>{character.ki}</Text>
        <KiGauge percent={75} style={{ marginTop: 10 }} />

        <Text style={[styles.metricLabel, styles.metricSpacer]}>Maximum Potential</Text>
        <Text style={[styles.metricValue, styles.metricBlue]}>{character.maxKi}</Text>
        <KiGauge percent={88} glowColor="#81ecff" style={{ marginTop: 10 }} />
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          style={styles.actionButton}
          onPress={() => navigation.navigate('Transformations', { id: String(character.id) })}
        >
          <Text style={styles.actionText}>Transformations</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.secondaryAction]}
          onPress={() => setShowOriginPlanet(prev => !prev)}
        >
          <Text style={[styles.actionText, styles.secondaryActionText]}>
            {showOriginPlanet ? 'Hide Origin Planet' : 'Origin Planet'}
          </Text>
        </Pressable>
      </View>

      {showOriginPlanet ? (
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Origin Planet</Text>
          {character.originPlanet ? (
            <>
              <Image source={{ uri: character.originPlanet.image }} style={styles.planetImage} />
              <Text style={styles.planetName}>{character.originPlanet.name}</Text>
              <Text style={styles.planetStatus}>
                Status: {character.originPlanet.isDestroyed ? 'Destroyed' : 'Active'}
              </Text>
              <Text style={styles.description}>{translatedPlanetDesc || character.originPlanet.description}</Text>
            </>
          ) : (
            <Text style={styles.description}>Origin planet details are not available for this character.</Text>
          )}
        </View>
      ) : null}

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Warrior Profile</Text>
        <Text style={styles.description}>{translatedDesc || character.description}</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Tactical Analysis</Text>
        <StatRow label="Race" value={character.race} />
        <StatRow label="Gender" value={character.gender} />
        <StatRow label="Affiliation" value={character.affiliation} />
        <StatRow
          label="Origin Planet"
          value={character.originPlanet?.name ?? 'Unknown'}
          danger={character.originPlanet?.isDestroyed}
        />
      </View>
    </ScrollView>
  );
}

type StatRowProps = {
  label: string;
  value: string;
  danger?: boolean;
};

function StatRow({ label, value, danger }: StatRowProps) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, danger ? styles.dangerValue : undefined]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080E1A',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 34,
    gap: 14,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080E1A',
  },
  notFoundText: {
    color: '#E5EBFC',
    fontSize: 18,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: '#18202F',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  heroImage: {
    width: '100%',
    height: 330,
    resizeMode: 'center',
  },
  heroTextWrap: {
    padding: 14,
    backgroundColor: '#0D1320',
  },
  heroLabel: {
    color: '#FF9F4A',
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroName: {
    color: '#E5EBFC',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
  },
  heroTitle: {
    color: '#FFD709',
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
  },
  metricsCard: {
    backgroundColor: '#0D1320',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  metricLabel: {
    color: '#A5ABBB',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#FF9F4A',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  metricSpacer: {
    marginTop: 16,
  },
  metricBlue: {
    color: '#81ECFF',
    fontSize: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF9F4A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryAction: {
    backgroundColor: '#18202F',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  actionText: {
    color: '#080E1A',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  secondaryActionText: {
    color: '#E5EBFC',
  },
  profileCard: {
    backgroundColor: '#0D1320',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  sectionTitle: {
    color: '#E5EBFC',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    color: '#A5ABBB',
    lineHeight: 20,
  },
  planetImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  planetName: {
    color: '#E5EBFC',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  planetStatus: {
    color: '#FF9F4A',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#232C3E',
  },
  statLabel: {
    color: '#A5ABBB',
    fontSize: 13,
  },
  statValue: {
    color: '#E5EBFC',
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },
  dangerValue: {
    color: '#FF7351',
  },
});
