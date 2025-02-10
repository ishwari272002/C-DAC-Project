import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";

export default function OrdersPage({ navigation }) {
  const [ordersReceived, setOrdersReceived] = useState([
    { id: "1", customerName: "John Doe", location: "Hinjewadi", date: "2025-02-01", time: "12:30 PM", orderItem: "Veg Thali", price: "150" },
    { id: "2", customerName: "Alice Smith", location: "Wakad", date: "2025-02-01", time: "01:00 PM", orderItem: "Non-Veg Thali", price: "200" },
  ]);
  
  const [itemsToPrepare, setItemsToPrepare] = useState([]);
  const [outForDelivery, setOutForDelivery] = useState([]);

  const acceptOrder = (order) => {
    setItemsToPrepare([...itemsToPrepare, order]);
    setOrdersReceived(ordersReceived.filter((item) => item.id !== order.id));
  };

  const declineOrder = (orderId) => {
    setOrdersReceived(ordersReceived.filter((item) => item.id !== orderId));
    Alert.alert("Order Declined", "The order has been declined.");
  };

  const markOrderReady = (order) => {
    const updatedItems = itemsToPrepare.filter((item) => item.id !== order.id);
    setItemsToPrepare(updatedItems);

    // Assign delivery agent and set status to "Out for Delivery"
    const updatedOrder = { ...order, status: "Out for Delivery", deliveryAgent: "Agent 007" };
    setOutForDelivery([...outForDelivery, updatedOrder]);
  };

  const markDelivered = (orderId) => {
    const updatedItems = outForDelivery.filter((item) => item.id !== orderId);
    setOutForDelivery(updatedItems);
    Alert.alert("Order Delivered", "The order has been successfully delivered.");
  };

  return (
    <View style={styles.container}>
      {/* Orders Receiving Section */}
      <Text style={styles.sectionTitle}>Orders Receiving</Text>
      <FlatList
        data={ordersReceived}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderDetails}>
              {item.customerName} - {item.location} ({item.date} at {item.time})
            </Text>
            <Text style={styles.orderDetails}>Item: {item.orderItem}</Text>
            <Text style={styles.orderDetails}>Price: ₹{item.price}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => acceptOrder(item)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => declineOrder(item.id)}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Items to Prepare Section */}
      <Text style={styles.sectionTitle}>Items to Prepare</Text>
      <FlatList
        data={itemsToPrepare}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderDetails}>
              {item.customerName} - {item.location} ({item.date} at {item.time})
            </Text>
            <Text style={styles.orderDetails}>Item: {item.orderItem}</Text>
            <Text style={styles.orderDetails}>Price: ₹{item.price}</Text>
            <TouchableOpacity style={[styles.button, styles.readyButton]} onPress={() => markOrderReady(item)}>
              <Text style={styles.buttonText}>Order Ready</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Out for Delivery Section */}
      <Text style={styles.sectionTitle}>Out for Delivery</Text>
      <FlatList
        data={outForDelivery}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderDetails}>
              {item.customerName} - {item.location} ({item.date} at {item.time})
            </Text>
            <Text style={styles.orderDetails}>Item: {item.orderItem}</Text>
            <Text style={styles.orderDetails}>Price: ₹{item.price}</Text>
            <Text style={styles.statusLabel}>{item.status}</Text>
            <Text style={styles.deliveryAgent}>Delivery Agent: {item.deliveryAgent}</Text>
            <TouchableOpacity style={[styles.button, styles.deliveredButton]} onPress={() => markDelivered(item.id)}>
              <Text style={styles.buttonText}>Mark as Delivered</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Tab Layout */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("TiffinProviderDashboard")}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("Orders")}>
          <Text style={styles.tabText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("Customers")}>
          <Text style={styles.tabText}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("Finance")}>
          <Text style={styles.tabText}>Finance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  orderCard: { backgroundColor: "#f9f9f9", padding: 15, marginBottom: 15, borderRadius: 5, borderWidth: 1, borderColor: "#ccc" },
  orderDetails: { fontSize: 14, marginBottom: 5 },
  statusLabel: { fontSize: 14, fontWeight: "bold", color: "orange", marginTop: 5 },
  deliveryAgent: { fontSize: 12, color: "#555" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5, width: "48%" },
  acceptButton: { backgroundColor: "#4CAF50" },
  declineButton: { backgroundColor: "#FF6347" },
  readyButton: { backgroundColor: "#FFD700", marginTop: 10 },
  deliveredButton: { backgroundColor: "#008CBA", marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  bottomTabContainer: { flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#f1f1f1", paddingVertical: 10 },
  tabButton: { paddingVertical: 5 },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#333" },
});