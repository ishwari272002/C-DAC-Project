import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function OtpScreen({navigation}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input if not the last one
    if (value && index < otp.length - 1) {
      const nextInput = `otpInput${index + 1}`;
      this[nextInput]?.focus();
    }
  };

  const handleResendOtp = () => {
    Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
  };


  //Navigate to Location Page
  const handleSubmitOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      Alert.alert("Error", "Please enter all 6 digits of the OTP.");
    } else {
      Alert.alert("Success", "Login Sucessfully !");
     navigation.replace("ChangePass");
      // Add backend OTP validation logic here
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3177/3177402.png", // Replace with your own image if needed
        }}
        style={styles.icon}
      />
      <Text style={styles.title}>Check your email for OTP</Text>
      <Text style={styles.subtitle}>OTP is Valid for 10min</Text>

      {/* OTP Input Section */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (this[`otpInput${index}`] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Resend OTP Button */}
      <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOtp}>
        <Text style={styles.submitText}>Submit OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  resendButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  resendText: {
    fontSize: 14,
    color: "#555",
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#ff7f50",
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});