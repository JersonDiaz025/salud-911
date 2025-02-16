import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Profile = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: 600, color: "#00000", fontSize: 20 }}>
        Mi perfil
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
