import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  // Fetch stored user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("id");
        console.log("Fetched User ID:", storedId);
        if (storedId !== null) {
          setUserId(storedId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch orders when userId is available
  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/id/${userId}`);
      if (response.data.length === 0) {
        setError("No orders yet.");
      } else {
        setOrders(groupOrders(response.data));
      }
    } catch (error) {
      setError("Error fetching orders. Please try again.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group orders by order_id
  const groupOrders = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      if (!grouped[order.order_id]) {
        grouped[order.order_id] = {
          order_id: order.order_id,
          date: order.order_created_at,
          total_price: order.total_price, // Ensure total price is included
          items: [],
        };
      }
      grouped[order.order_id].items.push({
        item_name: order.items_name,
        quantity: order.itemquantity,
      });
    });
    return Object.values(grouped);
  };

  // Format Date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format Time
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.noOrdersText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>📦 Order ID: {item.order_id}</Text>
            <View style={styles.orderDetails}>
              <Text style={styles.orderDate}>📅 Date: {formatDate(item.date)}</Text>
              <Text style={styles.orderTime}>⏰ Time: {formatTime(item.date)}</Text>
            </View>
            <View style={styles.divider} />
            {item.items.map((orderItem, index) => (
              <Text key={index} style={styles.orderItem}>
                🍽 {orderItem.quantity} x {orderItem.item_name}
              </Text>
            ))}
            <View style={styles.divider} />
            <Text style={styles.totalPrice}>💰 Total Price: ₹{item.total_price}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  orderDate: {
    fontSize: 14,
    color: "#555",
  },
  orderTime: {
    fontSize: 14,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  orderItem: {
    fontSize: 14,
    color: "#333",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a9d8f",
    textAlign: "right",
  },
  noOrdersText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});

export default OrdersScreen;