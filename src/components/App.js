/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import firebase from 'firebase'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {
  state = { loggedIn: null };
  
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAP8If4PN3xqYP9jJC741X3hvWjGjeyZPs",
            authDomain: "crmlinkedin2-3950b.firebaseapp.com",
            databaseURL: "https://crmlinkedin2-3950b.firebaseio.com",
            projectId: "crmlinkedin2-3950b",
            storageBucket: "",
            messagingSenderId: "1010227078953"
        });

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false });
          }
        });
    }
  
    renderInitialView() {
      switch (this.state.loggedIn) {
        case true:
          return <Navigation />
        case false:
          return <Login />;
        default:
          return <Loader size="large" />;  
      }
    }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {this.renderInitialView()}
        </View>
      </Provider>  
    );
  }
}