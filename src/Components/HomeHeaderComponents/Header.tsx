import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';

interface HeaderProps {
  onRightIconPress: Function;
  closeDrawer: Function;
  openDrawer: Function;
  drawer: boolean;
  numberOfItemsInCart: number;
  userId: string;
}

export default class HeaderComp extends React.PureComponent<HeaderProps> {
  _renderNumberOfItems(numberOfOrders: number) {
    return (
      <TouchableOpacity
        onPress={() => this.props.onRightIconPress(this.props.userId)}
        style={{
          backgroundColor: 'white',
          height: 30,
          width: 30,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ backgroundColor: 'transparent' }}>{numberOfOrders}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => {
            this.props.drawer
              ? this.props.closeDrawer()
              : this.props.openDrawer();
          }
        }}
        rightComponent={
          this.props.numberOfItemsInCart === 0
            ? {
                icon: 'shopping-cart',
                color: '#fff',
                size: 20,
                onPress: () => this.props.onRightIconPress(this.props.userId)
              }
            : this._renderNumberOfItems(this.props.numberOfItemsInCart)
        }
        centerComponent={{
          text: 'Menu',
          style: { color: '#fff' }
        }}
        containerStyle={{
          backgroundColor: guide.buttonColor
        }}
        barStyle="light-content"
      />
    );
  }
}
