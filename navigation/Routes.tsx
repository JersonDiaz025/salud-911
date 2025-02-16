import AuthStack from "./AuthStack";
import AppNavigator from "./AppNavigator";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Routes = () => {
  const [isLogued, setIslogued] = useState(false);

  const handleLogin = () => {
    setIslogued(true);
  };

  return (
    <SafeAreaProvider isTVSelectable={true}>
      {isLogued ? <AppNavigator /> : <AuthStack handleLogin={handleLogin} />}
    </SafeAreaProvider>
  );
};

export default Routes;
