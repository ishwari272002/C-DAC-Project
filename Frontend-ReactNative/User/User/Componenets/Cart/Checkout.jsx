import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { cartItems, totalPrice } = route.params;

  const handlePayment = () => {
    // Here you can add your payment logic
    navigation.navigate("PaymentSuccess"); // Navigate to the success screen on payment
  };

  const handleCancel = () => {
    navigation.goBack(); // Go back to the Cart screen if cancel is pressed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.billContainer}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.billItem}>
            <Text style={styles.billText}>{item.name}</Text>
            <Text style={styles.billText}>Quantity: {item.quantity}</Text>
            <Text style={styles.billText}>₹{item.price * item.quantity}</Text>
          </View>
        ))}
        <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF5722",
  },
  billContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  billItem: {
    marginBottom: 10,
  },
  billText: {
    fontSize: 18,
    color: "#333",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 10,
  },
  payButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF5722",
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 18,
    color: "#FF5722",
    fontWeight: "bold",
  },
});

export default Checkout;