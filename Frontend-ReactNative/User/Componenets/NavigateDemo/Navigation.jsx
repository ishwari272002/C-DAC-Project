import { Button, StyleSheet, Text, View } from "react-native";

function Demo(props) {
    return (  
        
        <View style={styles.container} >
            <Text>
                Welcome to Tiffin delivery Management System
            </Text>
            <View style={{flex: 1,margin: 20,    justifyContent: 'space-around',marginBottom: 200 }}>
            <Button title="Login" />
            <Button title="Signup" />
            <Button title="Home" />
            <Button title="Location" />
            <Button title="cart" />
            <Button title="menu" />
            <Button title="item" />
            <Button title="billing" />
            <Button title="Profile" />

            </View>

            


        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-around',
  }});
export default Demo;