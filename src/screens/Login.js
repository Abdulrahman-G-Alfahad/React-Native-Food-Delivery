import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTS from "../navigation";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import { login } from "../api/auth";

const Login = () => {
  const navigation = useNavigation();
  const { authorization, setAuthorization } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const { mutate, isError, error } = useMutation({
    mutationKey: "login",
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setAuthorization(true);
    },
    onError: (error) => {
      console.error("Login error:", error);
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
          <Text style={styles.headerText}>Login</Text>
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
          <Button title="Login" onPress={handleSubmit} />
          {isError && (
            <Text style={{ color: "red" }}>Login failed: {error.message}</Text>
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "black" }}>You don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTS.AUTH.REGISTER)}
          >
            <Text style={{ color: "red" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
    color: "white",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
