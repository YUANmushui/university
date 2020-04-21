/**
 * 首页导航
 */
import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import { mainStyle } from '../../style/home/mainStyle';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import TabBar from '../../widget/TabBar';
import MainContent from './mainContent';
import Discover from '../discovery/discover';
import Choice from '../choice/choice';
import Me from '../me/me';
import Test from './Test';

var tabIcons = ['ios-home', 'ios-compass', 'ios-list', 'ios-contact'];
var tabNames = ["首页", "发现", "分类", "我"];

export default class Main extends Component {

  render() {
    return (
      <View style={mainStyle.conatiner}>
        <ScrollableTabView
          scrollWithoutAnimation={true}
          tabBarPosition="bottom"
          locked={false}
          renderTabBar={() => <TabBar tabIcons={tabIcons} tabNames={tabNames} />}>
            
            {/* <Test tabLabel="首页" navigator={this.props.navigator} /> */}
            <MainContent tabLabel="首页" navigator={this.props.navigator} />
            <Discover tabLabel="发现" navigator={this.props.navigator} />
            <Choice tabLabel="分类" navigator={this.props.navigator} />
            <Me tabLabel="我" navigator={this.props.navigator} />
            
        </ScrollableTabView>
      </View>
    )
  }
}