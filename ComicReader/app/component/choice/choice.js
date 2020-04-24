/**
 * 分类
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableHighlight,
    FlatList,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import ToolBar from '../../widget/ToolBar';
import Category from './category';
import { choiceStyle } from '../../style/choice/choiceStyle';

const categoryList = [
  {
    title: "玄幻",
    route: "fantasy",
    index: 1,
    uri: require('../../images/category/c1.jpg')
  }, {
    title: "悬疑",
    route: "suspense",
    index: 2,
    uri: require('../../images/category/c2.jpg')
  }, {
    title: "校园",
    route: "school",
    index: 3,
    uri: require('../../images/category/c3.jpg')
  }, {
    title: "搞笑",
    route: "fanny",
    index: 4,
    uri: require('../../images/category/c4.jpg')
  }, {
    title: "霸总",
    route: "bazong",
    index: 5,
    uri: require('../../images/category/c5.jpg')
  }, {
    title: "修真",
    route: "comprehension",
    index: 6,
    uri: require('../../images/category/c6.jpg')
  }, {
    title: "恋爱",
    route: "lovein",
    index: 7,
    uri: require('../../images/category/c7.jpg')
  }, {
    title: "生活",
    route: "life",
    index: 8,
    uri: require('../../images/category/c8.jpg')
  }, {
    title: "热血",
    route: "blood",
    index: 9,
    uri: require('../../images/category/c9.jpg')
  },  {
    title: "恐怖",
    route: "terror",
    index: 10,
    uri: require('../../images/category/c10.jpg')
  }, {
    title: "战争",
    route: "war",
    index: 11,
    uri: require('../../images/category/c11.jpg')
  }, {
    title: "古风",
    route: "antiquity",
    index: 12,
    uri: require('../../images/category/c12.jpg')
  }, {
    title: "穿越",
    route: "cross",
    index: 13,
    uri: require('../../images/category/c13.jpg')
  },
];
const SCREEN_WIDTH = Dimensions.get('window').width;

function Item({item}) {
  return (
    <View style={[choiceStyle.item, {width: (SCREEN_WIDTH-40)/2}]}>
      <Image style={choiceStyle.img} resizeMode={'contain'} source={item.uri} />
      <Text style={choiceStyle.text}>{item.title}</Text>
    </View>
  );
}

export default class Choice extends Component {

  render() {
    return (
      <View style={choiceStyle.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
        <ToolBar
          title="分类"
          titleStyle={{ textAlign: 'center' }}
          />
        <SafeAreaView style={choiceStyle.container}>
          <FlatList
              data={categoryList}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={this._onPressRow.bind(this, item)}
                  underlayColor="#eee">
                    <Item item={item} />
                </TouchableHighlight>
              )}
              keyExtractor={item => item.index}
              numColumns={2}
               />
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 跳转到分类的列表页
   */
  _onPressRow(item) {
    this.props.navigator.push({
      name: 'category',
      component: Category,
      params: {
        title: item.title,
        route: item.route,
        id: item.index
      }
    });
  }
}