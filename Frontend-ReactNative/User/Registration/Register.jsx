import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import axios from "axios";

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(""); // State for address
  const [error, setError] = useState(null);
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Handle the registration logic
  const handleRegister = async () => {
    console.log("Name: " + username);
    console.log("Mobile No: " + mobileNo);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);
    console.log("Address: " + address);

    // Regular expression for password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      username === "" ||
      mobileNo === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      address === "" // Check for address field
    ) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (!/^\d{10}$/.test(mobileNo)) {
      setError("Please enter a valid 10-digit mobile number.");
    } else if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, include letters, numbers, and at least one special character."
      );
    } else {
      setError("");
      try {
        // Make the API call to register the customer
        const response = await axios.post(
          "http://192.168.196.72:3000/customer/register",
          {
            name: username,
            email: email,
            password: password,
            address: address, // Send address field
            phone: mobileNo,
            location_lat: 0, // Default latitude
            location_long: 0, // Default longitude
          }
        );

        console.log("Registration successful", response.data);
        // On success, navigate to the home screen or another page
        Alert.alert("Registration successful")
        navigation.navigate("GoLogin");
      } catch (err) {
        console.error("Registration failed", err.response);
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>SignUp Page</Text>
          <Text style={styles.error}>{error}</Text>

          <TextInput
            label="Enter Your Name"
            mode="outlined"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          <TextInput
            label="Mobile Number"
            mode="outlined"
            value={mobileNo}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              if (/^\d{0,10}$/.test(text)) {
                setMobileNo(text); // Allow only 10 digits
              }
            }}
            style={styles.input}
          />

          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            label="City"
            mode="outlined"
            value={address}
            onChangeText={setAddress} // Update address
            style={styles.input}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry={secureTextConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureTextConfirm ? "eye-off" : "eye"}
                onPress={() => setSecureTextConfirm(!secureTextConfirm)}
              />
            }
          />

          <Pressable
            onPress={handleRegister}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[styles.button, isHovered && styles.buttonHover]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("GoLogin")}>
              <Text style={styles.loginLink}>Login here</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
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
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ff9800",
    alignItems: "center",
  },
  buttonHover: {
    backgroundColor: "#4CAF50", // Slightly lighter shade for hover effect
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#888",
  },
  loginLink: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
