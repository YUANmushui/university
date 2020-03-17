import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import { mainStyle } from '../../style/mainStyle';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../widget/TabBar';
import MainContent from './mainContent';
import Discover from '../discovery/discover';
import Choice from '../choice/choice';
import Me from '../me/me';

var tabIcons = ['home', 'compass', 'heart', 'user'];
var tabNames = ["首页", "发现", "精选", "我"];

export default class Main extends Component {

  render() {
    return (
      <View style={mainStyle.conatiner}>
        <ScrollableTabView
          locked={true}
          scrollWithoutAnimation={true}
          tabBarPosition="bottom"
          renderTabBar={() => <TabBar tabIcons={tabIcons} tabNames={tabNames} />}>
            <MainContent tabLabel="首页"/>
            <Discover tabLabel="发现"/>
            <Choice tabLabel="精选"/>
            <Me tabLabel="我"/>
        </ScrollableTabView>
      </View>
    )
  }
}