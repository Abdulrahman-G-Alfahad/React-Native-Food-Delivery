import { StyleSheet, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurants from "../../screens/Restaurants";
import Menues from "../../screens/Menues";
import FoodItem from "../../screens/FoodItem";
import ROUTS from "../index";
import React, { useContext } from "react";
import { deleteToken } from "../../api/storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { UserContext } from "../../context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Cart from "../../screens/Cart";
import Profile from "../../screens/Profile";

const Stack = createNativeStackNavigator();
const RestaurantNavigation = () => {
  const { setAuthorization } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await deleteToken();
      console.log("Token deleted.");
      setAuthorization(false);
      console.log("Authorization set to false.");
      Alert.alert("Logout", "You have been logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout Error", "An error occurred while logging out.");
    }
  };

  const headerRightComponent = () => (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
      <MaterialIcons name="logout" size={24} color="red" />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator initialRouteName={ROUTS.HOME.RESTAURANT}>
      <Stack.Screen
        name={ROUTS.HOME.RESTAURANT}
        component={Restaurants}
        options={{
          headerRight: headerRightComponent,
        }}
      />
      <Stack.Screen
        name={ROUTS.HOME.MENUE}
        component={Menues}
        options={{
          headerRight: headerRightComponent,
        }}
      />
      <Stack.Screen
        name={ROUTS.HOME.ITEM}
        component={FoodItem}
        options={{
          headerRight: headerRightComponent,
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantNavigation;

const styles = StyleSheet.create({});
