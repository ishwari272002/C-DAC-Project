import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Cart = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { cartItems } = route.params; // Receive cart items from previous screen

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Logic to proceed to payment or checkout
    navigation.navigate("Checkout", { cartItems, totalPrice });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.name}</Text>
            <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.cartItemText}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.payNowButton} onPress={handleCheckout}>
        <Text style={styles.payNowText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0", // Light orange background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF5722", // Orange color for title
  },
  cartItem: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cartItemText: {
    fontSize: 18,
    color: "#333333",
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: "#FF9800", // Orange color for the total price section
    padding: 16,
    borderRadius: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // White color for text
  },
  payNowButton: {
    backgroundColor: "#FF5722", // Orange color for button
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payNowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White color for text
  },
});

export default Cart;
