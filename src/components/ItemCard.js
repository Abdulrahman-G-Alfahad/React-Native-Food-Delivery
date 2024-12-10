import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTS from "../navigation";
import { useQuery } from "@tanstack/react-query";
import { getItemDetails } from "../api/FoodDeliveryApi";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemCard = ({ itemId }) => {
  const navigation = useNavigation();
  const { cart, setCart } = useContext(CartContext);
  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getItemById", { itemId }],
    queryFn: () => getItemDetails(itemId),
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="steelblue" />
        <Text style={styles.loadingText}>Loading Dish...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  // console.log(item);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(ROUTS.HOME.ITEM, {
          item: item,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={() => setCart((cart) => [...cart, item])}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "steelblue",
    borderRadius: 15,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    //marginVertical: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 75,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  price: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: "center",
  },
});
