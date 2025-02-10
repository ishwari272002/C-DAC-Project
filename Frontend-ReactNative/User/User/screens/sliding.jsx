import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <Text> profile</Text>
          {/* <Image source={require('./profile.png')} style={styles.profileImage} /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
          <Text> Cart</Text>
          {/* <Image source={require('./cart.png')} style={styles.cartImage} /> */}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        {/* <Image source={require('./menu.png')} style={styles.menuImage} /> */}
        <Text> Menu</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../images/1.jpg")}
              style={styles.menuItemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../images/2.jpg")}
              style={styles.menuItemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../images/3.jpg")}
              style={styles.menuItemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../images/4.jpg")}
              style={styles.menuItemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image
              source={require("../../images/1.jpg")}
              style={styles.menuItemImage}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartImage: {
    width: 30,
    height: 30,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: 30,
    height: 30,
  },
  menu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: Dimensions.get("window").width,
    height: 200,
    backgroundColor: "#fff",
    elevation: 5,
    padding: 10,
  },
  menuItem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  menuItemImage: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
