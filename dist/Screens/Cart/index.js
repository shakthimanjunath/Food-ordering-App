import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { Avatar, Header, Button } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';
const { width, height } = Dimensions.get('window');
const orderList = [
    {
        name: 'a',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'b',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'c',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'd',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'e',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'f',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'g',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
    {
        name: 'h',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
    },
];
export default class Cart extends React.Component {
    _renderOrderItem(index, item) {
        return (React.createElement(View, { key: index, style: { width: width, height: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginHorizontal: 15, marginVertical: 5 } },
            React.createElement(Avatar, { source: {
                    uri: item.image
                }, containerStyle: { flex: 0.2 } }),
            React.createElement(Text, { style: { flex: 0.8 } }, item.name)));
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Header, { leftComponent: {
                    icon: 'arrow-back',
                    color: '#fff',
                    onPress: () => { this.props.navigation.goBack(); }
                }, centerComponent: { text: 'Your Cart', style: { color: '#fff' } }, containerStyle: { backgroundColor: guide.buttonColor }, barStyle: "light-content" }),
            React.createElement(ScrollView, { style: { zIndex: -10 } },
                React.createElement(View, null, orderList.map((order, index) => {
                    return this._renderOrderItem(index, order);
                }))),
            React.createElement(Button, { title: 'Place Order', containerStyle: { zIndex: 10, position: 'absolute', top: height - 100, right: 20, }, buttonStyle: { backgroundColor: 'black', height: 60, borderRadius: 20, paddingHorizontal: 20 }, onPress: () => { console.log('Place order'); } })));
    }
}
//# sourceMappingURL=index.js.map