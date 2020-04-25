/**
 * 发现
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
    RefreshControl,
} from 'react-native';

import ExpandableText from 'rn-expandable-text';
import {Navigator} from 'react-native-deprecated-custom-components';

import * as Api from '../../constant/api';
import ToolBar from '../../widget/ToolBar';
import { discoverStyle } from '../../style/discover/discoverStyle';
import Loading from '../../widget/Loading';
import Chapter from '../chapter/comicChapter';
import LoadMoreFooter from '../../widget/LoadMoreFooter';


/**
 * 初始化状态
 */
let isLoading = false;
let isEnd = false;
let isLoadingMore = false;
let isRefreshing = false;
let isFirstLoad = true;

function Item({item}) {
  return (
    <View style={discoverStyle.listitem}>
      <Image source={{uri: item.cover}} style={discoverStyle.img} />
      <ExpandableText
        numberOfLines={2}
        unexpandView={() => (<Text style={discoverStyle.arrow_down_up}>收起</Text>)}
        expandView={() => (<Text style={discoverStyle.arrow_down_up}>展开</Text>)}
        style={discoverStyle.intro}
      >
        &emsp;&emsp;{item.introduction}
      </ExpandableText>
    </View>
  );
}

export default class Discover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discoverList: [],
    }
    this.queryMainList.bind(this);
  }

  /**
   * 加载列表
   */
  queryMainList() {

    let url = Api.API_COMBIC_LIST_RANDOM
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState(() => {
      const list = JSON.parse(data);
      isEnd = list.length < 5 ? true : false;
      const newList = this.state.discoverList.concat(list);
      return {
        discoverList: newList
      };
    }))   // 将json格式的data转换为JavaScript对象
    .catch((err) => {console.error(err)})
  }

  componentDidMount() {
    this.queryMainList();
  }

  render() {
    return (
      <View style={discoverStyle.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
        <ToolBar
          title="精选"
          titleStyle={{ textAlign: 'center' }}
          />
        <SafeAreaView style={discoverStyle.container}>
          <FlatList
            data={this.state.discoverList}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#eee"
                onPress={this._onPressRow.bind(this, item)}>
                  <Item item={item} />
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => <Loading />}
            ListFooterComponent={() => <LoadMoreFooter />}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!isEnd) {
                this.queryMainList()
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  // 下拉刷新
                  isEnd = false;
                  this.state.discoverList = [];
                  this.queryMainList();
                }}
              />
            }
             />
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 跳转到漫画详情页
   */
  _onPressRow(item) {
    this.props.navigator.push({
      name: 'chapter',
      component: Chapter,
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      params: {
        name: item.title,
        cover: item.cover,
        status: item.state,
        id: item.id,
        sum: item.sum,
        introduction: item.introduction,
        type: item.category,
        author: item.author
      }
    });
  }

}