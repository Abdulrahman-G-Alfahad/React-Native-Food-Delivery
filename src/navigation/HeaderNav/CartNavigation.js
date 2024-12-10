import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTS from "..";
import { useContext } from "react";
import { deleteToken } from "../../api/storage";
import { UserContext } from "../../context/UserContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Cart from "../../screens/Cart";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const CartNavigation = () => {
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
    <Stack.Navigator initialRouteName={ROUTS.PERSONAL.CART}>
      <Stack.Screen
        name={ROUTS.PERSONAL.CART}
        component={Cart}
        options={{
          headerRight: headerRightComponent,
        }}
      />
    </Stack.Navigator>
  );
};

{
  /* <Stack.Screen
        name={ROUTS.PERSONAL.CART}
        component={Cart}
        options={{
          headerRight: headerRightComponent,
        }}
      /> */
}

export default CartNavigation;

const styles = StyleSheet.create({});
