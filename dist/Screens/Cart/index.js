import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Avatar, Header, Button } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';
import { Query } from 'react-apollo';
import { getCartProducts } from '../../Services/queries';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
import { get, isNil } from 'lodash';
import { menuOrderSubscription } from '../../Services/Subscriptions';
import CartItemList from '../../Components/CartScreenComponents/CartItemList';
const { width, height } = Dimensions.get('window');
export default class Cart extends React.Component {
    _renderOrderItem(index, item) {
        return (React.createElement(View, { key: index, style: {
                width: width,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 15,
                marginVertical: 5
            } },
            React.createElement(Avatar, { source: {
                    uri: item.image
                }, containerStyle: { flex: 0.2 } }),
            React.createElement(Text, { style: { flex: 0.8 } }, item.name)));
    }
    subscribeToMenuList(subscribe) {
        subscribe({
            document: menuOrderSubscription,
            fetchPolicy: 'network-only',
            updateQuery: (previousState, { subscriptionData }) => {
                let menus;
                // If new menu item is added, add new node to list
                if (!isNil(subscriptionData.data.Menu.node)) {
                    menus = [
                        ...previousState.allMenus.filter(item => item.id !== subscriptionData.data.Menu.node.id),
                        subscriptionData.data.Menu.node
                    ];
                }
                // If menu item is deleted, remove that item from list
                else if (!isNil(subscriptionData.data.Menu.previousValues)) {
                    menus = [
                        ...previousState.allMenus.filter(item => item.id !== subscriptionData.data.Menu.previousValues.id)
                    ];
                }
                // else return list as it is
                else {
                    menus = [...previousState.allMenus];
                }
                return { allMenus: menus };
            },
            onError: err => console.error(err)
        });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Header, { leftComponent: {
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => {
                        this.props.navigation.goBack();
                    }
                }, centerComponent: { text: 'Your Cart', style: { color: '#fff' } }, containerStyle: { backgroundColor: guide.buttonColor }, barStyle: "light-content" }),
            React.createElement(Query, { query: getCartProducts, fetchPolicy: "network-only", variables: {
                    id: get(this.props.navigation, 'state.params.userId', '')
                } }, ({ loading, error, data, subscribeToMore }) => {
                console.log(get(data, 'allOrders[0].menuItem', []), error, loading, '*******');
                return (React.createElement(View, { style: {
                        width: width,
                        height: '90%',
                        zIndex: -100
                    } }, loading ? (React.createElement(Loader, null)) : error ? (React.createElement(Error, { errorMessage: "Sorry, Some unexpected error occurred." })) : get(data, 'allOrders[0].menuItem', []).length === 0 ? (React.createElement(Error, { errorMessage: "Sorry, No items in cart." })) : (React.createElement(CartItemList, { CartItemList: get(data, 'allOrders[0].menuItem', []), subscribe: () => this.subscribeToMenuList(subscribeToMore) }))));
            }),
            React.createElement(Button, { title: 'Place Order', containerStyle: {
                    zIndex: 10,
                    position: 'absolute',
                    top: height - 100,
                    right: 20
                }, buttonStyle: {
                    backgroundColor: 'black',
                    height: 60,
                    borderRadius: 20,
                    paddingHorizontal: 20
                }, onPress: () => {
                    console.log('Place order');
                } })));
    }
}
//# sourceMappingURL=index.js.map