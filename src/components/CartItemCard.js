import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import { MaterialIcons } from "@expo/vector-icons";

const CartItemCard = ({ item, quantity }) => {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = () => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const decreaseQuantity = () => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((cartItem) => cartItem._id === item._id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <MaterialIcons name="remove-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <MaterialIcons name="add-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.costText}>
          ${Number(item.price * quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: "steelblue",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
    minHeight: 80,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    paddingHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 5,
  },
  costText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
