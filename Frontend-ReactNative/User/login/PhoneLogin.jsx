import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from "react-native";
//import {TextInput} from "react-native-paper";
import { useState } from "react";

function LoginScreen2({navigation}) {
  // const mobileno = route.params;
  const [showpassword, setShowpassword] = useState("");
  const [error, setError] = useState(null);

  const Continue = () => {
    if (showpassword == "") {
      setError("Please Enter valid Password");
    } else {
      setError("");//clear error
      navigation.replace("select-loc");
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ManDancing.png")} 
        style={styles.image}
      />

      {/* <Text>{mobileno}</Text> */}
      <Text style={styles.error}>{error}</Text>

      <TextInput
        style={styles.phoneInputContainer}
        placeholder="Enter Password"
        secureTextEntry
        value={showpassword}
        onChangeText={(value) => {
          setShowpassword(value);
        }}
      ></TextInput>

      {/* Email Button */}
      <TouchableOpacity style={styles.googleButton} onPress={Continue}>
        <Text style={styles.buttonText}> Login</Text>
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
  image: {
    width: 300,
    height: 200,
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
  PasswordInputContainer: {
    // flexDirection: 'row',
    alignItems: "center",
    width: "90%",
    height: 20,
    //  borderWidth: 1,
    //  borderColor: '#ccc',
    //  borderRadius: 5,
    padding: 10,
    marginBottom: 400,
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
  error: {
    color: "red",
  },
});

export default LoginScreen2;
