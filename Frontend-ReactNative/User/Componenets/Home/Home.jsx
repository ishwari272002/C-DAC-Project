import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Icons for profile, location, and rating

const providers = [
  {
    id: "4",
    name: "Shree Thali",
    location: "Nagpur, MH",
    rating: 4.5,
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
    menu: [
      { name: "Vegetable Thali", price: 100 },
      { name: "Puran Poli", price: 50 },
      { name: "Chapati", price: 20 },
      { name: "Dal Tadka", price: 60 },
    ],
  },
  {
    id: "5",
    name: "Tiffin Junction",
    location: "Bhopal, MP",
    rating: 4.2,
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
    menu: [
      { name: "Veg Tiffin", price: 80 },
      { name: "Chapati", price: 20 },
      { name: "Vegetable Curry", price: 60 },
      { name: "Rice", price: 40 },
      { name: "Raita", price: 30 },
    ],
  },
  // Add similar data for other providers...
];

const HomeScreen1 = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.location}>📍 Hinjewadi,Pune</Text>
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
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List of Tiffin Providers */}
      <FlatList
        data={providers.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("providerdetails", { provider: item })
            }
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.providerName}>{item.name}</Text>
              <Text style={styles.providerLocation}>{item.location}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="gold" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <Text style={styles.menuText}>
                Menu: {item.menu.map((menuItem) => `${menuItem.name} - ₹${menuItem.price}`).join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
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
  image: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 12,
  },
  providerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  providerLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "bold",
    color: "#444",
  },
  menuText: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
});

export default HomeScreen1;