import React from 'react';
import { isNil } from 'lodash';
import { View, Dimensions, Text, ScrollView } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import { guide } from '../../Styles/CommonStyles';
import { Drawer } from 'native-base';
import SideBar from '../../Components/SideBar';

const {width, height} = Dimensions.get('window');

interface HomeProps{
  navigation: any;
}

interface HomeState{
  drawer: boolean;
}

const Menu = [
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

export default class Home extends React.Component<HomeProps, HomeState>{
  constructor(props: HomeProps){
    super(props);
    this.state={
      drawer: false
    }
  }
  drawer;
  componentDidMount(){
    let hidesplashScreen = this.props.navigation.getParam('hideSplashscreen');
    !isNil(hidesplashScreen) && hidesplashScreen();
  }

  _renderMenuItem(index: number, item: any){
    return(
      <View key={index} style={{width: width / 2.8, height: height / 3, marginHorizontal: 15, marginVertical: 5}}>
        <Avatar
          source={{
            uri: item.image
          }}
          containerStyle={{flex: 0.7, width: '100%'}}
        />
        <Text style={{flex: 0.3, textAlign:'center', marginTop: 10}}>{item.name}</Text>
      </View>
    )
  }

  closeDrawer = () => {
    this.setState({drawer: false})
    this.drawer._root.close();
  };

  openDrawer=() => {
    this.setState({drawer: true})
    this.drawer._root.open();
  };

  render(){
    return(
      <View>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => { this.state.drawer ? this.closeDrawer() : this.openDrawer() }
          }}
          rightComponent={{
            icon: 'shopping-cart',
            color: '#fff',
            onPress: () => this.props.navigation.navigate('Cart')
          }}
          
          centerComponent={{ text: 'Menu', style: { color: '#fff' } }}
          containerStyle={{ backgroundColor: guide.buttonColor }}
          barStyle="light-content"
        />
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigation={this.props.navigation} closeDrawer={this.closeDrawer}/>}
          onClose={() => this.closeDrawer()} >
        </Drawer>
        <ScrollView style={{ padding : 20, zIndex: -10 }}>
          <View style={{flexWrap: "wrap", flexDirection :'row'}}>
          {
            Menu.map((item: any, index: number)=> {
              return this._renderMenuItem(index,item)
            })
          }
          </View>
        </ScrollView>
      </View>
    )
  }
}