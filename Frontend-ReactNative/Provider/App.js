import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Components/Login/LoginPage";
import RegistrationScreen from "./Components/Registration/Register";
import HomePage from "./Components/Dashboard/Homepage";
import OrdersPage from "./Components/Dashboard/Orders";
import CustomersPage from "./Components/Customers/CustomerList";
import CustomerDetails from "./Components/Customers/CustomerDetails";
import Finance from "./Components/Finance/Finance";

function App() {
  var stack = createNativeStackNavigator();
  return ( 
    <NavigationContainer>
      <stack.Navigator initialRouteName="TiffinProviderLogin">
      <stack.Screen name="TiffinProviderLogin" component={LoginScreen} />
      <stack.Screen name="TiffinProviderRegistration" component={RegistrationScreen}/>
      <stack.Screen name="TiffinProviderDashboard" component={HomePage} />
      <stack.Screen name="Orders" component={OrdersPage} />
      <stack.Screen name="Customers" component={CustomersPage}/>
      <stack.Screen name="CustomerDetails" component={CustomerDetails}/>
      <stack.Screen name="Finance" component={Finance}/>
      {/* <stack.Screen name="Login" component={LoginScreen} /> */}

      </stack.Navigator>
    </NavigationContainer>
   );
}

export default App;