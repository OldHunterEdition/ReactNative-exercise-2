import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="messages/[directoryId]"
        options={({ route }) => ({
          title: (route.params as any).title || "Messages",
        })}
      />
    </Stack>
  );
}
