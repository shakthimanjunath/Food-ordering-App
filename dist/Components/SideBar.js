import React from 'react';
import { View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { logout } from '../Services/Auth';
import { guide } from '../Styles/CommonStyles';
import { NavigationActions, StackActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');
export default class SideBar extends React.Component {
    render() {
        return (React.createElement(View, { style: {
                width: width / 1.5,
                height: height,
                zIndex: 100,
                backgroundColor: guide.buttonColor
            } },
            React.createElement(Button, { title: 'Logout', buttonStyle: {
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0.5,
                    height: 60,
                    borderBottomColor: 'white'
                }, onPress: () => {
                    logout(() => {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'SignUp' })
                            ]
                        }));
                    }, () => {
                        this.props.closeDrawer();
                    });
                } })));
    }
}
//# sourceMappingURL=SideBar.js.map