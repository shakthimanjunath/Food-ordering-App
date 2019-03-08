import React from 'react';
import { isNil, get } from 'lodash';
import { View, Dimensions } from 'react-native';
import { Drawer } from 'native-base';
import SideBar from '../../Components/SideBar';
import { Query } from 'react-apollo';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
import { menuItemList } from '../../Services/queries';
import MenuItemList from '../../Components/MenuScreenComponents/MenuItemList';
import { menuItemListSubscription } from '../../Services/Subscriptions';
import HomeScreenHeader from '../../Components/HomeScreenHeader';

const { width } = Dimensions.get('window');

interface HomeProps {
  navigation: any;
  client: any;
}

interface HomeState {
  drawer: boolean;
}
export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      drawer: false
    };
  }
  drawer;
  componentDidMount() {
    let hidesplashScreen = this.props.navigation.getParam('hideSplashscreen');
    !isNil(hidesplashScreen) && hidesplashScreen();
  }

  closeDrawer = () => {
    this.setState({ drawer: false });
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.setState({ drawer: true });
    this.drawer._root.open();
  };

  subscribeToMenuList(subscribe: Function) {
    subscribe({
      document: menuItemListSubscription,
      fetchPolicy: 'network-only',
      updateQuery: (previousState, { subscriptionData }) => {
        let menus;

        // If new menu item is added, add new node to list
        if (!isNil(subscriptionData.data.Menu.node)) {
          menus = [
            ...previousState.allMenus.filter(
              item => item.id !== subscriptionData.data.Menu.node.id
            ),
            subscriptionData.data.Menu.node
          ];
        }
        // If menu item is deleted, remove that item from list
        else if (!isNil(subscriptionData.data.Menu.previousValues)) {
          menus = [
            ...previousState.allMenus.filter(
              item => item.id !== subscriptionData.data.Menu.previousValues.id
            )
          ];
        }
        // else return list as it is
        else {
          menus = [...previousState.allMenus];
        }

        return { allMenus: menus };
      },
      onError: err => console.error(err)
    });
  }

  render() {
    return (
      <View>
        <HomeScreenHeader
          drawer={this.state.drawer}
          closeDrawer={this.closeDrawer}
          openDrawer={this.openDrawer}
          onRightIconPress={userId =>
            this.props.navigation.navigate('Cart', { userId: userId })
          }
        />
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              navigation={this.props.navigation}
              closeDrawer={this.closeDrawer}
            />
          }
          onClose={() => this.closeDrawer()}
        />
        <Query query={menuItemList}>
          {({ loading, error, data, subscribeToMore }) => {
            return (
              <View
                style={{
                  width: width,
                  height: '90%',
                  zIndex: -100
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Error errorMessage="Sorry, Some unexpected error occurred." />
                ) : get(data, 'allMenus', []).length === 0 ? (
                  <Error errorMessage="Sorry, No menu items found." />
                ) : (
                  <MenuItemList
                    menuItemList={data}
                    subscribe={() => this.subscribeToMenuList(subscribeToMore)}
                  />
                )}
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}
