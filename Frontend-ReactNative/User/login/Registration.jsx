import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
//import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

const RegistrationPage = (props) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegistration = async () => {
    if (!name) {
      setError((prevError) => ({ ...prevError, name: "Name is required" }));
    } else if (!mobile) {
      setError((prevError) => ({ ...prevError, mobile: "Mobile is required" }));
    } else if (!email) {
      setError((prevError) => ({ ...prevError, email: "Email is required" }));
    } else if (!password) {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required",
      }));
    } else if (!confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: "Confirm Password is required",
      }));
    } else if (password !== confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      props.navigation.navigate("Login");
      //   try {
      //     const response = await axios.post('https://your-node-js-api.com/register', {
      //       name,
      //       mobile,
      //       email,
      //       password,
      //     });
      //     console.log(response.data);
      //   } catch (error) {
      //     console.error(error);
      //   }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registration Page</Text>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {error.name && <Text style={{ color: "red" }}>{error.name}</Text>}
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Mobile"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      {error.mobile && <Text style={{ color: "red" }}>{error.mobile}</Text>}
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {error.email && <Text style={{ color: "red" }}>{error.email}</Text>}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Ionicons
            name={secureTextEntry ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {error.password && <Text style={{ color: "red" }}>{error.password}</Text>}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Ionicons
            name={secureTextEntry ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {error.confirmPassword && (
        <Text style={{ color: "red" }}>{error.confirmPassword}</Text>
      )}
      <TouchableOpacity
        style={{
          width: "80%",
          height: 40,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleRegistration}
      >
        <Text style={{ color: "white" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationPage;
