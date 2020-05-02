/**
 * 收藏
 */
import React, { Component } from 'react';
import {
    SafeAreaView, 
    View, 
    FlatList,
    TouchableHighlight,
    Text
} from 'react-native';

import { meStyle } from '../../style/me/meStyle';
import * as Api from '../../constant/api';
import Toolbar from '../../widget/ToolBar';
import Chapter from '../chapter/comicChapter';

import {Navigator} from 'react-native-deprecated-custom-components';

// 章节列表的每一项
let Item = ({ item }) => {
  return (
    <View style={meStyle.itemContainer}>
      <Text style={meStyle.itemText}>{item.title}</Text>
    </View>
  );
}

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mianList: []
    }
    this.queryMainList.bind(this);
  }

  componentDidMount() {
    this.queryMainList();
  }

  render() {
    return (
      <View>
        <Toolbar
          leftButton="ios-arrow-back"
          title="收藏夹"
          titleStyle={meStyle.barTitle}
          leftIconAction={this._back.bind(this)}
          />
        <SafeAreaView>
          <FlatList
            data={this.state.mianList}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableHighlight
              onPress={this._pressItem.bind(this, item.comicId)}
              underlayColor='#eee'>
                <Item item={item} />
              </TouchableHighlight>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 加载收藏夹列表
   */
  queryMainList() {
    let url = Api.API_COMBIC_ALLFAVORITE;
    fetch(url)
    .then((response) => response.json())
    .then((responseObj) => JSON.stringify(responseObj['data']))
    .then((data) => this.setState({mianList: JSON.parse(data)}))
    .catch((err) => console.log(err))
  }

  /**
   * 跳转到漫画详情页
   */
  _pressItem(id) {
    url = Api.API_COMBIC_INFO + "?id=" + id;
    fetch(url)
    .then((response) => response.json())
    .then((responseObj) => JSON.stringify(responseObj['data']))
    .then((data) => JSON.parse(data)[0])
    .then((data) => this.props.navigator.push({
      name: 'chapter',
      component: Chapter,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      params: {
        name: data.title,
        cover: data.cover,
        status: data.state,
        id: data.id,
        sum: data.sum,
        introduction: data.introduction,
        type: data.category,
        author: data.author
      }
    }))
    .catch((err) => console.log(err))
    
  }

  // 返回上一页
  _back() {
    this.props.navigator.pop();
  }
}