import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Show the splash screen for 3 seconds
        setTimeout(async () => {
          // Retrieve the stored token
          const token = await AsyncStorage.getItem("jwtToken");

          if (token) {
            // Decode the JWT token to get the role
            const payloadBase64 = token.split(".")[1]; // Token contains 3 parts: header, payload, signature
            const decodedPayload = JSON.parse(
              atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/")) // Handle base64 URL-safe encoding
            );

            const role = decodedPayload.role; // Extract role from the decoded payload

            // Navigate based on the role
            if (role === "admin") {
              navigation.replace("admin");
            } else if (role === "provider") {
              navigation.replace("provider");
            } else if (role === "customer") {
              navigation.replace("select-loc");
            } else if (role === "agent") {
              navigation.replace("agent");
            } else {
              navigation.replace("GoLogin"); // In case role is not recognized
            }
          } else {
            // No token, navigate to login page
            navigation.replace("GoLogin");
          }
        }, 1000); // 3 seconds delay
      } catch (error) {
        console.error("Error during splash screen check:", error);
        navigation.replace("LoginPage"); // Navigate to login if error occurs
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.welcomeText}>Welcome to Pahunchar</Text>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#000",
  },
});

export default SplashScreen;
