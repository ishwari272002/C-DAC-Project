import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentSuccess = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("BottomTab"); // Navigate to the Home screen or wherever you want
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Rocket.png")} // Add your success icon here
        style={styles.successIcon}
      />
      <Text style={styles.successText}>Payment Successful</Text>
      <Text style={styles.thankYouText}>Thank you for ordering!</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 16,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C", // Green color for success
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 18,
    color: "#388E3C",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  backText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PaymentSuccess;