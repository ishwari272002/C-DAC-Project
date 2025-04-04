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
  const { cartItems = [], providerId } = route.params || {}; // Ensure safe destructuring
 
  // Calculate total price safely
  const totalPrice = cartItems.length
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    : 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add items before proceeding.");
      return;
    }
    navigation.navigate("Checkout", { cartItems, totalPrice, providerId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.menuItemName}>{item.item_name}</Text>
              <Text>{item.description}</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                <Text style={styles.cartItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.payNowButton} onPress={handleCheckout} disabled={cartItems.length === 0}>
        <Text style={styles.payNowText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF3E0", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#333" },
  emptyCartText: { fontSize: 18, color: "#777", textAlign: "center", marginTop: 20 },
  cartItem: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  menuItemName: { fontSize: 16, fontWeight: "bold" },
  cartItemText: { fontSize: 18, color: "#333" },
  cartItemPrice: { fontSize: 18, color: "#008000" },
  totalContainer: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  totalText: { fontSize: 20, fontWeight: "bold", color: "#008000" },
  payNowButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payNowText: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
});

export default Cart;