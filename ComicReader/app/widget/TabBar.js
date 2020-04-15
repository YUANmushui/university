import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { tabBarStyle } from '../style/tabBarStyle';
import { commonStyle } from '../style/commonStyle';

export default class TabBar extends Component {

  // 1.声明所需的属性
  static propTypes = {

    /**
     * 框架内帮我们回调
     */
    goToPage: PropTypes.func, // 跳转到对应tab
    activeTab: PropTypes.number, // 当前被选中的Tab下标
    tabs: PropTypes.array, // 所有Tab的集合

    /**
     * 需要自己调用
     */
    tabNames: PropTypes.array, // 所有Tab的名称
    tabIcons: PropTypes.array //所有Tab的图标
  }

  /**
   * tab切换的时候有动画效果
   */
  setAnimationValue({value}) {

  }

  componentDidMount() {
    // Animated.Value监听范围[0, tab数量-1]
    this.props.scrollValue.addListener(this.setAnimationValue);  
  }

  /**
   * 生成Tab
   * i标识哪个Tab
   */
  renderTab(tab, i) {

    let color = this.props.activeTab === i ? "#FE2D4A" : "#8E8E8E";
    return (
      <TouchableOpacity
        key={i}
        activeOpacity={0.6}
        onPress={() => this.props.goToPage(i)}
        style={tabBarStyle.tab}>
          <View style={tabBarStyle.item}>
            <Icon
              name={this.props.tabIcons[i]}
              size={27}
              color={color}
              />
            <Text
              style={{ color: color, fontSize: 12 }}>
                { this.props.tabNames[i] }
            </Text>
          </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={tabBarStyle.container}>
        <View style={commonStyle.underline} />
        <View style={tabBarStyle.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTab(tab, i))}
        </View>
      </View>
    );
  }
}