import React from 'react';
import { View, Text, Dimensions, ImageBackground, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { compose, withApollo, Query } from 'react-apollo';
import { getOrdersForUser } from '../../Services/queries';
import { get, isNil } from 'lodash';
import { CREATE_MENU_ORDER_ITEM_FOR_EXISTING_ORDER, UPDATE_MENU_ORDER_ITEM } from '../../Services/Mutations';
import { CREATE_MENU_ORDER_ITEM_FOR_FOR_NEW_ORDER, CREATE_ORDER } from '../../Services/Mutations';
// import {
//   CREATE_ORDER,
//   UPDATE_ORDER,
//   CREATE_MENU_ORDER_ITEM
// } from '../../Services/Mutations';
const { width, height } = Dimensions.get('window');
class MenuItem extends React.PureComponent {
    increaseNumberOfProducts(menuOrderItem) {
        console.log(menuOrderItem.numberOfItems, menuOrderItem.id, '&&&&&');
        this.props.client
            .mutate({
            mutation: UPDATE_MENU_ORDER_ITEM,
            variables: {
                id: menuOrderItem.id,
                numberOfItems: menuOrderItem.numberOfItems + 1
            }
        })
            .then(data => {
            Alert.alert(`${this.props.item.name} is added to your cart`);
            console.log('data from increaseNumberOfProducts ', data);
            this.props.onOrderCreation(data.data.updateMenuItemInOrder.order.id);
        })
            .catch(error => {
            Alert.alert('Could not create order');
            console.log('error in increaseNumberOfProducts ', error);
        });
    }
    addNewMenuItem(menuItemId, orderId) {
        this.props.client
            .mutate({
            mutation: CREATE_MENU_ORDER_ITEM_FOR_EXISTING_ORDER,
            variables: {
                menuItemId: menuItemId,
                orderId: orderId
            }
        })
            .then(data => {
            Alert.alert(`${this.props.item.name} is added to your cart`);
            console.log('data from addNewMenuItem', data);
            this.props.onOrderCreation(data.data.createMenuItemInOrder.order.id);
        })
            .catch(error => {
            Alert.alert('Could not create order');
            console.log('error in addNewMenuItem: ', error);
        });
    }
    updateOrder(order) {
        let menuItemOrderList = get(order, 'menuItem', []).filter(item => !isNil(item.menuItem) && item.menuItem.id === this.props.item.id);
        // if menu item that is being added is already added
        if (!isNil(menuItemOrderList) && menuItemOrderList.length > 0) {
            this.increaseNumberOfProducts(menuItemOrderList[0]);
        }
        else {
            this.addNewMenuItem(this.props.item.id, order.id);
        }
    }
    createOrder(userId) {
        this.props.client
            .mutate({
            mutation: CREATE_MENU_ORDER_ITEM_FOR_FOR_NEW_ORDER,
            variables: {
                menuItemId: this.props.item.id
            }
        })
            .then(data => {
            this.props.client
                .mutate({
                mutation: CREATE_ORDER,
                variables: {
                    userId: userId,
                    menuItemIds: [data.data.createMenuItemInOrder.id]
                },
                refetchQueries: [
                    {
                        query: getOrdersForUser,
                        variables: { id: this.props.userId }
                    }
                ]
            })
                .then(data => {
                Alert.alert(`${this.props.item.name} is added to your cart`);
                console.log('data from CREATE_ORDER', data);
                this.props.onOrderCreation(data.data.createOrder.id);
            })
                .catch(error => {
                Alert.alert('Could not create order');
                console.log('error in creating new order: ', error);
            });
        })
            .catch(error => {
            Alert.alert('Could not create order');
            console.log('error in creating orderMenuItem: ', error);
        });
    }
    // TODO: Refactor. Fetching userToken onpress everytime is costly. Try to fetch userId and orderId on mount itself.
    onAddToCartPress(data) {
        if (get(data, 'allOrders', []).length === 0) {
            this.createOrder(this.props.userId);
        }
        else {
            this.updateOrder(get(data, 'allOrders[0]'));
        }
    }
    render() {
        return (React.createElement(Query, { query: getOrdersForUser, variables: { id: this.props.userId } }, ({ data }) => {
            return (React.createElement(View, { style: {
                    width: width / 2,
                    height: height / 4,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center'
                } },
                React.createElement(ImageBackground, { source: {
                        uri: this.props.item.imageURL
                    }, style: {
                        width: '100%',
                        height: '100%',
                        zIndex: -10,
                        opacity: 0.7
                    } }),
                React.createElement(Icon, { containerStyle: {
                        position: 'absolute',
                        zIndex: 30,
                        bottom: 5,
                        right: 5,
                        backgroundColor: '#000',
                        borderRadius: 50,
                        height: 70,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, name: "add", color: "#fff", size: 40, onPress: () => {
                        this.onAddToCartPress(data);
                    } }),
                React.createElement(View, { style: {
                        position: 'absolute',
                        zIndex: 10,
                        height: height / 4.6,
                        width: width / 2.3
                    } },
                    React.createElement(Text, { style: {
                            width: width / 2.3,
                            textAlign: 'center',
                            fontSize: 20,
                            color: 'white',
                            justifyContent: 'center',
                            backgroundColor: '#000'
                        }, numberOfLines: 3 }, this.props.item.name),
                    React.createElement(Avatar, { source: {
                            uri: this.props.item.imageURL
                        }, containerStyle: {
                            flex: 1,
                            width: width / 2.3
                        } }))));
        }));
    }
}
export default compose(withApollo)(MenuItem);
//# sourceMappingURL=MenuItem.js.map