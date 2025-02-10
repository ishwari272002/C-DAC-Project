import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";

export default function CustomerDetails({ route }) {
  const { customer } = route.params;

  const calculateExpiryDate = (paymentDate, mealPlan) => {
    const startDate = new Date(paymentDate);
    let daysToAdd = 0;

    switch (mealPlan) {
      case "Daily":
        daysToAdd = 1;
        break;
      case "Weekly":
        daysToAdd = 7;
        break;
      case "Monthly":
        daysToAdd = 30;
        break;
      default:
        daysToAdd = 0;
    }

    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + daysToAdd);
    return expiryDate.toDateString();
  };

  const [expiryDate, setExpiryDate] = useState(
    calculateExpiryDate(customer.paymentDate, customer.mealPlan)
  );

  const [feedbacks, setFeedbacks] = useState([
    { id: "1", feedback: "Great food quality!" },
    { id: "2", feedback: "Timely delivery and good service." },
  ]);

  const [rating, setRating] = useState(null);

  const rateCustomer = (value) => {
    setRating(value);
    Alert.alert("Customer Rated", `You rated ${customer.name} ${value} stars.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Details</Text>

      <View style={styles.card}>
        <Text style={styles.text}><Text style={styles.bold}>Name:</Text> {customer.name}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Location:</Text> {customer.location}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Meal Plan:</Text> {customer.mealPlan}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Date of Payment:</Text> {customer.paymentDate}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Date of Expiry:</Text> {expiryDate}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Mobile No:</Text> +91 {customer.mobile}</Text>
      </View>

      <Text style={styles.sectionTitle}>Feedbacks Received</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.feedback}>{item.feedback}</Text>}
      />

      <Text style={styles.sectionTitle}>Rate Customer</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => rateCustomer(star)}>
            <Text style={[styles.star, rating >= star && styles.selectedStar]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  card: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8, marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 5 },
  bold: { fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  feedback: { backgroundColor: "#eef", padding: 10, marginBottom: 5, borderRadius: 5 },
  ratingContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  star: { fontSize: 30, color: "#ccc", marginHorizontal: 5 },
  selectedStar: { color: "#FFD700" },
});