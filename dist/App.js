import React from 'react';
import RootNavigator from './Navigator/index';
import * as ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
const uri = 'https://api.graph.cool/simple/v1/cjswu6wlr0aa00191gcbxj80y';
const subscriptionLink = 'ws://subscriptions.graph.cool/v1/cjswu6wlr0aa00191gcbxj80y';
// Create an http link:
const httpLink = new ApolloClient.HttpLink({
    uri
});
const cache = new InMemoryCache();
// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: subscriptionLink,
    options: {
        reconnect: true
    }
});
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = ApolloClient.split(
// split based on operation type
({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, httpLink);
const client = new ApolloClient.ApolloClient({
    cache,
    link
});
export default class App extends React.Component {
    render() {
        return (React.createElement(ApolloProvider, { client: client },
            React.createElement(RootNavigator, null)));
    }
}
//# sourceMappingURL=App.js.map