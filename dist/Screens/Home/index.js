import React from 'react';
import { isNil, get } from 'lodash';
import { View, Dimensions } from 'react-native';
import { Drawer } from 'native-base';
import SideBar from '../../Components/SideBar';
import { Query, compose, withApollo } from 'react-apollo';
import Loader from '../../Components/Loader';
import Error from '../../Components/Error';
import { menuItemList, getAllMenuOrderItemsForGivenOrder, getOrderId } from '../../Services/queries';
import MenuItemList from '../../Components/MenuScreenComponents/MenuItemList';
import { menuItemListSubscription } from '../../Services/Subscriptions';
import { getUserToken } from '../../Services/Auth';
import HeaderComp from '../../Components/HomeHeaderComponents/Header';
const { width } = Dimensions.get('window');
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.closeDrawer = () => {
            this.setState({ drawer: false });
            this.drawer._root.close();
        };
        this.openDrawer = () => {
            this.setState({ drawer: true });
            this.drawer._root.open();
        };
        this.state = {
            drawer: false,
            userId: undefined,
            numberOfItemsInCart: 0
        };
    }
    componentWillMount() {
        getUserToken(userId => {
            this.setState({ userId }, () => this.getNumberOfItemsInCart());
        }, error => {
            console.log(error, 'error , no token found');
        });
    }
    componentDidMount() {
        let hidesplashScreen = this.props.navigation.getParam('hideSplashscreen');
        !isNil(hidesplashScreen) && hidesplashScreen();
    }
    subscribeToMenuList(subscribe) {
        subscribe({
            document: menuItemListSubscription,
            fetchPolicy: 'network-only',
            updateQuery: (previousState, { subscriptionData }) => {
                let menus;
                // If new menu item is added, add new node to list
                if (!isNil(subscriptionData.data.Menu.node)) {
                    menus = [
                        ...previousState.allMenus.filter(item => item.id !== subscriptionData.data.Menu.node.id),
                        subscriptionData.data.Menu.node
                    ];
                }
                // If menu item is deleted, remove that item from list
                else if (!isNil(subscriptionData.data.Menu.previousValues)) {
                    menus = [
                        ...previousState.allMenus.filter(item => item.id !== subscriptionData.data.Menu.previousValues.id)
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
    getNumberOfItemsInCart() {
        this.props.client
            .query({
            query: getOrderId,
            variables: { id: this.state.userId }
        })
            .then(data => {
            console.log('[FETCHING INITIAL ITEM COUNT IN CART]', data);
            this.productAddedToCart(data.data.allUsers[0].order.id);
        })
            .catch(error => console.log('[HOME SCREEN]: ', error));
    }
    productAddedToCart(orderId) {
        this.props.client
            .query({
            query: getAllMenuOrderItemsForGivenOrder,
            variables: { id: orderId },
            fetchPolicy: 'network-only'
        })
            .then(data => {
            console.log('[orderId from productAddedToCart]', orderId, data);
            let numberOfItems = 0;
            if (data.data.allMenuItemInOrders.length > 0) {
                data.data.allMenuItemInOrders.map(menuOrderItem => (numberOfItems = menuOrderItem.numberOfItems + numberOfItems));
                this.setState({ numberOfItemsInCart: numberOfItems });
            }
        })
            .catch(error => console.log('[HOME SCREEN]: ', error));
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(HeaderComp, { numberOfItemsInCart: this.state.numberOfItemsInCart, userId: this.state.userId, onRightIconPress: userId => this.props.navigation.navigate('Cart', { userId: userId }), drawer: this.state.drawer, closeDrawer: this.closeDrawer, openDrawer: this.openDrawer }),
            React.createElement(Drawer, { ref: ref => {
                    this.drawer = ref;
                }, content: React.createElement(SideBar, { navigation: this.props.navigation, closeDrawer: this.closeDrawer }), onClose: () => this.closeDrawer() }),
            React.createElement(Query, { query: menuItemList }, ({ loading, error, data, subscribeToMore }) => {
                return (React.createElement(View, { style: {
                        width: width,
                        height: '90%',
                        zIndex: -100
                    } }, loading && !isNil(this.state.userId) ? (React.createElement(Loader, null)) : error ? (React.createElement(Error, { errorMessage: "Sorry, Some unexpected error occurred." })) : get(data, 'allMenus', []).length === 0 ? (React.createElement(Error, { errorMessage: "Sorry, No menu items found." })) : (React.createElement(MenuItemList, { userId: this.state.userId, menuItemList: data, subscribe: () => this.subscribeToMenuList(subscribeToMore), onOrderCreation: orderId => this.productAddedToCart(orderId) }))));
            })));
    }
}
export default compose(withApollo)(Home);
//# sourceMappingURL=index.js.map