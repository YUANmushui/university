/**
 * 标题栏
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { toolBarStyle } from '../style/toolBarStyle';

export default class Toolbar extends Component {

  render() {
    let Toolbar = [];

    // 图标
    if (this.props.leftButton != undefined) {
      Toolbar.push(
        <TouchableOpacity
          key={'leftButtonIcon'}
          activeOpacity={0.6}
          onPress={this.props.leftIconAction}
          style={toolBarStyle.back}>
            <Icon
              name={this.props.leftButton}
              size={24}
              color='#aaa'/>
        </TouchableOpacity>
      )
    }

    // 2.标题
    if (this.props.title !=undefined) {
      Toolbar.push(
        <Text
          key={'title'}
          style={[toolBarStyle.title, this.props.titleStyle ? this.props.titleStyle : '']}
          numberOfLines={1}>
            {this.props.title}
        </Text>
      )
    }

    return (
      <View
        style={[toolBarStyle.container, this.props.containerStyle ? this.props.containerStyle : '' ]}>
          {Toolbar}
      </View>
    );
  }
}