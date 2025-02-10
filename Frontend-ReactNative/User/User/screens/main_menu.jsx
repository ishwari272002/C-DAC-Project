import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

function MainPage({ navigation, route }) {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon={"account"}></IconButton>
        <Card>
          <View style={styles.loc}>
            <Text>Delivery In 30-40 minutes</Text>
            <TouchableOpacity onPress={() => navigation.navigate("select-loc")}>
              <Text style={styles.loc}>{location}</Text>
              <Icon name="location" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </Card>
        <IconButton icon={"cart"}></IconButton>
      </View>

      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate("FragmentExample")}>
          <Image
            source={require("../../images/nonvegfood.jpg")}
            style={styles.image}
          ></Image>
          <Text style={styles.text}>Order Food</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("BookList")}>
          <Image
            source={require("../../images/delivery.jpg")}
            style={styles.image}
          ></Image>
          <Text style={styles.text}>Tiffin Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loc: {
    width: "70%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    height: 195,
    width: 300,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
  body: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ff8303",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Card: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
    margin: 5,
    padding: 20,
    borderColor: "black",
    width: 300,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
});
export default MainPage;
