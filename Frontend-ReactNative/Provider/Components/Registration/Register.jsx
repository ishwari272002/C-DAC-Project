import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,Picker
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [shopName, setShopName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [location, setLocation] = useState(""); // State for location dropdown
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle the registration logic
  const handleRegister = () => {
    console.log("Shop Name: " + shopName);
    console.log("Mobile No: " + mobileNo);
    console.log("Location: " + location);
    console.log("Email: " + email);
    console.log("Password: " + password);
    console.log("Confirm Password: " + confirmPassword);

    if (
      shopName === "" ||
      mobileNo === "" ||
      location === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (!/^\d{10}$/.test(mobileNo)) {
      setError("Please enter a valid 10-digit mobile number.");
    } else {
      setError("");

      // Show success alert
      Alert.alert(
        "Registration Successful",
        "Your Tiffin Service Shop has been successfully registered!",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to TiffinProviderDashboard or login page
              navigation.navigate("TiffinProviderDashboard");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiffin Provider Registration</Text>
      <Text style={styles.error}>{error}</Text>

      <TextInput
        style={styles.input}
        placeholder="Tiffin Service Shop Name"
        value={shopName}
        onChangeText={setShopName}
      />

      <View style={styles.phoneContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={(text) => {
            if (/^\d{0,10}$/.test(text)) {
              setMobileNo(text); // Allow only 10 digits
            }
          }}
        />
      </View>

      {/* Dropdown for location selection */}
      <Picker
        selectedValue={location}
        style={styles.input}
        onValueChange={(itemValue) => setLocation(itemValue)}
      >
        <Picker.Item label="Select Location" value="" />
        <Picker.Item label="Hinjewadi" value="Hinjewadi" />
        <Picker.Item label="Wakad" value="Wakad" />
        <Picker.Item label="Aundh" value="Aundh" />
        <Picker.Item label="Koregaon Park" value="Koregaon Park" />
        <Picker.Item label="Shivaji Nagar" value="Shivaji Nagar" />
        <Picker.Item label="Viman Nagar" value="Viman Nagar" />
        <Picker.Item label="MagarPatta" value="MagarPatta" />
        <Picker.Item label="Kharadi" value="Kharadi" />
        <Picker.Item label="Peths" value="Peths" />
        <Picker.Item label="Kothrud" value="Kothrud" />
        <Picker.Item label="Pimpri Chinchwad" value="Pimpri Chinchwad" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Link to Login Page */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TiffinProviderLogin")}
        >
          <Text style={styles.loginLink}>Login here</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 16,
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
});
