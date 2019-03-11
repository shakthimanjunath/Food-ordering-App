import React from 'react';
import { View, ScrollView } from 'react-native';
import MenuItem from './MenuItem';
export default class MenuItemList extends React.PureComponent {
    componentDidMount() {
        this.props.subscribe();
    }
    render() {
        return (React.createElement(ScrollView, { style: { zIndex: -10 } },
            React.createElement(View, { style: { flexWrap: 'wrap', flexDirection: 'row' } }, this.props.menuItemList.allMenus.map((item, index) => {
                return (React.createElement(MenuItem, { item: item, key: index, userId: this.props.userId, onOrderCreation: this.props.onOrderCreation }));
            })),
            React.createElement(View, { style: { height: 30 } })));
    }
}
//# sourceMappingURL=MenuItemList.js.map