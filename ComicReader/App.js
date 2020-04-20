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
import {Navigator} from 'react-native-deprecated-custom-components';

import Main from './app/component/main/main';
import store from './app/store/store';
import { Provider } from 'react-redux';

let _navigator = null;//作为键盘返回键导航

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
          {/* <Main /> */}
          <Navigator
            initialRoute={{ title: "main", component: Main }}
            renderScene={
              (route, navigator) => {
                  _navigator = navigator;
                  let Component = route.component;
                  return <Component {...route.params} navigator={navigator} />
              }
            }
            configureScene={(route) => Navigator.SceneConfigs.FloatFromRight} />
      </Provider>
    )
  }
}