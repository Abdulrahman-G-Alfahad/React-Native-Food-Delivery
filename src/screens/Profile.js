import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth";

const Profile = () => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="steelblue" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {profile.image ? (
          <Image
            source={{
              uri: `https://react-native-food-delivery-be.eapi.joincoded.com/${profile.image}`,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.name}>{profile.username}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "steelblue",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
