import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTS from "../navigation";

const RestaurantCard = ({ restaurant, isValidImageUrl }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(ROUTS.HOME.MENUE, {
          restaurantId: restaurant._id,
        })
      }
    >
      {isValidImageUrl && (
        <Image source={{ uri: restaurant.image }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.details}>Rating: {restaurant.rating}</Text>
        <Text style={styles.details}>
          Delivery Time: {restaurant.deliveryTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "steelblue",
    borderRadius: 15,
    width: "100%",
    flexDirection: "row",
    padding: 10,
    //marginBottom: "10%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 75,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  details: {
    fontSize: 14,
    color: "#fff",
  },
});
