import React from 'react';
import { Header } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import { guide } from '../Styles/CommonStyles';
import { getUserToken } from '../Services/Auth';
import { Query } from 'react-apollo';
import { getOrdersForUser } from '../Services/queries';
import { isNil, get } from 'lodash';
export default class HomeScreenHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined
        };
    }
    componentWillMount() {
        getUserToken(userToken => {
            this.setState({ userId: userToken });
        }, error => {
            console.log('error in fetching userToken: ', error);
        });
    }
    _renderHeader(numberOfOrders) {
        return (React.createElement(Header, { leftComponent: {
                icon: 'menu',
                color: '#fff',
                onPress: () => {
                    this.props.drawer
                        ? this.props.closeDrawer()
                        : this.props.openDrawer();
                }
            }, rightComponent: numberOfOrders === 0
                ? {
                    icon: 'shopping-cart',
                    color: '#fff',
                    size: 20,
                    onPress: () => this.props.onRightIconPress(this.state.userId)
                }
                : this._renderNumberOfItems(numberOfOrders), centerComponent: { text: 'Menu', style: { color: '#fff' } }, containerStyle: { backgroundColor: guide.buttonColor }, barStyle: "light-content" }));
    }
    _renderNumberOfItems(numberOfOrders) {
        return (React.createElement(TouchableOpacity, { onPress: () => this.props.onRightIconPress(this.state.userId), style: {
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
        if (isNil(this.state.userId)) {
            return this._renderHeader(0);
        }
        return (React.createElement(Query, { query: getOrdersForUser, variables: { id: this.state.userId } }, ({ data }) => {
            return this._renderHeader(get(data, 'allOrders[0].menuItem', []).length);
        }));
    }
}
//# sourceMappingURL=HomeScreenHeader.js.map