import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
const { width } = Dimensions.get('window');
export default class MenuItemList extends React.PureComponent {
    render() {
        return (React.createElement(View, { style: {
                width: width,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderColor: '#D3D3D3',
                borderWidth: 1,
                marginTop: 2
            } },
            React.createElement(Avatar, { source: {
                    uri: this.props.item.menuItem.imageURL
                }, containerStyle: { height: '100%', width: '30%' } }),
            React.createElement(View, { style: {
                    width: '70%',
                    height: '90%',
                    paddingHorizontal: 10
                } },
                React.createElement(Text, { style: {
                        fontSize: 20,
                        fontWeight: 'bold'
                    } }, this.props.item.menuItem.name),
                React.createElement(Text, { style: { fontSize: 15, color: 'grey', marginTop: 10 } },
                    React.createElement(Text, { style: { fontWeight: 'bold' } }, "Number Of Items:"),
                    ' ',
                    this.props.item.numberOfItems))));
    }
}
//# sourceMappingURL=CartItem.js.map