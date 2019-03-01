import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from '../Screens/SignUp/index';
import Login from '../Screens/Login/index';
import Home from '../Screens/Home/index';
import Cart from '../Screens/Cart/index';
const RootNavigator = createStackNavigator({
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    Home: { screen: Home },
    Cart: { screen: Cart }
}, {
    initialRouteName: 'SignUp',
    headerMode: 'none'
});
export default createAppContainer(RootNavigator);
//# sourceMappingURL=index.js.map