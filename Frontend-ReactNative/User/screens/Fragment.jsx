import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Button,
  TextInput,

  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { Card, IconButton } from "react-native-paper";

export default function FragmentExample() {
  const [menuItems, setMenuItems] = useState([
    {
      ItemNo: 1,
      ItemName: "Paneer Pizza",
      Price: 200,
      ImageUrl:
        "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "pizza, veg, italian, indian, food",
    },

    {
      ItemNo: 2,
      ItemName: "Pasta",
      Price: 300,
      ImageUrl:
        "https://www.themealdb.com//images//media//meals//wvqpwt1468339226.jpg",
      SearchKeywords: "pasta, veg, italian,food",
    },
    {
      ItemNo: 3,
      ItemName: "Matar Paneer",
      Price: 350,
      ImageUrl:
        "https://www.themealdb.com//images//media//meals//xxpqsy1511452222.jpg",
      SearchKeywords: "matar,paneer,veg, indian,food",
    },
    {
      ItemNo: 4,
      ItemName: "Veg Biryani",
      Price: 400,
      ImageUrl: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "biryani, veg, indian, rice, food",
    },
    {
      ItemNo: 5,
      ItemName: "Cheese Garlic Bread",
      Price: 150,
      ImageUrl:
        "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "bread, cheese, garlic, snack, food",
    },
    {
      ItemNo: 6,
      ItemName: "Vegetable Manchurian",
      Price: 250,
      ImageUrl:
        "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "manchurian, veg, chinese, food",
    },
    {
      ItemNo: 7,
      ItemName: "Paneer Tikka",
      Price: 300,
      ImageUrl:
        "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "paneer, tikka, indian, appetizer, food",
    },
    {
      ItemNo: 8,
      ItemName: "Vegetable Spring Rolls",
      Price: 200,
      ImageUrl:
        "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      SearchKeywords: "spring rolls, veg, snack, food",
    },
  ]);
      const ContinueByPhone = () => {
        console.log("Mobile Entered is:" + mobileno);
        if (mobileno == "") {
          setError("Please Enter Mobile Number");
        } else {
          setError("");
          props.navigation.navigate("EnterPass", { mobileno });
        }
      };
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation value

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
      

      <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "skyblue",
          justifyContent: "space-between",
        }}
      >
        <IconButton 
        //onPress={UpdateProfile}
        icon={"account"}></IconButton>

        <IconButton 
        //onPress={gotocart} 
        icon={"cart"}></IconButton>
      </View>

      <Card style={{ flex: 1, borderRadius: 16, padding: 20 }}>
        <ScrollView>
          {menuItems.map((menuItem) => {
            return (
              <View style={styles.Card} key={menuItem.ItemNo}>
                <Image
                  source={{ uri: menuItem.ImageUrl }}
                  style={{ height: 100, width: 100 }}
                />
                <View
                  style={{ flex: 1, flexDirection: "column", marginLeft: 60 }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontStyle: "normal",
                      margin: 5,
                    }}
                  >
                    {menuItem.ItemName}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontStyle: "normal",
                      margin: 5,
                    }}
                  >
                    INR {menuItem.Price}
                  </Text>
                  <Button style={{ margin: 5 }}> Add To Cart</Button>
                </View>
              </View>
            );
          })}
          <Button  title="CheckOut"
          //onPress={GoBill}
          ></Button>
        </ScrollView>
      </Card>
    </View>

      {/* Modal for the fragment */}
      {isVisible && (
        <Modal transparent visible={isVisible} animationType="none">
          <TouchableWithoutFeedback onPress={closeFragment}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.fragment,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0], // Starts 300px down, slides up to 0px
                    }),
                  },
                ],
              },
            ]}
          >
            
            
            
          </Animated.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  fragment: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  fragmentText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },image:{
    width: 100,
    height: 100,
  },
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
