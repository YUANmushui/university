/**
 * 我
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    findNodeHandle,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import { meStyle } from '../../style/me/meStyle';
import { commonStyle } from '../../style/common/commonStyle';
import SelectItem from '../../widget/SelectItem';
import * as Api from '../../constant/api';
import Favorite from './Favorite';

import Icon from 'react-native-vector-icons/Ionicons';
import {Navigator} from 'react-native-deprecated-custom-components';
import Toast from 'react-native-root-toast';

export default class Me extends Component {

  render() {
    return (
        <View style={meStyle.container}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Image  source={require('../../images/ic_head_bg.jpg')} resizeMode={'cover'} style={meStyle.headbg} />
          <TouchableOpacity activeOpacity={0.6} onPress={this._login.bind(this)} style={meStyle.headContainer}>
              <Image source={require('../../images/ic_head.png')} style={meStyle.head} />
          </TouchableOpacity>
          <ScrollView>
              <SelectItem title="我的收藏" icon={require('../../images/ic_coll.png')} showline={true} onPress={this._collection.bind(this)} />
              <SelectItem title="分享App" icon={require('../../images/ic_share.png')} showline={true} onPress={this._share.bind(this)} />
              <SelectItem title="关于我" icon={require('../../images/ic_about.png')} showline={false} onPress={this._about.bind(this)} />
              <View style={meStyle.space} />
              <SelectItem title="设置" icon={require('../../images/ic_setting.png')} showline={true} onPress={this._setting.bind(this)} />
              <SelectItem title="本地阅读" icon={require('../../images/ic_share.png')} onPress={this._localstory.bind(this)} />
              <View style={commonStyle.underline} />
          </ScrollView>
        </View>
    )
  }

  /**
   * 跳转到登录界面
   */
  _login() {
  }

  /**
   * 跳转到收藏夹
   */
  _collection() {
    this.props.navigator.push({
      name: 'favorite',
      component: Favorite,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
    });
  }
  /**
   * 分享App
   */
  _share() {
  }
  /**
   * 关于我
   */
  _about() {
    Toast.show("作者：袁杰", {position: Toast.positions.CENTER, animation: true})
  }
  /**
   * 设置
   */
  _setting() {
  }

  /**
   * 本地阅读
   */
  _localstory() {}
}