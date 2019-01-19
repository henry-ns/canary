import {
    createStackNavigator,
    createDrawerNavigator,
    createAppContainer
} from "react-navigation";

import Autentication from "./screens/Authentication";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";

import CustomDrawerComponent from "./components/CustomDrawerContent";
import CanaryRegister from "./screens/CanaryRegister";
import Canaries from "./screens/Canaries";

const AppDrawerNavigator = createDrawerNavigator(
    {
        Autentication: { screen: Autentication },
        Home: { screen: Home },
        Profile: { screen: Profile },
        CanaryRegister: { screen: CanaryRegister },
        SeeCanaries: { screen: Canaries },
    },
    {
        initialRouteName: "Home",
        contentComponent: CustomDrawerComponent
    }
);

const AppStackNavigator = createStackNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        Autentication: { screen: Autentication },
        Home: { screen: AppDrawerNavigator }
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(AppStackNavigator);
