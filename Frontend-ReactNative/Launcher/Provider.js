import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Provider/Components/Login/LoginPage";
import RegistrationScreen from "../Provider/Components/Registration/Register";
import HomePage from "../Provider/Components/Dashboard/Homepage";
import OrdersPage from "../Provider/Components/Dashboard/Orders";
import CustomersPage from "../Provider/Components/Customers/CustomerList";
import CustomerDetails  from "../Provider/Components/Customers/CustomerDetails";
import Finance from "../Provider/Components/Finance/Finance";



function ProviderLauncher() {
  var stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="TiffinProviderLogin">
        <stack.Screen name="TiffinProviderLogin" component={LoginScreen}/>
        <stack.Screen name="TiffinProviderRegistration" component={RegistrationScreen}/>
        <stack.Screen name="TiffinProviderDashboard" component={HomePage} />
        <stack.Screen name="Orders" component={OrdersPage} />
        <stack.Screen name="Customers" component={CustomersPage} />
        <stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <stack.Screen name="Finance" component={Finance} />
      </stack.Navigator>
      {/* <stack.Screen name="" component={} /> */}
    </NavigationContainer>
  );
}

export default ProviderLauncher;
