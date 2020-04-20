import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
} from 'react-native';

// 章节列表的每一项
let Item = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
}

export { Item };