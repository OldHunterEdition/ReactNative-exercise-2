import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useMessages } from "../../hooks/useMessages";

type Params = { directoryId: string };

export default function MessagesScreen() {
  const { directoryId } = useLocalSearchParams<Params>();
  const { messages, loading, addMessage, deleteMessage } = useMessages(directoryId);
  const [draft, setDraft] = useState("");

  return (
    <View style={styles.container}>
      {/* input & add row */}
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="New message…" value={draft} onChangeText={setDraft} />
        <Button
          title="Add"
          onPress={() => {
            if (draft.trim()) {
              addMessage(draft.trim());
              setDraft("");
            }
          }}
        />
      </View>
      {/* FlatList */}
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        refreshing={loading}
        onRefresh={() => {}}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{item}</Text>
            <Button title="Delete" onPress={() => deleteMessage(index)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No messages yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9fa" },
  inputRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  separator: { height: 8 },
  messageBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: { flex: 1, fontSize: 16, color: "#333" },
  empty: { textAlign: "center", marginTop: 32, color: "#888" },
});
