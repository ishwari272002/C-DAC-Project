import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import {
  TextInput,
  Card,
  Button,
} from "react-native-paper";

const ChangePassword = (props) => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);


  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  // Function to handle password change
  const handleChangePassword = () => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (newPassword === "" || confirmPassword === "") {
      setError("All fields are required");
    } else if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
    } else if (!passwordRegex.test(newPassword)) {
      setError("Password must be at least 8 characters long, include letters, numbers, and at least one special character.");
    } else {
      setError("");
      Alert.alert("Success", "Password changed successfully");
      props.navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Change Password</Text>

          <Text style={styles.error}>{error}</Text>

        

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry={secureNew}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureNew ? "eye-off" : "eye"}
                onPress={() => setSecureNew(!secureNew)}
              />
            }
          />

          <TextInput
            label="Confirm New Password"
            mode="outlined"
            secureTextEntry={secureConfirm}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureConfirm ? "eye-off" : "eye"}
                onPress={() => setSecureConfirm(!secureConfirm)}
              />
            }
          />

          <Pressable
            onPress={handleChangePassword}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[
              styles.button,
              isHovered && styles.buttonHover,
            ]}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  buttonHover: {
    backgroundColor: "#45A049",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChangePassword;