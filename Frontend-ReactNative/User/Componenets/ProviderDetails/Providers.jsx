import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card } from "react-native-paper";
import API_BASE_URL from "../../../config";

const ProviderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId } = route.params;

  const [provider, setProvider] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderDetails();
    fetchMenuItems();
  }, []);

  const fetchProviderDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/provider/${providerId}`);
      if (!response.ok) throw new Error("Failed to fetch provider details");
      const data = await response.json();
      setProvider(data);
    } catch (error) {
      console.error("Error fetching provider details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/list/${providerId}`);
      if (!response.ok) throw new Error("Failed to fetch menu items");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.menu_id]: prevCart[item.menu_id]
        ? {
            ...prevCart[item.menu_id],
            quantity: prevCart[item.menu_id].quantity + 1,
          }
        : { ...item, quantity: 1 },
    }));
  };

  const incrementQuantity = (menu_id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [menu_id]: {
        ...prevCart[menu_id],
        quantity: prevCart[menu_id].quantity + 1,
      },
    }));
  };

  const decrementQuantity = (menu_id) => {
    setCart((prevCart) => {
      if (prevCart[menu_id].quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[menu_id];
        return newCart;
      }
      return {
        ...prevCart,
        [menu_id]: {
          ...prevCart[menu_id],
          quantity: prevCart[menu_id].quantity - 1,
        },
      };
    });
  };

  const goToCart = () => {
    navigation.navigate("cart", { cartItems: Object.values(cart), providerId });
};

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    return (
      <View style={styles.ratingContainer}>
        {[...Array(filledStars)].map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={14} color="gold" />
        ))}
        {halfStar === 1 && <Icon name="star-half" size={14} color="gold" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon key={`empty-${index}`} name="star-o" size={14} color="gold" />
        ))}
        <Text style={styles.ratingText}>({rating})</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (!provider) {
    return <Text style={styles.errorText}>Provider details not found.</Text>;
  }

  return (

    <View style={styles.container}>
      <View style={styles.card1}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.providerName}>{provider.name} </Text>
        
        {renderStars(provider.rating)}
      </View>

      <Text style={styles.providerLocation}>📍{provider.address}</Text>

      <Text style={styles.description}>Contact-us: {provider.phone}</Text>
     
      </View>

      <Text style={styles.menuHeading}>Menu Items</Text>

      {menuItems.length === 0 ? (
        <Text style={styles.noMenuText}>No menu available.</Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.menu_id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.cardImage}
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.menuItemName}>{item.item_name}</Text>
                  <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                  {renderStars(item.rating)}
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>

                  {cart[item.menu_id] ? (
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(item.menu_id)}
                        style={styles.qtyButton}
                      >
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumber}>
                        {cart[item.menu_id].quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => incrementQuantity(item.menu_id)}
                        style={styles.qtyButton}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addToCart(item)}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {Object.keys(cart).length > 0 && (
        <TouchableOpacity onPress={goToCart} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>
            Go to Cart ({Object.keys(cart).length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card1: {
    backgroundColor: "#FFFFFF", // Neutral White background
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BDDBDB", // Light Gray border
  },
  container: { flex: 1, backgroundColor: "#FFF5E1", padding: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  providerName: { fontSize: 22, fontWeight: "bold" },
  providerLocation: { fontSize: 16, color: "#666", marginBottom: 10 },
  description: { fontSize: 14, color: "#444", marginBottom: 20 },
  menuHeading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  noMenuText: { fontSize: 16, color: "gray", textAlign: "center" },

  // Card Styles
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  cardContent: { flexDirection: "row", padding: 10 },
  cardImage: { width: 80, height: 80, borderRadius: 10 },
  cardDetails: { flex: 1, marginLeft: 10 },

  menuItemName: { fontSize: 16, fontWeight: "bold" },
  menuItemPrice: { fontSize: 14, color: "#008000", marginBottom: 5 },
  menuItemDescription: { fontSize: 12, color: "#555", marginTop: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 12, marginLeft: 5, color: "#444" },

  addButton: {
    backgroundColor: "#ff9800",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  qtyButton: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  qtyText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  qtyNumber: { fontSize: 16, fontWeight: "bold" },
  // **Cart Button**
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FF5733",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default ProviderDetails;
