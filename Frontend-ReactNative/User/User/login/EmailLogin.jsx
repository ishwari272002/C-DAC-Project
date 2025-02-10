// Page open When use Login via Email

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

export default function EmailLogin({navigation}) {
  const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
  
// Navigate to EnterOTP Page
  const handleGetOtp = () => {
    if (email == "") {
      setError( "Please enter your email address.")
    } else {
      // Here, you would typically send the OTP request to your backend
      Alert.alert("OTP Requested", `An OTP has been sent to ${email}`);
      navigation.replace("enter-otp");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/tiffin.png")} // Replace with your image file path
        style={styles.image}
      />
      <Text style={styles.title}>India's Best Tiffin Delivery App</Text>
      <Text style={styles.title}>Enter your email address</Text>
            <Text style={styles.error}>{error}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  error: {
    color: "red",
  },
});
