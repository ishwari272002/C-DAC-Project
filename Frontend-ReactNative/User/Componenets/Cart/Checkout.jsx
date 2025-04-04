import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { cartItems, totalPrice, customerId, providerId, deliveryLat, deliveryLong } = route.params;
  const [loading, setLoading] = useState(false);
   const [userId, setUserId] = useState("");
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

  const handlePayment = async () => {
    // Validate that providerId is available
    if (!providerId) {
      Alert.alert("Error", "Provider information is missing.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      Alert.alert("Error", "Your cart is empty.");
      return;
    }
  
    setLoading(true);
  
    try {
      const orderData = {
        customer_id: userId, // Use customerId from params
        provider_id: providerId,
        delivery_lat: deliveryLat || 11.11,
        delivery_long: deliveryLong || 11.11,
        total_price: totalPrice,
        payment_status: "Paid", // Assuming successful payment
        payment_type: "Online",
        items: cartItems.map(item => ({
          items_name: item.item_name,
          itemquantity: item.quantity,
        })),
      };
  
      console.log("Sending Order Data:", orderData); // Debugging log
  
      const response = await axios.post(`${API_BASE_URL}/orders/new`, orderData);
  
      if (response.status === 201) {
        Alert.alert("Success", "Order placed successfully!");
        navigation.navigate("PaymentSuccess", { orderId: response.data.order_id });
      } else {
        throw new Error(response.data?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      Alert.alert("Error", "Could not complete your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.navigate("BottomTab");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.billContainer}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.billItem}>
            <Text style={styles.menuItemName}>{item.item_name}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.billText}>Quantity: {item.quantity}</Text>
              <Text style={styles.Itemprice}>₹{item.price * item.quantity}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "#BDBDBD", marginVertical: 8 }} />
          </View>
        ))}
        <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} disabled={loading}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payText}>Pay Now</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3E0", padding: 16 },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  payText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelText: { color: "#FF0000", fontSize: 16, fontWeight: "bold" },
  menuItemName: { fontSize: 20, fontWeight: "bold" },
  Itemprice: { fontSize: 18, color: "#008000" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#FF5722" },
  billContainer: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 10, marginBottom: 20, elevation: 5 },
  billItem: { marginBottom: 10 },
  billText: { fontSize: 18, color: "#333" },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#008000", marginTop: 10 },
});

export default Checkout;