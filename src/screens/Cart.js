import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItemCard from "../components/CartItemCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const totalPrice = cart
    ?.reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  const cartMap = new Map();
  cart.forEach((item) => {
    if (cartMap.has(item._id)) {
      const value = cartMap.get(item._id);
      cartMap.set(item._id, { ...item, quantity: value.quantity + 1 });
    } else {
      cartMap.set(item._id, { ...item, quantity: 1 });
    }
  });

  const uniqueItems = Array.from(cartMap.values()).filter(
    (item) => item.quantity > 0
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer}>
        {uniqueItems.length > 0 ? (
          uniqueItems.map((item) => (
            <View key={item._id} style={styles.cardContainer}>
              <CartItemCard item={item} quantity={item.quantity} />
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No items in your cart</Text>
        )}
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
  },
  header: {
    backgroundColor: "steelblue",
    width: "100%",
    alignItems: "center",
    padding: 10,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  itemsContainer: {
    width: "100%",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  noItemsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  totalContainer: {
    width: "90%",
    padding: 10,
    backgroundColor: "steelblue",
    borderRadius: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
