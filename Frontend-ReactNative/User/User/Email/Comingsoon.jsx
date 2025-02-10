import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ComingSoonScreen;