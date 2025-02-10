import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function CustomersPage({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://192.168.226.164:3000/customers/list"); 
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch customer data");
    } finally {
      setLoading(false);
    }
  };

  const calculateExpiryDate = (dateOfPayment) => {
    const date = new Date(dateOfPayment);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Subscribed Customers</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerCard}
              onPress={() =>
                navigation.navigate("CustomerDetails", { customer: item })
              }
            >
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerDetails}>
                📍 {item.location} | 📅{" "}
                {calculateExpiryDate(item.dateOfPayment)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("TiffinProviderDashboard")}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  customerCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  customerName: { fontSize: 16, fontWeight: "bold" },
  customerDetails: { fontSize: 14, color: "#555" },
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
});
