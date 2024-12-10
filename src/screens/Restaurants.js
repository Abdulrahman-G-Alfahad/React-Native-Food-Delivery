import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RestaurantCard from "../components/RestaurantCard";
import CategoryCard from "../components/CategoryCard";
import { getAllCategories, getAllRestaurants } from "../api/FoodDeliveryApi";

const Restaurants = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  const {
    data: restaurants,
    isLoading: isLoadingRestaurants,
    error: errorRestaurants,
  } = useQuery({
    queryKey: ["getAllRestaurants"],
    queryFn: getAllRestaurants,
  });

  if (isLoadingCategories || isLoadingRestaurants) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="steelblue" />
        <Text style={styles.loadingText}>Loading Restaurants...</Text>
      </View>
    );
  }

  if (errorCategories || errorRestaurants) {
    return (
      <View style={styles.container}>
        <Text>
          Error: {errorCategories?.message || errorRestaurants?.message}
        </Text>
      </View>
    );
  }

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category.name === selectedCategory
      )
    : restaurants;

  const filteredRestaurantsBySearch = search
    ? filteredRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      )
    : filteredRestaurants;

  const isValidImageUrl = (url) => {
    return url && url.startsWith("http");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.categoryContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryCard,
            !selectedCategory && styles.selectedCategoryCard,
          ]}
          onPress={() => setSelectedCategory(null)}
          activeOpacity={0.6}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === category.name &&
                  styles.selectedCategoryCard,
              ]}
              key={category._id || category.name}
              onPress={() => {
                setSelectedCategory(category.name);
              }}
              activeOpacity={0.6}
            >
              <CategoryCard category={category} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>No Categories Available</Text>
        )}
      </ScrollView>

      <TextInput
        style={{
          width: "90%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
        value={search}
        placeholder="Search..."
        onChangeText={(text) => setSearch(text)}
      />

      <ScrollView style={styles.listContainer}>
        {filteredRestaurantsBySearch?.length > 0 ? (
          filteredRestaurantsBySearch.map((restaurant) => (
            <View
              key={restaurant.id || restaurant.name}
              style={styles.restaurantCard}
            >
              <RestaurantCard
                restaurant={restaurant}
                isValidImageUrl={isValidImageUrl(restaurant.image)}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No Restaurants Available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
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
  categoryContainer: {
    width: "100%",
    height: 40,
  },
  categoryScrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryCard: {
    marginHorizontal: 3,
    borderRadius: 10,
  },
  listContainer: {
    width: "100%",
    height: "70%",
    marginTop: 10,
  },
  restaurantCard: {
    padding: 1,
    borderRadius: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  selectedCategoryCard: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 12,
    //marginHorizontal: 5,
    maxWidth: 150,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    padding: 10,
  },
});
