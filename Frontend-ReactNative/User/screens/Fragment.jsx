import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const SlideUpFragment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value 0 (hidden)

  const openFragment = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1, // Slide up
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFragment = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide down
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false)); // Hide after animation
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openFragment}>
        <Text style={styles.buttonText}>Open Fragment</Text>
      </TouchableOpacity>

      {isVisible && (
        <Animated.View
          style={[
            styles.fragment,
            { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }
          ]}
        >
          <Text style={styles.fragmentText}>This is a sliding fragment!</Text>
          <TouchableOpacity style={styles.button} onPress={closeFragment}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fragment: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  fragmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SlideUpFragment;