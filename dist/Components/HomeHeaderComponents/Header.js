import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';
export default class HeaderComp extends React.PureComponent {
    _renderNumberOfItems(numberOfOrders) {
        return (React.createElement(TouchableOpacity, { onPress: () => this.props.onRightIconPress(this.props.userId), style: {
                backgroundColor: 'white',
                height: 30,
                width: 30,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
            } },
            React.createElement(Text, { style: { backgroundColor: 'transparent' } }, numberOfOrders)));
    }
    render() {
        return (React.createElement(Header, { leftComponent: {
                icon: 'menu',
                color: '#fff',
                onPress: () => {
                    this.props.drawer
                        ? this.props.closeDrawer()
                        : this.props.openDrawer();
                }
            }, rightComponent: this.props.numberOfItemsInCart === 0
                ? {
                    icon: 'shopping-cart',
                    color: '#fff',
                    size: 20,
                    onPress: () => this.props.onRightIconPress(this.props.userId)
                }
                : this._renderNumberOfItems(this.props.numberOfItemsInCart), centerComponent: {
                text: 'Menu',
                style: { color: '#fff' }
            }, containerStyle: {
                backgroundColor: guide.buttonColor
            }, barStyle: "light-content" }));
    }
}
//# sourceMappingURL=Header.js.map