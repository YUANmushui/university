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
import Toast from 'react-native-root-toast';

import * as Api from '../../constant/api';
import { chapterStyle } from '../../style/common/chapterStyle';
import Toolbar from '../../widget/ToolBar';
import Loading from '../../widget/Loading';
import Detail from '../detail/comicDetail';
import { Item } from './Item';
import Info from './Info';


// 状态
let isLoading = true;
let isFirstLoad = true;
// let idList = [];

// 导航
let _navigator = null;

function actions(isFavorite) {
  const actions = [{
    text: "开始阅读",
    icon: <Icon name='ios-book' style={chapterStyle.startRead} />,
    name: 'begin-read',
    position: 1,
  },{
    text: "收藏",
    icon: <Icon name='ios-heart-half' style={isFavorite ? chapterStyle.active : chapterStyle.startRead} />,
    name: "love",
    position: 2
  },{
    text: "缓存",
    icon: <Icon name='ios-download' style={chapterStyle.startRead} />,
    name: "download",
    position: 3
  }];

  return actions;
}

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chapterList: [],
      isFavorite: 0,
      idList: []
    };
    this._switch.bind(this);
    this.queryChapter.bind(this);
    this.getChapterId.bind(this);
    this._isCollected.bind(this);
    this._collect.bind(this);
    this._cancelCollect.bind(this);
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
    let idlist = [];
    for(i in list) {
      idlist.unshift(list[i]['id'])
    }

    this.setState({idList: idlist});

    return idList;
  }

  // 拉取网络数据
  componentDidMount() {
    this.queryChapter();
    this._isCollected(this.props.id);
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
            actions={actions(this.state.isFavorite)}
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
    let idArr = this.state.idList.length ? this.state.idList : this.getChapterId();
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

    if (name == "begin-read") {
      this._pressItem()
    } else if (name == "love") {
      if (this.state.isFavorite) {
        this._cancelCollect(this.props.id)
      } else {
        this._collect(this.props.id)
      }
    } else {
      console.log("下载");
    }
  }

  // 判断是否已被收藏
  _isCollected(id) {
    const url = Api.API_COMBIC_ISFAVORITE + '?id=' + id;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState({isFavorite: JSON.parse(data).isSave}))
    .catch((err) => {console.log(err)})
  }

  // 收藏
  _collect(id) {
    let url = Api.API_COMBIC_COLLECT + '?id=' + this.props.id + '&title=' + this.props.name;
    fetch(url)
    .then(() => this.setState({isFavorite: 1}))
    .then(() => Toast.show("已收藏", 
                          {duration: 1, position: Toast.positions.CENTER, animation: true}))
    .catch((err) => {console.log(err)})
    
  }

  // 取消收藏
  _cancelCollect(id) {
    let url = Api.API_COMBIC_CANCEL + '?id=' + this.props.id;
    fetch(url)
    .then(() => this.setState({isFavorite: 0}))
    .then(() => Toast.show("已取消收藏", 
                          {duration: 1, position: Toast.positions.CENTER, animation: true}))
    .catch((err) => {console.log(err)})
    
  }
}

export default Chapter;