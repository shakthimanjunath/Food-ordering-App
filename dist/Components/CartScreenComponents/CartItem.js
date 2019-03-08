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
                    uri: this.props.item.imageURL
                }, containerStyle: { height: '100%', width: '30%' } }),
            React.createElement(Text, { style: {
                    width: '70%',
                    height: '90%',
                    paddingHorizontal: 10,
                    fontSize: 20
                } }, this.props.item.name)));
    }
}
//# sourceMappingURL=CartItem.js.map