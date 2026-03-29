import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import { getPokemonList, PokemonDetail, PokemonRef } from "../../api/pokemon";
import AppHeader from "../../components/app-header";
import PokemonCard from "../../components/pokemon-card";
import { COLORS } from "../../constant/colors";


const PokemonListScreen = () => {
  const navigation = useNavigation<any>();
  const [list, setList] = useState<PokemonRef[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getPokemonList(20, offset);
      setList((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + 20);
      if (!data.next) setHasMore(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handlePress = (pokemon: PokemonDetail) => {
    navigation.navigate("PokemonDetail", { pokemon });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Full List" />
      <FlatList
        data={list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} url={item.url} onPress={handlePress} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          loading ? <ActivityIndicator color={COLORS.accentEmerald} /> : null
        }
      />
    </View>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
});