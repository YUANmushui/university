/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Main from './app/component/main/main';
import store from './app/store/store';
import { Provider } from 'react-redux';

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}