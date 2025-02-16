import AuthStack from "./AuthStack";
import AppNavigator from "./AppNavigator";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Routes = () => {
  const [isLogued, setIslogued] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIslogued(true);
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };
    checkToken();
  }, []);
  


  return (
    <SafeAreaProvider isTVSelectable={true}>
      {isLogued ? <AppNavigator /> : <AuthStack />}
    </SafeAreaProvider>
  );
};

export default Routes;
