import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById } from "../api/FoodDeliveryApi";

const Menues = ({ route }) => {
  const { restaurantId } = route.params;
  const [search, setSearch] = useState("");
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getRestaurantById", { restaurantId }],
    queryFn: () => getRestaurantById(restaurantId),
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
        <Text style={styles.loadingText}>Loading Menue...</Text>
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

  const filteredItems = restaurant.items?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView
      style={{
        width: "100%",
        //alignItems: "center",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{restaurant.name}</Text>
          <Image
            source={{ uri: restaurant.image }}
            style={{ height: 180, width: 180 }}
          />
          <Text style={styles.headerBottomText}>
            Rating: {restaurant.rating}
          </Text>
          <Text style={styles.headerBottomText}>
            Delivery Time: {restaurant.deliveryTime}
          </Text>
        </View>
        <TextInput
          style={{
            width: "90%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
          value={search}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
        />
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          {filteredItems?.map((item) => (
            <View
              key={
                restaurant._id + " " + item._id ||
                restaurant.name + " " + item.name
              }
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 5,
              }}
            >
              <ItemCard itemId={item._id} />
            </View>
          )) || <Text>No Food Available</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

export default Menues;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "steelblue",
    width: "95%",
    alignItems: "center",
    padding: 10,
    elevation: 20,
    shadowColor: "black",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
  },
  headerBottomText: {
    fontSize: 20,
    padding: 10,
    color: "#fff",
  },
});
