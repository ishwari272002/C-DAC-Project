import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Sample user data
  const [userData, setUserData] = useState({
    name: "Yash Vijay Bharsakle",
    mobile: "+91 1234567890",
    email: "yash@example.com",
    address: "Indore, MP",
    subscriptionPlan: "Premium",
  });

  // Handle logout
  const handleLogout = () => {
    // Handle the logout logic here (e.g., clear session, token, etc.)
    // Navigate to Login screen
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          editable={false}
        />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={userData.mobile}
          editable={false}
        />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          editable={false}
        />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={userData.address}
          editable={false}
        />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Subscription Plan</Text>
        <TextInput
          style={styles.input}
          value={userData.subscriptionPlan}
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfileScreen;
