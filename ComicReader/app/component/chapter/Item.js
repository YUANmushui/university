import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { chapterStyle } from '../../style/common/chapterStyle';

// 章节列表的每一项
let Item = ({ item }) => {
  return (
    <View style={chapterStyle.itemContainer}>
      <Text style={chapterStyle.itemText}>{item.title}</Text>
      <Image source={require('../../images/ic_more.png')} style={chapterStyle.skipImg} />
    </View>
  );
}

export { Item };