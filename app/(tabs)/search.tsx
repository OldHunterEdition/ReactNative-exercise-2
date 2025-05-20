import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const DIRECTORY_TITLES: Record<string, string> = {
  you: "You",
  home: "Home",
  love: "Love",
  family: "Family",
  friends: "Friends",
  school: "School",
};

type SearchResult = {
  directoryId: string;
  message: string;
};

export default function ExploreScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function doSearch() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // 1. Grab all keys, filter to only your message‐store keys
        const keys = await AsyncStorage.getAllKeys();
        const msgKeys = keys.filter((k) => k.startsWith("msgs_"));

        const stores = await AsyncStorage.multiGet(msgKeys);

        const found: SearchResult[] = [];
        stores.forEach(([key, value]) => {
          const dirId = key.replace("msgs_", "");
          let arr: string[] = [];
          try {
            arr = JSON.parse(value || "[]");
          } catch {}
          arr.forEach((msg) => {
            if (msg.toLowerCase().includes(query.toLowerCase())) {
              found.push({ directoryId: dirId, message: msg });
            }
          });
        });

        if (active) setResults(found);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }

    doSearch();
    return () => {
      active = false;
    };
  }, [query]);

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput style={styles.input} placeholder="Search all messages…" value={query} onChangeText={setQuery} />

      {/* Results list */}
      <FlatList<SearchResult>
        data={results}
        keyExtractor={(_, i) => i.toString()}
        refreshing={loading}
        onRefresh={() => {}}
        ListEmptyComponent={() => <Text style={styles.empty}>{query ? "No results found" : "Type to search"}</Text>}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/messages/[directoryId]",
              params: {
                directoryId: item.directoryId,
                title: DIRECTORY_TITLES[item.directoryId],
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.resultBox}>
              <Text style={styles.resultText}>{item.message}</Text>
              <Text style={styles.resultDir}>{DIRECTORY_TITLES[item.directoryId]}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9fa" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  resultBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 2,
  },
  resultText: { fontSize: 16, color: "#333", marginBottom: 4 },
  resultDir: { fontSize: 12, color: "#666", textAlign: "right" },
  empty: { textAlign: "center", color: "#888", marginTop: 32 },
});
