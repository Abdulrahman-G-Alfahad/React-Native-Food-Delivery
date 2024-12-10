import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Register from "../../screens/Register";
import ROUTS from "..";

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTS.AUTH.LOGIN}>
      <Stack.Screen name={ROUTS.AUTH.LOGIN} component={Login} />
      <Stack.Screen name={ROUTS.AUTH.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
