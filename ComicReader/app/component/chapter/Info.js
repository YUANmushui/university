/**
 * 详情页面中漫画信息
 */
import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView, 
    View, 
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import { chapterStyle } from '../../style/chapterStyle';
import { func } from 'prop-types';

let Info = ({info}) => {
  return (
    <View>
      <View style={chapterStyle.infoContainer}>
          <Image source={{uri: info.cover}} style={chapterStyle.coverimg} />
          <View style={chapterStyle.infoRight}>
            <View style={chapterStyle.titleContain}>
                <Text style={chapterStyle.title} numberOfLines={1}>{info.name}</Text>
            </View>
            <View style={chapterStyle.infoBottom}>
                <Text style={chapterStyle.auth}>{info.author}</Text>
                <Text style={chapterStyle.status}>{!info.status ? '完结' : '连载到第'}{info.status ? info.sum+'话' : ''}</Text>
                <Text style={chapterStyle.category}>{info.type}</Text>
            </View> 
          </View>
      </View>
      <View style={chapterStyle.introContain}>
          <Text style={chapterStyle.introduction}>&emsp;&emsp;{info.introduction}</Text>
      </View>
    </View>
  );
}

export default Info;