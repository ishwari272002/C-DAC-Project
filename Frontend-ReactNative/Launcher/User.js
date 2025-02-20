import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../User/screens/home";
import LocationScreen from "../User/locationscreen/selectloc";
import LoginScreenG from "../Admin/Login/loginViaGoogle";
import MainPage from "../User/screens/main_menu";
import HomeScreen from "../User/screens/sliding";
import LoginScreen2 from "../User/login/PhoneLogin";
import LoginScreen from "../User/login/MainLogin";
import RegistrationPage from "../User/login/Registration";
import EmailLogin from "../User/login/EmailLogin";
import OtpScreen from "../User/login/EnterOTP";
import FragmentExample from "../User/screens/Fragment";
import BookList from "../User/screens/ProviderList";
import Demo from "../User/Componenets/NavigateDemo/Navigation";
import HomeScreen1 from "../User/Componenets/Home/Home";
import ProviderDetails from "../User/Componenets/ProviderDetails/Providers";
import ProfileScreen from "../User/Componenets/Profile/UserProfile";
import Cart from "../User/Componenets/Cart/Cart";
import Checkout from "../User/Componenets/Cart/Checkout";
import PaymentSuccess from "../User/Componenets/Cart/Payment";
import ComingSoonScreen from "../User/Email/Comingsoon";
import GoLogin from "../User/login/GoLogin";
import RegistrationScreen from "../User/Registration/Register";
import ChangePassword from "../User/Registration/ChangePass";
import AdminHome from "../Admin/Screens/home2";
import HomePage from "../Provider/Components/Dashboard/Homepage";
import SplashScreen from "./SplashScreen";
import AgentHome from "../Agent/Agent";
import MapViewScreen from "../User/locationscreen/loc";


function UserLauncher() {
  var stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Splash">
        
        <stack.Screen name="EnterPass" component={LoginScreen2} />
        <stack.Screen name="GoLogin" component={GoLogin} />
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="go-otp" component={EmailLogin} />
        <stack.Screen name="enter-otp" component={OtpScreen} />
        <stack.Screen name="go-home" component={Home} />
        <stack.Screen name="select-loc" component={LocationScreen} />
        <stack.Screen name="RegisterUser" component={RegistrationPage} />
        <stack.Screen name="use-up" component={LoginScreenG} />
        <stack.Screen name="mainmenu" component={MainPage} />
        <stack.Screen name="slider" component={HomeScreen} />
        <stack.Screen name="FragmentExample" component={FragmentExample} />
        <stack.Screen name="BookList" component={BookList} />
        <stack.Screen name="home" component={HomeScreen1} />
        <stack.Screen name="providerdetails" component={ProviderDetails} />
        <stack.Screen name="profile" component={ProfileScreen} />
        <stack.Screen name="cart" component={Cart} />
        <stack.Screen name="Checkout" component={Checkout} />
        <stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <stack.Screen name="ComingSoon" component={ComingSoonScreen} />
        <stack.Screen name="Register" component={RegistrationScreen}/>
        <stack.Screen name="ChangePass" component={ChangePassword}/>
        <stack.Screen name="MapViewScreen" component={MapViewScreen} />




        {/* ForDemo */}
        <stack.Screen name="gotohome" component={Demo}/>
        <stack.Screen name="admin" component={AdminHome}/>
        <stack.Screen name="provider" component={HomePage}/>
        <stack.Screen name="agent" component={AgentHome}/>
        <stack.Screen name="Splash" component={SplashScreen}/>


        


        {/* <stack.Screen name="" component={} /> */}
      </stack.Navigator>
    </NavigationContainer>
  );
}
export default UserLauncher;
