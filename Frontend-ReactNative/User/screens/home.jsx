import { useState } from "react";
import { View, Image, StyleSheet, ScrollView ,Text,} from "react-native";
import { Button, Card,  IconButton } from "react-native-paper";

function Home(props) {
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

  // const UpdateProfile = ()=>
  // {
  //     props.navigation.navigate("Profile");
  // }

  // const GoBill =()=>{
  //     props.navigation.navigate("Billing");
  // }
  // const gotocart=()=>{props.navigation.navigate("Cart")}
  return (
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
          <Button 
          //onPress={GoBill}
          >Check Out</Button>
        </ScrollView>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  Card: {
    flexDirection: "row",
    margin: 5,
    padding: 2,
    backgroundColor: "orange",
    borderWidth: 1,
    borderColor: "black",
    width: "auto",
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
});
export default Home;
