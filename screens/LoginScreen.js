import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error message");
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.2.64:3000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login error", "Invalid Email");
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            url: "https://vi.sblaw.vn/wp-content/uploads/2016/07/e-commerce-logo-44851.2.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 12,
              color: "#041e42",
            }}
          >
            Login to in your Account
          </Text>
        </View>

        {/* Email */}

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: "80%",
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your email"
            ></TextInput>
          </View>
        </View>
        {/* Password */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign name="lock1" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: "80%",
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your password"
            ></TextInput>
          </View>
        </View>
        {/* forgot pass */}
        <View style={{ marginTop: 12, alignItems: "flex-end" }}>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forgot Password
          </Text>
        </View>
        <Pressable
          onPress={handleLogin}
          style={{
            width: 348,
            marginTop: 80,
            backgroundColor: "#f35e3d",
            borderRadius: 5,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "500" }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 12 }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "gray",
              fontWeight: "500",
            }}
          >
            Don't have an Account?
            <Text style={{ color: "#f35e3d" }}> Sign up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
