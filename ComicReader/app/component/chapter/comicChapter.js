/**
 * 首页详情
 */
import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView, 
    View, 
    FlatList,
    TouchableHighlight
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import * as Api from '../../constant/api';
import HttpUtil from '../../utils/HttpUtil';
import { chapter } from '../../action/chapterAction';
import { chapterStyle } from '../../style/common/chapterStyle';
import Toolbar from '../../widget/ToolBar';
import Loading from '../../widget/Loading';
import Detail from '../detail/comicDetail';
import { Item } from './Item';
import Info from './Info';


// 状态
let isLoading = true;
let isFirstLoad = true;
let idList = [];

// 导航
let _navigator = null;

const actions = [{
  text: "开始阅读",
  icon: <Icon name='ios-book' style={chapterStyle.startRead} />,
  name: 'begin-read',
  position: 1
},{
  text: "收藏",
  icon: require("../../images/ic_coll.png"),
  name: "love",
  position: 2
},{
  text: "缓存",
  icon: <Icon name='ios-download' style={chapterStyle.startRead} />,
  name: "download",
  position: 3
}];

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chapterList: [],
    };
    this._switch.bind(this);
    this.queryChapter.bind(this);
    this.getChapterId.bind(this);
  }

  /**
   * 获取章节列表
   */
  queryChapter() {
    comicId = this.props.id;
    url = Api.API_COMBIC_CHAPTER_LIST + '?id=' + comicId;

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState({chapterList: JSON.parse(data)}))
    .catch((err) => {console.log(err)})
  }

  /**
   * 获取章节id列表
   */
  getChapterId() {
    let list = this.state.chapterList;
    for(i in list) {
      idList.unshift(list[i]['id'])
    }

    return idList;
  }

  // 拉取网络数据
  componentDidMount() {
    this.queryChapter();
  }

  render() {

    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Toolbar
          leftButton="ios-arrow-back"
          leftIconAction={this._back.bind(this)}
          />
          <SafeAreaView>
            <FlatList
              data={this.state.chapterList}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={
                    this._pressItem.bind(this, item)
                  }
                  underlayColor='#eee'>
                    <Item item={item} />
                </TouchableHighlight>
              )}
              style={chapterStyle.flatlist}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => <Info info={this.props} />}
            />
            {this.state.chapterList.length ? <View /> : <Loading />}     
          </SafeAreaView>
          <FloatingAction
            actions={actions}
            distanceToEdge={55}
            color='#f08080'
            position='center'
            onPressItem={name => {
              this._switch(name);
            }}
          />
      </View>
    );
  }

  // 跳转到详情
  _pressItem(item) {
    let idArr = idList.length ? idList : this.getChapterId();
    let id = item ? item.id : idArr[0];
    this.props.navigator.push({
      name: "detail",
      component: Detail,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      params: {
        id: id,
        idArr: idArr
      }
    });
  }

  // 返回上一页
  _back() {
    this.props.navigator.pop();
  }

  // 判断是哪一个按钮被按了
  _switch(name) {
    const list = {
      "begin-read": this._pressItem(),
      "love": '收藏',   //这里待写收藏漫画的函数
      "download": '下载'   //这里待写下载的函数
    }
    return list[name];
  }
}

export default Chapter;