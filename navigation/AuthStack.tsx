import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register } from "@/screens";

const Stack = createStackNavigator();

const AuthStack = ({ handleLogin }: any) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={() => <Login handleLogin={handleLogin} />}
        />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
