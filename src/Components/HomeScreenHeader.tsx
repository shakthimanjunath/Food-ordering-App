import React from 'react';
import { Header } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import { guide } from '../Styles/CommonStyles';
import { getUserToken } from '../Services/Auth';
import { Query } from 'react-apollo';
import { getOrdersForUser } from '../Services/queries';
import { isNil, get } from 'lodash';

interface HomeHeaderProps {
  drawer: boolean;
  onRightIconPress(userId: string): void;
  closeDrawer: Function;
  openDrawer: Function;
}

interface HomeHeaderState {
  userId: string;
}

export default class HomeScreenHeader extends React.Component<
  HomeHeaderProps,
  HomeHeaderState
> {
  constructor(props: HomeHeaderProps) {
    super(props);
    this.state = {
      userId: undefined
    };
  }
  componentWillMount() {
    getUserToken(
      userToken => {
        this.setState({ userId: userToken });
      },
      error => {
        console.log('error in fetching userToken: ', error);
      }
    );
  }

  _renderHeader(numberOfOrders) {
    return (
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => {
            this.props.drawer
              ? this.props.closeDrawer()
              : this.props.openDrawer();
          }
        }}
        rightComponent={
          numberOfOrders === 0
            ? {
                icon: 'shopping-cart',
                color: '#fff',
                size: 20,
                onPress: () => this.props.onRightIconPress(this.state.userId)
              }
            : this._renderNumberOfItems(numberOfOrders)
        }
        centerComponent={{ text: 'Menu', style: { color: '#fff' } }}
        containerStyle={{ backgroundColor: guide.buttonColor }}
        barStyle="light-content"
      />
    );
  }

  _renderNumberOfItems(numberOfOrders: number) {
    return (
      <TouchableOpacity
        onPress={() => this.props.onRightIconPress(this.state.userId)}
        style={{
          backgroundColor: 'white',
          height: 30,
          width: 30,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ backgroundColor: 'transparent' }}>{numberOfOrders}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    if (isNil(this.state.userId)) {
      return this._renderHeader(0);
    }
    return (
      <Query query={getOrdersForUser} variables={{ id: this.state.userId }}>
        {({ data }) => {
          return this._renderHeader(
            get(data, 'allOrders[0].menuItem', []).length
          );
        }}
      </Query>
    );
  }
}
