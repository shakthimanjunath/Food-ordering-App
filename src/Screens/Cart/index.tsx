import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { Avatar, Header, Button } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';

const {width, height} = Dimensions.get('window');

interface CartProps {
  navigation: any;
}

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
]

export default class Cart extends React.Component<CartProps>{
  _renderOrderItem(index: number, item: any){
    return(
      <View key={index} style={{width: width, height: 100,justifyContent:'center', alignItems:'center', flexDirection:'row', marginHorizontal: 15, marginVertical: 5}}>
        <Avatar
          source={{
            uri: item.image
          }}
          containerStyle={{flex: 0.2}}
        />
        <Text style={{flex: 0.8}}>{item.name}</Text>
      </View>
    )
  }
  render(){
    return(
      <View>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => { this.props.navigation.goBack()}
          }}
          centerComponent={{ text: 'Your Cart', style: { color: '#fff' } }}
          containerStyle={{ backgroundColor: guide.buttonColor }}
          barStyle="light-content"
        />
        <ScrollView style={{zIndex: -10}}>
          <View>
          {
            orderList.map((order: any, index: number) => {
              return this._renderOrderItem(index, order)
            })
          }
          </View>
        </ScrollView>
        <Button  
          title={'Place Order'}
          containerStyle={{zIndex: 10, position: 'absolute',  top: height - 100, right: 20 ,}}
          buttonStyle={{ backgroundColor:'black', height: 60, borderRadius: 20,paddingHorizontal: 20 }}
          onPress={() => {console.log('Place order')}}
        />
      </View>
    )
  }
}