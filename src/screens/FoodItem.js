import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const FoodItem = ({ route }) => {
  const { item } = route.params;
  const { cart, setCart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.price}>Price: {item.price}</Text>
        <View style={styles.separator} />
        <Text style={styles.description}>{item.description}</Text>
        <Button
          title="Add to cart"
          onPress={() => setCart((cart) => [...cart, item])}
        />
      </View>
    </View>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //height: "100%",
    alignItems: "center",
    padding: 0,
  },
  card: {
    backgroundColor: "steelblue",
    borderRadius: 20,
    width: "95%",
    //height: "100%",
    marginTop: 10,
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  price: {
    color: "#fff",
    padding: 10,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop: 10,
  },
  description: {
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
