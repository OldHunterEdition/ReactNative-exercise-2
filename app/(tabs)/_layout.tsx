import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Directories",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="folder" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="search" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
