import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import type { ComponentProps } from "react";
import React from "react";
import { Dimensions, FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 5450 Mobile Programming Exercise 2
// Student number: 1264329
// Student name: Chengran Sun
type DirectoryItem = {
  id: string;
  title: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  color: string;
};

const DATA: DirectoryItem[] = [
  { id: "you", title: "You", icon: "person", color: "#e57373" },
  { id: "home", title: "Home", icon: "home", color: "#4db6ac" },
  { id: "love", title: "Love", icon: "favorite", color: "#f06292" },
  { id: "family", title: "Family", icon: "people", color: "#ffb74d" },
  { id: "friends", title: "Friends", icon: "group", color: "#ba68c8" },
  { id: "school", title: "School", icon: "school", color: "#64b5f6" },
];

const numColumns = 2;
const size = Dimensions.get("window").width / numColumns - 32;

const renderItem: ListRenderItem<DirectoryItem> = ({ item }) => (
  <Link
    href={{
      pathname: "/messages/[directoryId]",
      params: {
        directoryId: item.id,
        title: item.title,
      },
    }}
    asChild
  >
    <TouchableOpacity style={styles.item}>
      <View style={[styles.circle, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={size * 0.5} color="#fff" />
      </View>
      <Text style={styles.label}>{item.title}</Text>
    </TouchableOpacity>
  </Link>
);

export default function DirectoryList() {
  return <FlatList<DirectoryItem> data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} numColumns={numColumns} contentContainerStyle={styles.container} style={{ flex: 1 }} />;
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  item: { flex: 1, alignItems: "center", margin: 8 },
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#467fd0",
    alignItems: "center",
    justifyContent: "center",
  },
  label: { marginTop: 8, fontSize: 16, fontWeight: "500" },
});
