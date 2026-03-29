import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  getPokemonByType,
  getPokemonList,
  PokemonDetail,
  PokemonRef,
} from "../../api/pokemon";
import { COLORS } from "../../constant/colors";
import { StatusBar } from "expo-status-bar";
import AppHeader from "../../components/app-header";
import SearchInput from "../../components/search-input";
import FilterChips from "../../components/filter-chips";
import PokemonCard from "../../components/pokemon-card";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [masterList, setMasterList] = useState<PokemonRef[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const PAGE_SIZE = 20;

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const fetchData = async () => {
    setLoading(true);
    setPage(1);

    try {
      if (selectedType) {
        const list = await getPokemonByType(selectedType);
        setMasterList(list);
      } else {
        const data = await getPokemonList(1000, 0);
        setMasterList(data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = useMemo(() => {
    if (!searchText) return masterList;
    return masterList.filter((p) => p.name.includes(searchText.toLowerCase()));
  }, [masterList, searchText]);

  const displayList = useMemo(() => {
    return filteredList.slice(0, page * PAGE_SIZE);
  }, [filteredList, page]);

  const loadMore = () => {
    if (displayList.length < filteredList.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handleCardPress = (pokemon:PokemonDetail)=>{
    navigation.navigate("PokemonDetail" , {pokemon})
  }

  return (
    <View style={styles.container}>
       <StatusBar style="light" />
       <AppHeader title="PokeDex" showLogo/>
          <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Pokemon..."
            onClear={() => setSearchText("")}
          />
        </View>

        <View style={styles.filterContainer}>
          <FilterChips
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </View>

        {loading && page === 1 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.accentEmerald} />
          </View>
        ) : (
          <FlatList
            data={displayList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PokemonCard
                name={item.name}
                url={item.url}
                onPress={handleCardPress}
              />
            )}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },
  filterContainer: {
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});