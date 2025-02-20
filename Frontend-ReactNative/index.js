import { registerRootComponent } from 'expo';
import AdminLauncher from './Launcher/Admin';
import UserLauncher from './Launcher/User';
import AgentLauncher from './Launcher/Agent';
import ProviderLauncher from './Launcher/Provider';
import LoginScreen from './User/login/GoLogin';

registerRootComponent(UserLauncher);
//registerRootComponent(LoginScreen);

//registerRootComponent(AdminLauncher);

//registerRootComponent(AgentLauncher);

//registerRootComponent(ProviderLauncher);

