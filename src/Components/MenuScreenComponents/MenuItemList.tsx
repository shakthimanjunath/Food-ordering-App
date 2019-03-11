import React from 'react';
import { View, ScrollView } from 'react-native';
import MenuItem from './MenuItem';

interface MenuItemListProps {
  menuItemList: any;
  userId: string;
  subscribe: Function;
  onOrderCreation(orderId: String): void;
}

export default class MenuItemList extends React.PureComponent<
  MenuItemListProps
> {
  componentDidMount() {
    this.props.subscribe();
  }

  render() {
    return (
      <ScrollView style={{ zIndex: -10 }}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {this.props.menuItemList.allMenus.map((item: any, index: number) => {
            return (
              <MenuItem
                item={item}
                key={index}
                userId={this.props.userId}
                onOrderCreation={this.props.onOrderCreation}
              />
            );
          })}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }
}
