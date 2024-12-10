import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import restaurantCategories from "../../data/restaurantCategories";
import CategoryCard from "../components/CategoryCard";

const Categories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {restaurantCategories.length > 0 ? (
          restaurantCategories.map((category) => (
            <View
              style={styles.cardContainer}
              key={category.id || category.name}
            >
              <CategoryCard category={category} />
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No Categories Available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "orange",
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
    textAlign: "center",
  },
  listContainer: {
    width: "100%",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
