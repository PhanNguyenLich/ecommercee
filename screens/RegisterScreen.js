import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.1.11:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
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
            Register to your Account
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
            <Ionicons name="ios-person" size={24} color="black" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your name"
            />
          </View>

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
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your Email"
            />
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
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
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
            Already have an account?{" "}
            <Text style={{ color: "#f35e3d" }}>Sign In</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
