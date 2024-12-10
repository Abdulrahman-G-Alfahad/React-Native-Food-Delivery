import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: category?.image || "https://via.placeholder.com/50",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.text}>{category?.name || "Unknown Category"}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "steelblue",
    borderRadius: 10,
    maxWidth: 150,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    //marginHorizontal: 3,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 50,
    height: 35,
    borderRadius: 5,
  },
  text: {
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 1,
  },
});
