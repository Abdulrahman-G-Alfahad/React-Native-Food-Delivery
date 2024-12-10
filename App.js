import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNav/AuthNavigation";
import MainNavigation from "./src/navigation/MainNav/MainNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./src/context/UserContext";
import { CartContext } from "./src/context/CartContext";
import { getToken } from "./src/api/storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const queryClient = new QueryClient();
  const [cart, setCart] = useState([]);
  const [authorization, setAuthorization] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = await getToken();
      if (token) {
        setAuthorization(true);
      }
    };
    checkAuthorization();
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <StatusBar style="auto" />
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{ authorization, setAuthorization }}>
            <CartContext.Provider value={{ cart, setCart }}>
              {authorization ? <MainNavigation /> : <AuthNavigation />}
            </CartContext.Provider>
          </UserContext.Provider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkcontainer: {
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "steelblue",
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    backgroundColor: "steelblue",
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerButton: {
    //width: "30%",
    //paddingVertical: 5,
    //paddingHorizontal: 15,
  },
  footerText: {
    color: "#fff",
  },
});
