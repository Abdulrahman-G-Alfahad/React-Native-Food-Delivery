import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantNavigation from "../RestaurantNav/RestaurantNavigation";
import Cart from "../../screens/Cart";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Profile from "../../screens/Profile";
import ProfileNavigation from "../HeaderNav/ProfileNavigation";
import CartNavigation from "../HeaderNav/CartNavigation";

const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={RestaurantNavigation}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="home" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarIcon: () => {
            return (
              <MaterialCommunityIcons name="account" size={24} color="black" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigation}
        options={{
          tabBarIcon: () => {
            return <AntDesign name="shoppingcart" size={24} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
