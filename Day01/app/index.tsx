import ProfileCard from "@/components/ProfileCard";
import { fetchRandomUser, RandomUser } from "@/lib/randomUser";
import React, { useEffect, useState } from "react";

import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#ffffff";
const TEXT = "#11181c";
const LINK = "#0a7ea4";

const Index = () => {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchRandomUser();
      setUsers(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Profile Gallery</Text>
      <Text style={styles.sub}>
        Scroll through people loaded live from the free{" "}
        <Text style={styles.bold}>randomuser.me</Text> API — pull down to
        refresh.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: BG }]}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => <ProfileCard user={item} />}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load()}
            tintColor={LINK}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: TEXT,
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 16,
    lineHeight: 24,
    color: TEXT,
    opacity: 0.9,
  },
  bold: {
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: TEXT,
  },
  errTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: TEXT,
    marginBottom: 4,
  },
  errMsg: {
    textAlign: "center",
    marginBottom: 8,
    color: TEXT,
  },
  retry: {
    marginTop: 8,
    fontSize: 16,
    color: LINK,
    fontWeight: "600",
  },
});