// import React from 'react';
// import { Query } from 'react-apollo';
// import { getUserToken } from '../../Services/Auth';
// import {
//   getOrderId,
//   getAllMenuOrderItemsForGivenOrder
// } from '../../Services/queries';
// import HeaderComp from './Header';
// import { get, isNil } from 'lodash';
// import { menuOrderSubscription } from '../../Services/Subscriptions';
// import Loader from '../Loader';
// interface HomeHeaderProps {
//   drawer: boolean;
//   onRightIconPress(userId: string): void;
//   closeDrawer: Function;
//   openDrawer: Function;
// }
// interface HomeHeaderState {
//   userId: string;
// }
// export default class HomeScreenHeader extends React.Component<
//   HomeHeaderProps,
//   HomeHeaderState
// > {
//   constructor(props: HomeHeaderProps) {
//     super(props);
//     this.state = {
//       userId: undefined
//     };
//   }
//   componentWillMount() {
//     getUserToken(
//       userToken => {
//         this.setState({ userId: userToken });
//       },
//       error => {
//         console.log('error in fetching userToken: ', error);
//       }
//     );
//   }
//   subscribeToMenuOrder(subscribe, orderId) {
//     subscribe({
//       document: menuOrderSubscription,
//       fetchPolicy: 'network-only',
//       updateQuery: (previousState, { subscriptionData }) => {
//         let menuOrderItemList;
//         console.log('[previous state]', previousState);
//         console.log('[subscriptionData]', subscriptionData);
//         // If new menu item is added, add new node to list
//         if (
//           !isNil(subscriptionData.data.MenuItemInOrder.node) &&
//           !isNil(subscriptionData.data.MenuItemInOrder.node.order) &&
//           subscriptionData.data.MenuItemInOrder.node.order.id === orderId
//         ) {
//           menuOrderItemList = [
//             ...previousState.allMenuItemInOrders.filter(
//               item => item.id !== subscriptionData.data.MenuItemInOrder.node.id
//             ),
//             subscriptionData.data.MenuItemInOrder.node
//           ];
//         }
//         // If menu item is deleted, remove that item from list
//         else if (
//           !isNil(subscriptionData.data.MenuItemInOrder.previousValues) &&
//           previousState.allMenuItemInOrders.filter(item => item.id === orderId)
//         ) {
//           menuOrderItemList = [
//             ...previousState.allMenuItemInOrders.filter(
//               item =>
//                 item.id !==
//                 subscriptionData.data.MenuItemInOrder.previousValues.id
//             )
//           ];
//         }
//         // else return list as it is
//         else {
//           menuOrderItemList = [...previousState.allMenuItemInOrders];
//         }
//         return { allMenuItemInOrders: menuOrderItemList };
//       },
//       onError: err => console.error(err)
//     });
//   }
//   render() {
//     return (
//       <Query query={getOrderId} variables={{ id: this.state.userId }}>
//         {({ data, loading, error }) => {
//           error && console.log('ERROR IN FETCHING ORDER ID', 'sdfghvjkgfdsfgh');
//           if (loading) {
//             return (
//               <HeaderComp
//                 onRightIconPress={this.props.onRightIconPress}
//                 closeDrawer={this.props.closeDrawer}
//                 openDrawer={this.props.openDrawer}
//                 userId={this.state.userId}
//                 drawer={this.props.drawer}
//                 numberOfItemsInCart={0}
//                 subscribeToMenuOrderChanges={() =>
//                   console.log('nothing to subscribe on', 'sdfghvjkgfdsfgh')
//                 }
//               />
//             );
//           }
//           let orderId = get(data, 'allUsers[0].order.id', '');
//           return (
//             <Query
//               query={getAllMenuOrderItemsForGivenOrder}
//               variables={{ id: orderId }}
//             >
//               {({ data, subscribeToMore }) => {
//                 let numberOfOrders = 0;
//                 get(data, 'allMenuItemInOrders', []).length > 0 &&
//                   data.allMenuItemInOrders.map(menuOrderItem => {
//                     numberOfOrders =
//                       numberOfOrders + menuOrderItem.numberOfItems;
//                   });
//                 return (
//                   <HeaderComp
//                     onRightIconPress={this.props.onRightIconPress}
//                     closeDrawer={this.props.closeDrawer}
//                     openDrawer={this.props.openDrawer}
//                     userId={this.state.userId}
//                     drawer={this.props.drawer}
//                     numberOfItemsInCart={numberOfOrders}
//                     subscribeToMenuOrderChanges={() =>
//                       this.subscribeToMenuOrder(subscribeToMore, orderId)
//                     }
//                   />
//                 );
//               }}
//             </Query>
//           );
//         }}
//       </Query>
//     );
//   }
// }
//# sourceMappingURL=HomeScreenHeader.js.map