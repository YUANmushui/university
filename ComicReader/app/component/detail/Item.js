import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import { detailStyle } from '../../style/detailStyle';

// 漫画的每一张图片
let Item = ({ item }) => {
  return (
    <View>
      <Image source={{ uri: item.link }} style={detailStyle.img} resizeMode={'cover'} />
    </View>
  );
}

export default Item;