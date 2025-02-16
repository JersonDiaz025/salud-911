import React, { ReactNode } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from "react-native";

interface BackgroundProps extends KeyboardAvoidingViewProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={require("../assets/images/partial-react-logo.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    elevation: 6,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
