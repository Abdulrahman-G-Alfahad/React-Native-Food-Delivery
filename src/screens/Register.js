import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTS from "../navigation";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import { register } from "../api/auth";

const Register = () => {
  const navigation = useNavigation();
  const { authorization, setAuthorization } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo, image),
    onSuccess: () => {
      setAuthorization(true);
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  const handleSubmit = () => {
    mutate();
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "85%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={userInfo.username}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, username: text })
            }
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            value={userInfo.password}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, password: text })
            }
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

          <Button title="Register" onPress={handleSubmit} />
          {isError && (
            <Text style={{ color: "red" }}>
              Registration failed: {error.message}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "black" }}>
            If you already have an account,{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTS.AUTH.LOGIN)}
          >
            <Text style={{ color: "red" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "steelblue",
    width: "100%",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    elevation: 20,
    shadowColor: "black",
  },
  form: {
    backgroundColor: "steelblue",
    width: "75%",
    borderRadius: 15,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    elevation: 20,
    shadowColor: "black",
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
