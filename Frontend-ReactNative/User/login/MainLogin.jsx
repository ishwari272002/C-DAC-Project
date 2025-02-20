//1 mainLogin

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation }) {
  //MobileNO
  const [mobileno, setMobileNo] = useState("");

  //Error message i.e Alert
  const [error, setError] = useState(null);

  //On Login using Email
  const ContinueByEmail = () => {
    navigation.navigate("go-otp");
  };

  const UseUP = () => {
    // props.navigation.navigate("use-up");
    // props.navigation.navigate("mainmenu");
    navigation.navigate("ComingSoon");
  };

  //On Entering phone no check in database if already exists
  //if already Exist then send OTPs
  // or Register Page for new User or not exist
  // const ContinueByPhone = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:4444/user/login", {
  //       mobileno,
  //     });
  //     console.log(response.data);
  //     props.navigation.navigate("EnterPass", { mobileno });
  //   } catch (error) {
  //     setError(error.message);
  //     Alert.alert("Not Existing User Need to Register First");
  //     // props.navigation.navigate("RegisterUser", { mobileno });
  //   }
  // };

  const ContinueByPhone = () => {
    console.log("Mobile Entered is:" + mobileno);
    if (mobileno == "") {
      setError("Please Enter Mobile Number");
    } else {
      setError("");
      navigation.navigate("EnterPass", { mobileno });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/tiffin.png")} style={styles.image} />
      <Text style={styles.title}>India's Best Tiffin Delivery App</Text>

      {/* Google Button */}
      <TouchableOpacity onPress={UseUP} style={styles.googleButton}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Email Button */}

      <TouchableOpacity style={styles.emailButton} onPress={ContinueByEmail}>
        <Text style={styles.buttonText}> Continue with Email</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      {/* Phone Number Input */}
      <Text style={styles.error}>{error}</Text>
      <View style={styles.phoneInputContainer}>
         <Text style={styles.flag}>🇮🇳</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="+91"
          keyboardType="phone-pad"
          inputMode="numeric"
          value={mobileno}
          onChangeText={(value) => setMobileNo(value)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={ContinueByPhone}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  error: {
    color: "red",
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  emailButton: {
    backgroundColor: "#f5f5f5",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 15,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#ddd",
    width: "90%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "bold",
  },
});
