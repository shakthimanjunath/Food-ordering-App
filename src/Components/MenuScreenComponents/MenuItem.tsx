import React from 'react';
import { View, Text, Dimensions, ImageBackground, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { compose, withApollo } from 'react-apollo';
import { getUserToken } from '../../Services/Auth';
import { getOrdersForUser } from '../../Services/queries';
import { get, isNil } from 'lodash';
import { CREATE_ORDER, UPDATE_ORDER } from '../../Services/Mutations';

const { width, height } = Dimensions.get('window');

interface MenuItemProps {
  item: any;
  client: any;
}

class MenuItem extends React.PureComponent<MenuItemProps> {
  createOrder(userId) {
    console.log('[CREATE ORDER]');
    this.props.client
      .mutate({
        mutation: CREATE_ORDER,
        variables: {
          status: 'Order Confirmed',
          userId: userId,
          menuItemIds: [this.props.item.id]
        }
      })
      .then(data => {
        Alert.alert(`${this.props.item.name} is Added to cart`);
        console.log('order placed. order item', data);
      })
      .catch(error => {
        console.log('error placing order', error);
        Alert.alert('Error placing order');
      });
  }

  updateOrder(orders, userId) {
    console.log('[UPDATE ORDER]');
    let alreadyAddedMenuItems = orders.map(item => {
      return item.menuItem;
    });
    alreadyAddedMenuItems = orders[0].menuItem.map(menuItem => {
      return menuItem.id;
    });
    alreadyAddedMenuItems = alreadyAddedMenuItems.filter(
      id => id !== this.props.item.id
    );
    const menuItemList = isNil(alreadyAddedMenuItems)
      ? [this.props.item.id]
      : [...alreadyAddedMenuItems, this.props.item.id];
    this.props.client
      .mutate({
        mutation: UPDATE_ORDER,
        variables: {
          id: orders[0].id,
          status: 'Order Confirmed',
          userId: userId,
          menuItemIds: menuItemList
        }
      })
      .then(data => {
        console.log('order placed. order item', data);
        Alert.alert(`${this.props.item.name} is Item Added to cart`);
      })
      .catch(error => {
        console.log('error placing order', error);
        Alert.alert('Error placing order');
      });
  }

  addItemToCart() {
    getUserToken(
      userId => {
        console.log('userId', userId);
        this.props.client
          .query({
            query: getOrdersForUser,
            variables: {
              id: userId
            }
          })
          .then(data => {
            console.log(data);
            if (get(data.data, 'allOrders', []).length === 0) {
              this.createOrder(userId);
            } else {
              this.updateOrder(get(data.data, 'allOrders', []), userId);
            }
          })
          .catch(error => console.log(error));
      },
      error => {
        console.log(error, 'error , no token found');
      }
    );
  }

  render() {
    return (
      <View
        style={{
          width: width / 2,
          height: height / 4,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ImageBackground
          source={{
            uri: this.props.item.imageURL
          }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: -10,
            opacity: 0.7
          }}
        />
        <Icon
          containerStyle={{
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
          }}
          name="add"
          color="#fff"
          size={40}
          onPress={() => {
            this.addItemToCart();
          }}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            height: height / 4.6,
            width: width / 2.3
          }}
        >
          <Text
            style={{
              width: width / 2.3,
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              justifyContent: 'center',
              backgroundColor: '#000'
            }}
            numberOfLines={3}
          >
            {this.props.item.name}
          </Text>
          <Avatar
            source={{
              uri: this.props.item.imageURL
            }}
            containerStyle={{
              flex: 1,
              width: width / 2.3
            }}
          />
        </View>
      </View>
    );
  }
}

export default compose(withApollo)(MenuItem);
