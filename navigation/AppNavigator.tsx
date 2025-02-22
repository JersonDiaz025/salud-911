import React from "react";
import { Stack } from "expo-router";
import { View, Image } from "react-native";

const AppNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        headerTransparent: false,
        headerTintColor: "#11181C",
        headerStyle: { backgroundColor: "#f5f5f5" },
        contentStyle: { backgroundColor: "#f2f2f2" },
        headerTitle: () => (
          <View
            style={[
              {
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{ width: 200, height: 45 }}
              resizeMode="contain"
            />
          </View>
        ),
      }}
    />
  );
};

export default AppNavigator;
