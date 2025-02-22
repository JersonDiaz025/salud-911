import AuthStack from "./AuthStack";
import AppNavigator from "./AppNavigator";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "@/util/AuthContext";
import { useContext } from "react";

const Routes = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { isLogued } = authContext;
  return (
    <SafeAreaProvider isTVSelectable={true}>
      {isLogued ? <AppNavigator /> : <AuthStack />}
    </SafeAreaProvider>
  );
};

export default Routes;
