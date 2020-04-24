/**
 * 漫画列表页（根据分类）
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
    RefreshControl
} from 'react-native';
import ToolBar from '../../widget/ToolBar';
import {cateStyle} from '../../style/choice/cateStyle';
import * as Api from '../../constant/api';
import Loading from '../../widget/Loading';
import Chapter from '../chapter/comicChapter';
import LoadMoreFooter from '../../widget/LoadMoreFooter';
import {Navigator} from 'react-native-deprecated-custom-components';

let isLoading = false;

function Item({item}) {
  return (
    <View></View>
  );
}

export default class Category extends Component {

  constructor(prop) {
    super(prop);
    this.state={
      mainList: [],
      page: 1
    };
    this.queryMainList.bind(this);
  }

  /**
   * 加载列表
   */
  queryMainList() {

    let url = Api.API_COMBIC_CATEGORY + "?category=" + this.props.route;
    url = url + "&page=" + this.state.page;

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState(() => {
      const list = JSON.parse(data);
      const newList = this.state.mainList.concat(list);
      return {
        mainList: newList
      };
    }))   // 将json格式的data转换为JavaScript对象
    .catch((err) => {console.error(err)})
  }

  componentDidMount() {
    this.queryMainList();
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
        <ToolBar
          title={this.props.title}
          leftButton="ios-arrow-back"
          titleStyle={cateStyle.barTitle}
          leftIconAction={this._back.bind(this)}
          />
        <SafeAreaView>
          <FlatList
            data={this.state.mainList}
            renderItem={(item) => (
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
              // 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
              this.setState(() => {
                const Page = this.state.page+1;
                return {
                  page: Page
                }
              });
              this.queryMainList();
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  // 下拉刷新
                  this.setState({page: 1});
                  this.state.mianList = [];
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

  /**
   * 返回上一页
   */
  _back() {
    this.props.navigator.pop();
  }
}