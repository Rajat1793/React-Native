import { useEffect, useMemo, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { KiGauge } from '../components/KiGauge';
import type { RootStackParamList } from '../App';
import { ApiCharacter, ApiTransformation, fetchCharacterById } from '../lib/api';

export default function Transformations() {
  const route = useRoute<RouteProp<RootStackParamList, 'Transformations'>>();
  const { id } = route.params;
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterById(id);
        setCharacter(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load transformations');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const transformations = useMemo(() => character?.transformations ?? [], [character]);

  if (loading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator size="large" color="#FF9F4A" />
        <Text style={styles.stateText}>Loading transformations...</Text>
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
      <View style={styles.hero}>
        <Text style={styles.heroPill}>Elite Warrior Archive</Text>
        <Text style={styles.heroTitle}>{character?.name ?? 'Saiyan'}'s Ascension</Text>
        <Text style={styles.heroSub}>
          Witness the manifestation of pure Ki through every legendary form.
        </Text>
      </View>

      <View style={styles.list}>
        {transformations.map((trans, index) => (
          <View key={trans.id} style={styles.card}>
            <Image source={{ uri: trans.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{trans.name}</Text>
                  <Text style={styles.cardType}>Transformation</Text>
                </View>
                <View>
                  <Text style={styles.kiMiniLabel}>KI LEVEL</Text>
                  <Text style={styles.kiMiniValue}>{trans.ki}</Text>
                </View>
              </View>
              <KiGauge percent={Math.min(100, 40 + index * 12)} />
              {isPrimalTransformation(trans) ? <Text style={styles.primalTag}>PRIMAL POWER</Text> : null}
            </View>
          </View>
        ))}
      </View>
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  hero: {
    backgroundColor: '#0D1320',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#232C3E',
    padding: 14,
    marginBottom: 14,
  },
  heroPill: {
    color: '#FF9F4A',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '800',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#E5EBFC',
    fontSize: 36,
    lineHeight: 39,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heroSub: {
    color: '#A5ABBB',
    marginTop: 8,
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#18202F',
    borderWidth: 1,
    borderColor: '#232C3E',
  },
  cardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    backgroundColor: '#0D1320',
  },
  cardBody: {
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardTitle: {
    color: '#FFD709',
    fontSize: 22,
    fontWeight: '800',
  },
  cardType: {
    color: '#A5ABBB',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  kiMiniLabel: {
    color: '#A5ABBB',
    fontSize: 11,
    textAlign: 'right',
  },
  kiMiniValue: {
    color: '#81ECFF',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'right',
  },
  primalTag: {
    color: '#FF9F4A',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
});

function isPrimalTransformation(transformation: ApiTransformation) {
  return /ssj4|ultra|primal|ego/i.test(transformation.name);
}
