import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation }) {
  const [shopLocation] = useState("Hinjewadi, Pune");
  const [menuList, setMenuList] = useState([
    {
      id: "1",
      name: "Veg Thali",
      description: "Rice, Roti, Dal, Sabji",
      price: "₹120",
    },
    {
      id: "2",
      name: "Non-Veg Thali",
      description: "Chicken Curry, Rice, Roti",
      price: "₹200",
    },
    {
      id: "3",
      name: "Paneer Curry",
      description: "Paneer in rich tomato gravy",
      price: "₹150",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewMenu(item);
    setShowModal(true);
  };
  const handleLogout = async () => {
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem("jwtToken");

      // Redirect the user to the login screen
      navigation.replace("GoLogin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSaveItem = () => {
    if (
      !newMenu.name.trim() ||
      !newMenu.description.trim() ||
      !newMenu.price.trim()
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    setMenuList((prevList) =>
      prevList.map((item) => (item.id === editItem.id ? newMenu : item))
    );
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.shopLocation}>{shopLocation}</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Menu List */}
      <ScrollView style={styles.menuListContainer}>
        {menuList.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.menuTitle}>{item.name}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
            <Text style={styles.menuPrice}>{item.price}</Text>
            <TouchableOpacity
              onPress={() => handleEditItem(item)}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={handleLogout}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={styles.tabText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Customers")}
        >
          <Text style={styles.tabText}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Finance")}
        >
          <Text style={styles.tabText}>Finance</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Item Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Menu Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newMenu.name}
              onChangeText={(text) => setNewMenu({ ...newMenu, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newMenu.description}
              onChangeText={(text) =>
                setNewMenu({ ...newMenu, description: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newMenu.price}
              onChangeText={(text) => setNewMenu({ ...newMenu, price: text })}
            />
            <Button title="Save" onPress={handleSaveItem} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  shopLocation: { fontSize: 18, fontWeight: "bold" },
  profileButton: { padding: 10 },
  menuListContainer: { marginTop: 20 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  menuTitle: { fontSize: 18, fontWeight: "bold" },
  menuDescription: { fontSize: 14, color: "gray" },
  menuPrice: { fontSize: 16, color: "green", marginTop: 5 },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  editButtonText: { color: "#fff", fontSize: 14 },
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
  },
  tabButton: { paddingVertical: 5 },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#333" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
