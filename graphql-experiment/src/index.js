import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    // uri: 'http://localhost:4000/graphql'
    uri: 'http://192.168.1.15:4000/graphql'
});

const ApolloApp = AppComponent => (
<ApolloProvider client={client}>
    <AppComponent />
</ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));
registerServiceWorker();
