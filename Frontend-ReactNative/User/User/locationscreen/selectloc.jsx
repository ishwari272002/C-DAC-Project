import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState("");
  const setLoc = () => {
    console.log("location +:" + location);
    navigation.navigate("home", { location: location });
  };
  const handleUseCurrentLocation = () => {
    // Add logic to fetch the current location
    navigation.navigate("home", { location: location });
    alert("Using your current location...");
  };

  return (
    <View style={styles.container}>
      {/* Location Icon */}
      <Image
        source={
          require("../../assets/Rocket.png") // Replace with your image link or local asset
        }
        style={styles.icon}
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Find restaurants near you!</Text>
      <Text style={styles.subtitle}>
        By allowing location access, you can search for restaurants and shops
        near you and receive more accurate delivery.
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search, area, street name"
          placeholderTextColor="#888"
          value={location}
          onChangeText={(text) => setLocation(text)}
        ></TextInput>
      </View>

      {/* Use Current Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleUseCurrentLocation}
      >
        <Text style={styles.buttonText}>Use current location</Text>
      </TouchableOpacity>
      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={setLoc}>
        <Text style={styles.continueButtonText}>Continue</Text>
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
  continueButton: {
    marginTop: 10,
    backgroundColor: "#ddd",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 10,
  },
  locationButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ff7f50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
