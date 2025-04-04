import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const cityRecommendations = [
  "Koregaon Park",
  "Baner",
  "Wakad",
  "Aundh",
  "Hinjewadi",
  "Kothrud",
  "Viman Nagar",
  "Shivaji Nagar",
  "Hadapsar",
  "Camp",
  "Pimple Saudagar",
  "Pimple Nilakh",
  "Kalyani Nagar",
  "Karve Nagar",
  "Bibvewadi",
  "Undri",
  "Kondhwa",
  "Magarpatta",
  "Prabhat Road",
  "Koregaon Park Extension",
  "Balewadi",
  "Deccan Gymkhana",
  "Bhavani Peth",
  "Shankar Sheth Road",
  "M.G. Road",
  "Pimpri",
  "Chinchwad",
  "Ravet",
  "Thergaon",
  "Bhosari",
  "Chikhali",
  "Moshi",
  "Tathawade",
  "Marunji",
  "Akurdi",
  "Nigdi",
  "Kasarwadi",
  "Khaki",
  "Sangvi",
  "Kalewadi",
  "Pimple Gurav",
  "Alandi",
  "Bopkhel",
  "Phugewadi",
  "Vetal Nagar",
  "Baner",
  "Narhe",
  "Nanded City",
  "Kiwale",
];

export default function LocationScreen({ route, navigation }) {
  const [location, setLocation] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  
  // Retrieve the token from previous screen
  const id = route.params;

  
  const setLoc = () => {
    if (location.trim() !== "") {
      console.log("location +:" + location);
      navigation.navigate("BottomTab", { location }); // Pass location as a param
    } else {
      alert("Please select a location!");
    }
  };

  const handleUseCurrentLocation = () => {
    // Navigate to MapViewScreen to select a location
    navigation.navigate("BottomTab",{id});
  };

  const handleSearchChange = (text) => {
    setLocation(text);
    // Filter city recommendations based on input
    if (text) {
      const filtered = cityRecommendations.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleSelectCity = (city) => {
    setLocation(city);
    setFilteredCities([]);
  };

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <View style={styles.topSection}>
       
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
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* Add space between the search bar and the FlatList */}
      <View style={styles.recommendationContainer}>
        {/* Display city recommendations */}
        {filteredCities.length > 0 && (
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendationItem}
                onPress={() => handleSelectCity(item)}
              >
                <Text style={styles.recommendationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Location Buttons at the Bottom */}
      <View style={styles.bottomSection}>
        {/* Use Current Location Button */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleUseCurrentLocation}
        >
          <Text style={styles.buttonText}>Set location</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={setLoc}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  topSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 50,
  },
  bottomSection: {
    justifyContent: "flex-end",
    alignItems: "center",
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
    marginBottom: 20, // Space added between search bar and FlatList
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 10,
  },
  recommendationContainer: {
    marginTop: 30,
    marginBottom: 40, // Added space between FlatList and the bottom section
  },
  locationButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ff7f50",
    marginBottom: 10,
  },
  continueButton: {
    marginTop: 10,
    backgroundColor: "#ddd",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  recommendationText: {
    fontSize: 16,
    color: "#555",
  },
});
