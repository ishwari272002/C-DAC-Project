import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SubscriptionScreen = () => {
  const handleSubscribe = (plan) => {
    Alert.alert(`Subscribed to ${plan} Plan!`);
    // Here, you can integrate Stripe, Razorpay, or other payment gateways
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Subscription Plan</Text>

      {/* Basic Plan */}
      <TouchableOpacity style={styles.planCard} onPress={() => handleSubscribe('Basic')}>
        <Text style={styles.planTitle}>Basic Plan</Text>
        <Text style={styles.planPrice}>₹199/month</Text>
      </TouchableOpacity>

      {/* Standard Plan */}
      <TouchableOpacity style={styles.planCard} onPress={() => handleSubscribe('Standard')}>
        <Text style={styles.planTitle}>Standard Plan</Text>
        <Text style={styles.planPrice}>₹499/month</Text>
      </TouchableOpacity>

      {/* Premium Plan */}
      <TouchableOpacity style={styles.planCard} onPress={() => handleSubscribe('Premium')}>
        <Text style={styles.planTitle}>Premium Plan</Text>
        <Text style={styles.planPrice}>₹999/month</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
});

export default SubscriptionScreen;