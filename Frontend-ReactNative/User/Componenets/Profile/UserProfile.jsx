import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(""); // State for storing user ID

  // Sample user data
  const [userData, setUserData] = useState({
    name: "Yash Vijay Bharsakle",
    mobile: "+91 1234567890",
    email: "yash@example.com",
    address: "Indore, MP",
    subscriptionPlan: "Premium",
  });

  // Fetch stored user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("id"); // Get stored ID
        console.log("Fetched User ID:", storedId); // Debugging log
        if (storedId !== null) {
          setUserId(storedId); // Update state
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("userId"); // Remove stored ID
      navigation.replace("GoLogin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      
      {/* Display the stored user ID */}
      <Text style={styles.tokenText}>User ID: {userId}</Text>
      

      <View style={styles.profileItem}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={userData.name} editable={false} />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value={userData.mobile} editable={false} />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={userData.email} editable={false} />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={userData.address} editable={false} />
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Subscription Plan</Text>
        <TextInput style={styles.input} value={userData.subscriptionPlan} editable={false} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePass")}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
  tokenText: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#f0f0f0",
    color: "#333",
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