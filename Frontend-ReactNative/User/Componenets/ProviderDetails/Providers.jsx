import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const ProviderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { provider } = route.params;

  // Initialize menu with quantity and price
  const [menu, setMenu] = useState(
    provider.menu.map((item) => ({
      ...item,
      quantity: 0,
      totalPrice: 0,
    }))
  );

  // Handle quantity changes and calculate the total price
  const handleQuantityChange = (index, change) => {
    const updatedMenu = [...menu];
    const updatedItem = { ...updatedMenu[index] };

    updatedItem.quantity = updatedItem.quantity + change;

    if (updatedItem.quantity < 0) updatedItem.quantity = 0; // Prevent negative quantity
    updatedItem.totalPrice = updatedItem.quantity * updatedItem.price; // Calculate total price
    updatedMenu[index] = updatedItem;

    setMenu(updatedMenu);
  };

  // Handle adding items to cart (only items with quantity > 0)
  const handleAddToCart = () => {
    const selectedItems = menu.filter((item) => item.quantity > 0); // Filter items with quantity > 0

    if (selectedItems.length > 0) {
      navigation.navigate("cart", { cartItems: selectedItems });
    }
  };

  // Display the total price for all selected items
  const getTotalPrice = () => {
    return menu.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{provider.name} - Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.description}>Description of {item.name}</Text>
            <Text style={styles.price}>Price: ₹{item.price}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(index, -1)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(index, 1)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleAddToCart()}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Display total price and 'Go to Cart' button if any items are added */}
      {getTotalPrice() > 0 && (
        <View style={styles.cartFooter}>
          <Text style={styles.totalPriceText}>Total: ₹{getTotalPrice()}</Text>
          <TouchableOpacity
            onPress={handleAddToCart} // Go to cart with selected items
            style={styles.goToCartButton}
          >
            <Text style={styles.goToCartText}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBEE", // Light orange background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF5722", // Orange color for title
  },
  menuItem: {
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
  menuItemText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5722", // Orange price color
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: "#FF5722", // Orange button
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  addToCartButton: {
    backgroundColor: "#FF5722", // Orange button for adding to cart
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 12,
  },
  addToCartText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cartFooter: {
    paddingVertical: 12,
    backgroundColor: "#FF5722", // Orange background for footer
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  goToCartButton: {
    marginTop: 8,
    backgroundColor: "#FFFFFF", // White button to go to cart
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  goToCartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5722", // Orange text color
  },
});

export default ProviderDetails;
