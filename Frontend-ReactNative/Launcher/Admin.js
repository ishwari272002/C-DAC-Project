import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
function AdminLauncher() {
    var stack = createNativeStackNavigator();
    return ( 
         
        <NavigationContainer>
              <stack.Navigator initialRouteName="Login">



              </stack.Navigator>
              {/* <stack.Screen name="" component={} /> */}


                  </NavigationContainer>
     );
}

export default AdminLauncher;