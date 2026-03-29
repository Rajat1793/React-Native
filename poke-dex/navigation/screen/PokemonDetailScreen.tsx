import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTypeColor } from "../../constant/types";
import { COLORS } from "../../constant/colors";
import { TypeBadge } from "../../components/type-badge";
import { StatBar } from "../../components/statbar";
import { PokemonTypeEntry, PokemonStat } from "../../api/pokemon";

const PokemonDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { pokemon } = route.params;

  const mainType = pokemon.types[0].type.name;
  const accentColor = getTypeColor(mainType);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: COLORS.card }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.navBar}>
              <Ionicons
                name="arrow-back"
                size={28}
                color={COLORS.text}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerId}>
                #{String(pokemon.id).padStart(3, "0")}
              </Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: pokemon.sprites.other["official-artwork"].front_default,
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <View style={styles.typeContainer}>
            {pokemon.types.map((t: PokemonTypeEntry) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="large" />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accentColor }]}>
              About
            </Text>

            <View style={styles.row}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons
                    name="scale-outline"
                    size={20}
                    color={COLORS.text}
                  />
                </View>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons
                    name="resize-outline"
                    size={20}
                    color={COLORS.text}
                  />
                </View>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Moves</Text>
                <Text style={styles.statValue}>
                  {pokemon.abilities[0]?.ability.name.charAt(0).toUpperCase() +
                    pokemon.abilities[0]?.ability.name.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accentColor }]}>
              Base Stats
            </Text>

            {pokemon.stats.map((stat: PokemonStat) => (
              <StatBar
                key={stat.stat.name}
                label={stat.stat.name.replace("-", " ")}
                value={stat.base_stat}
                color={accentColor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  headerId: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  content: {
    padding: 24,
  },
  name: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    marginBottom: 8,
  },
  statLabel: {
    color: COLORS.subtext,
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "bold",
  },
});