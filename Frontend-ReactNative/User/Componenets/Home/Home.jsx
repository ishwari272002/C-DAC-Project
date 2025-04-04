import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../../../config";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Fetching location...");

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    fetchProviders();
  }, []);
   const renderStars = (rating) => {
      const filledStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - filledStars - halfStar;
  
      return (
        <View style={styles.ratingContainer}>
          {[...Array(filledStars)].map((_, index) => (
            <Icon key={`full-${index}`} name="star" size={14} color="gold" />
          ))}
          {halfStar === 1 && <Icon name="star-half" size={14} color="gold" />}
          {[...Array(emptyStars)].map((_, index) => (
            <Icon key={`empty-${index}`} name="star-o" size={14} color="gold" />
          ))}
          <Text style={styles.ratingText}>({rating})</Text>
        </View>
      );
    };

  // Function to get user's current location
  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        setLocationName("Select a location");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Reverse Geocoding to get human-readable address
      let address = await Location.reverseGeocodeAsync(location.coords);
      if (address.length > 0) {
        setLocationName(address[0].city || "Select a location");
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
      setLocationName("Select a location");
    }
  };

  // Function to fetch providers from API
  const fetchProviders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/provider/list`);
      if (!response.ok) throw new Error("Failed to fetch providers");
      const data = await response.json();
      setProviders(data);
      setFilteredProviders(data); // Set initial filtered data
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };
  
//   // Function to fetch and sort providers based on user location
// const fetchProviders = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/provider/list`);
//     if (!response.ok) throw new Error("Failed to fetch providers");
//     let data = await response.json();

//     if (userLocation) {
//       data = data.map((provider) => ({
//         ...provider,
//         distance: provider.latitude && provider.longitude
//           ? parseFloat(
//               calculateDistance(
//                 userLocation.latitude,
//                 userLocation.longitude,
//                 provider.latitude,
//                 provider.longitude
//               )
//             )
//           : Number.MAX_VALUE, // Assign max value if location is unknown
//       }));

//       // Sort providers based on distance (nearest first)
//       data.sort((a, b) => a.distance - b.distance);
//     }

//     setProviders(data);
//     setFilteredProviders(data);
//   } catch (error) {
//     console.error("Error fetching providers:", error);
//   } finally {
//     setLoading(false);
//   }
// };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km
  };

  // Function to filter providers based on search input
  const handleSearch = (query) => {
    setSearch(query);
    if (!query.trim()) {
      setFilteredProviders(providers); // Reset list when search is empty
      return;
    }

    const filteredData = providers.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProviders(filteredData);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("select-loc")}>
          <Text style={styles.location}>📍 {locationName} </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Ionicons name="person-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for tiffin providers..."
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Show loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.provider_id.toString()}
          renderItem={({ item }) => {
            const distance =
              userLocation && item.latitude && item.longitude
                ? calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    item.latitude,
                    item.longitude
                  )
                : "Unknown";

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("providerdetails", { providerId: item.provider_id })
                }
                style={styles.card}
              >
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.cardContent}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={styles.providerName}>{item.name} </Text>
                  <Text style={styles.providerLocation}>{item.address}</Text>

                  </View>
                  

                  <Text style={styles.providerLocation}>{item.location}</Text>
                  {renderStars(item.rating)}
                  <Text style={styles.distance}>📍 {distance} km away</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF5E1", padding: 16 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 12, marginLeft: 5, color: "#444" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  location: { fontSize: 18, fontWeight: "bold", color: "#333" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  cardContent: { padding: 12 },
  providerName: { fontSize: 18, fontWeight: "bold", color: "#222" },
  providerLocation: { fontSize: 14, color: "#666", marginTop: 4 },
  distance: { fontSize: 14, color: "#444", marginTop: 6, fontWeight: "bold" },
});

export default HomeScreen;