/**
 * 列表下拉加载更多
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { loadingMoreFooterStyle } from '../style/common/loadingFooterStyle';

export default class LoadingMoreFooter extends Component {

  render() {
    
    return (
      <View style={loadingMoreFooterStyle.container}>
        <ActivityIndicator />
        <Text style={loadingMoreFooterStyle.title}>{this.props.isend ? '已经到底啦' : '正在加载...'}</Text>
      </View>
    )
  }
}