import {  Button, Text, TextInput} from "react-native-paper";
import { View ,StyleSheet,Alert} from "react-native";
import { useState } from "react";

function Billing(props) {
     const Checkout=()=>{props.navigation.navigate('Pay')
        ,Alert.alert('Comfirm Order')
     }
    return (<View style={style.container}>
        <Text style={style.text}> 
            Billing
        </Text>
        
        <Button onPress={Checkout}>PayBill</Button>

    </View>);
}
const style=StyleSheet.create({
container:{
    flex: 1,
    marginTop: 100,
    padding: 10,
    height: 'auto',
    alignItems: 'center'
},
text:{
    fontStyle: 'Bold',
textAlign: 'center',
marginBottom: 10,
fontSize: 40,
margin: 10



},
inp: {
    width: 300
    
},
btn:{
    width: 300,
margin: 10,
backgroundColor: '#00ffcc',


}

});
export default Billing;