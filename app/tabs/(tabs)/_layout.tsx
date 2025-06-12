import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#F5F5F5' },
          tabBarActiveTintColor: '#4CAF50',
      }}
    >
        <Tabs.Screen
            name="home"
            options={{
            title: "HOME",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
        />
        <Tabs.Screen
            name="form"
            options={{
                title: "記録",
                tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
            }}
        />
        <Tabs.Screen
            name="taskAll"
            options={{
              title: "実績詳細",
              tabBarIcon: ({ color }) => <TabBarIcon name="file-text" color={color} />,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            }}
        />

    </Tabs>
  );
}
