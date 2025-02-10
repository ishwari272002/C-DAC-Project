import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Finance() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const transactions = [
    { id: "1", name: "Rahul Sharma", date: "2025-02-01", time: "10:30 AM", amount: 150 },
    { id: "2", name: "Priya Singh", date: "2025-02-01", time: "11:00 AM", amount: 200 },
    { id: "3", name: "Amit Verma", date: "2025-02-01", time: "12:15 PM", amount: 180 },
    { id: "4", name: "Neha Patil", date: "2025-02-01", time: "1:45 PM", amount: 220 },
    { id: "5", name: "Ankit Mehta", date: "2025-02-01", time: "2:30 PM", amount: 250 },
    { id: "6", name: "Sneha Kapoor", date: "2025-02-01", time: "3:00 PM", amount: 190 },
    { id: "7", name: "Vikas Yadav", date: "2025-02-01", time: "4:20 PM", amount: 210 },
    { id: "8", name: "Rohit Khanna", date: "2025-02-01", time: "5:10 PM", amount: 300 },
    { id: "9", name: "Kiran Joshi", date: "2025-02-01", time: "6:00 PM", amount: 280 },
    { id: "10", name: "Manisha Gupta", date: "2025-02-01", time: "7:30 PM", amount: 230 },
  ];

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  const onDateChange = (event, selected) => {
    setShowPicker(false);
    if (selected) setSelectedDate(selected);
  };

  return (
    <View style={styles.container}>
      {/* Header with Calendar Icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Finance</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Show Total Earnings for Today */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Earnings for {selectedDate.toDateString()}</Text>
        <Text style={styles.amount}>₹ {totalAmount}</Text>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.scrollView}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <Text style={styles.transactionText}>
              <Text style={styles.bold}>Customer:</Text> {transaction.name}
            </Text>
            <Text style={styles.transactionText}>
              <Text style={styles.bold}>Date:</Text> {transaction.date}
            </Text>
            <Text style={styles.transactionText}>
              <Text style={styles.bold}>Time:</Text> {transaction.time}
            </Text>
            <Text style={styles.transactionText}>
              <Text style={styles.bold}>Amount:</Text> ₹{transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker value={selectedDate} mode="date" display="default" onChange={onDateChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  summaryCard: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 10, marginBottom: 15, alignItems: "center" },
  summaryText: { fontSize: 18, fontWeight: "bold" },
  amount: { fontSize: 22, fontWeight: "bold", color: "#28a745" },
  scrollView: { flex: 1 },
  transactionCard: { backgroundColor: "#eef", padding: 15, borderRadius: 10, marginBottom: 10 },
  transactionText: { fontSize: 16, marginBottom: 3 },
  bold: { fontWeight: "bold" },
});