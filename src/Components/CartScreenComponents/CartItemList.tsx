import React from 'react';
import { View, ScrollView } from 'react-native';
import CartItem from './CartItem';

interface CartItemListProps {
  CartItemList: any;
  subscribe: Function;
}

export default class CartItemList extends React.PureComponent<
  CartItemListProps
> {
  componentDidMount() {
    this.props.subscribe();
  }

  render() {
    return (
      <ScrollView style={{ zIndex: -10 }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {this.props.CartItemList.map((item: any, index: number) => {
            return <CartItem item={item} key={index} />;
          })}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }
}
