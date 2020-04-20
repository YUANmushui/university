/**
 * 首页详情
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
import {Navigator} from 'react-native-deprecated-custom-components';

import { connect } from 'react-redux';

import * as Api from '../../constant/api';
import HttpUtil from '../../utils/HttpUtil';
import { chapter } from '../../action/chapterAction';
import { chapterStyle } from '../../style/chapterStyle';
import Toolbar from '../../widget/ToolBar';
import Loading from '../../widget/Loading';
import Detail from '../detail/comicDetail';
import { Item } from './Item';


// 状态
let isLoading = true;
let isFirstLoad = true;


// 导航
let _navigator = null;

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chapterList: []
    }
  }

  // 拉取网络数据
  componentDidMount() {
    comicId = this.props.id;
    url = Api.API_COMBIC_CHAPTER_LIST + '?id=' + comicId;

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState({chapterList: JSON.parse(data)}))
    .catch((err) => {console.log(err)})
    // HttpUtil.fetchGet(Api.API_COMBIC_CHAPTER_LIST, {id: comicId});
    // chapter(Api.API_COMBIC_CHAPTER_LIST, params, isLoading);  //获取漫画章节
  }

  render() {
    // _navigator = this.props.navigater;

    // const {Chapter} = this.props;
    // let chapterList = Chapter.chapterList;
    // if (chapterList.length > 0) {
    //   isFirstLoad = false;
    // }
    console.log(this.state.chapterList.length)

    return (
      <View style={chapterStyle.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Toolbar
          title={this.props.name}
          leftButton="ios-arrow-back"
          leftIconAction={this._back.bind(this)}
          />
          <SafeAreaView>
            <View>
            <View style={chapterStyle.infoContainer}>
                <Image source={{uri: this.props.cover}} style={chapterStyle.coverimg} />
                <View style={chapterStyle.infoRight}>
                  <View style={chapterStyle.titleContain}>
                      <Text style={chapterStyle.title} numberOfLines={1}>{this.props.name}</Text>
                  </View>
                  <View style={chapterStyle.infoBottom}>
                      <Text style={chapterStyle.auth}>{this.props.author}</Text>
                      <Text style={chapterStyle.status}>{!this.props.status ? '完结' : '连载到第'}{this.props.status ? this.props.sum+'话' : ''}</Text>
                      <Text style={chapterStyle.category}>{this.props.type}</Text>
                  </View> 
                </View>
            </View>
            <View>
                <Text style={chapterStyle.introduction}>&emsp;&emsp;{this.props.introduction}</Text>
            </View>
              {!this.state.chapterList.length ? 
                <Loading /> : <FlatList
                  data={this.state.chapterList}
                  renderItem={({item}) => (
                    <TouchableHighlight
                      underlayColor='#eee'>
                          <Item item={item} />
                      </TouchableHighlight>
                  )}
                />}
          </View>
          </SafeAreaView>
      </View>
    );
  }

  // item
  _renderRow(rowData, sectionId, rowId) {
    rowId = +rowId + 1;
    return <TouchableHighlight underlayColor="E6E6E6" onPress={this._pressItem.bind(this, rowData,this.props.name)}>
      <View style={chapterStyle.item}>
        <View style={chapterStyle.itemContainer}>
          <Text style={{ marginLeft: 10 }}>{rowId}</Text>
          <Text style={chapterStyle.title}>{rowData.name}</Text>
          <Image source={require('../../images/ic_more.png')} style={chapterStyle.skipImg} />
        </View>
        <View style={chapterStyle.underLine} />
      </View>
    </TouchableHighlight>
  }

  // 跳转到详情
  _pressItem(rowData, comicName) {
    this.props.navigater.push({
      name: "detail",
      component: Detail,
      sceneConfig: Navigator.SceneConfigs.PushFromRight,
      params: {
        rowData: rowData,
        comicName: comicName
      }
    });
  }

  // 返回上一页
  _back() {
    this.props.navigater.pop();
  }
}

export default connect((state) => {
  const {Chapter} = state;
  return {Chapter}
}, { chapter })(Chapter);