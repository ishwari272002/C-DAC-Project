import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { TextInput, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const GoLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  const [secureText, setSecureText] = useState(true);
  
  const navigation = useNavigation(); // Use navigation hook

  // Function to handle form submission (login)
  const handleLogin = async () => {
    if (username === "" || password === "") {
      setError("Please fill valid data");
      return;
    }

    // Clear any previous errors
    setError("");

    try {
      const response = await fetch("http://192.168.24.107:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, role,id } = data; // Get the token and role from the response
        await AsyncStorage.setItem("jwtToken", token);
        await AsyncStorage.setItem("id", JSON.stringify(id)); // Ensure it's stored as a string

        // Navigate to the appropriate page based on the role
        if (role === "admin") {
          navigation.navigate("admin"); // Navigate using useNavigation
        } else if (role === "provider") {
          navigation.navigate("provider");
        } else if (role === "customer") {
          navigation.navigate("select-loc",{id} );
        } else if (role === "agent") {
          navigation.navigate("agent");
        }

        Alert.alert("Login Successful", "You are now logged in!");
      } else {
        setError(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      setError("Network error, please try again later.");
      console.error("Error during login:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register"); // Navigate without using props
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Image
            source={require("../../assets/tiffin.png")}
            style={styles.image}
          />
          <Text style={styles.title}>India’s Best Tiffin Delivery App</Text>

          <Text style={styles.error}>{error}</Text>
          <TextInput
            label="Enter Your UserName/Mobile no"
            mode="outlined"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />

          <TextInput
            label="Enter your Password"
            mode="outlined"
            secureTextEntry={secureText}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
          />

          <TouchableOpacity onPress={() => navigation.navigate("go-otp")}>
            <Text style={styles.forgotPassword}>Forget password ?</Text>
          </TouchableOpacity>

          <Pressable
            onPress={handleLogin}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[styles.button, isHovered && styles.buttonHover]}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>

          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>
              New User ? <Text style={styles.registerLink}>Register here</Text>
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  image: {
    alignSelf: "center",
    marginBottom: 20,
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    marginBottom: 15,
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "right",
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  buttonHover: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  registerLink: {
    color: "#007bff",
  },
});

export default GoLogin;