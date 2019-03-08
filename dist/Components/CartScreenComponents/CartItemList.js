import React from 'react';
import { View, ScrollView } from 'react-native';
import CartItem from './CartItem';
export default class CartItemList extends React.PureComponent {
    componentDidMount() {
        this.props.subscribe();
    }
    render() {
        return (React.createElement(ScrollView, { style: { zIndex: -10 } },
            React.createElement(View, { style: { flexWrap: 'wrap', flexDirection: 'row' } }, this.props.CartItemList.map((item, index) => {
                return React.createElement(CartItem, { item: item, key: index });
            })),
            React.createElement(View, { style: { height: 30 } })));
    }
}
//# sourceMappingURL=CartItemList.js.map