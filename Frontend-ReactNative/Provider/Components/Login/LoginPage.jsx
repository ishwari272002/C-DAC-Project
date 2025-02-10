import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [showpassword, setShowpassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !showpassword) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      const response = await fetch("http://172.18.5.78:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, // Using email as username
          password: showpassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        
        // Store token for further authentication
        // Example: AsyncStorage (for React Native)
        await AsyncStorage.setItem("authToken", data.token);
  
        // Navigate based on role
        if (data.role === "admin") {
          navigation.navigate("TiffinProviderDashboard");
        } else {
          navigation.navigate("TiffinProviderDashboard");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Failed to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../images/tiffin.png")} style={styles.image} />
      <Text style={styles.title}>Tiffin Provider Login</Text>
      <Text style={styles.error}>{error}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={showpassword}
        onChangeText={(value) => setShowpassword(value)}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Registration Link */}
      <View style={styles.registrationLinkContainer}>
        <Text style={styles.registrationText}>New to Tiffin Delivery?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TiffinProviderRegistration")}
        >
          <Text style={styles.registrationLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  error: {
    color: "red",
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  registrationLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registrationText: {
    fontSize: 16,
    color: "#888",
  },
  registrationLink: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});