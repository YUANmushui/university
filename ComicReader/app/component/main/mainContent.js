/**
 * 首页
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    StatusBar,
    Navigator,
    RefreshControl,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import StaticContainer from 'react-static-container';
import ViewPager from 'react-native-viewpager';

import { mainStyle } from '../../style/mainStyle';
import * as Api from '../../constant/api';
import { main } from '../../action/mainAction';
import Chapter from '../chapter/comicChapter';
import Loading from '../../widget/Loading';
import LoadingMoreFooter from '../../widget/LoadMoreFooter';

/**
 * 初始化状态
 */
let isLoading = true; //是否为加载中状态
let isLoadMore = false; //是否为加载更多
let isRefreshing = false; //是否刷新
let isFirstLoad = true; //是否是第一次加载

/**
 * url
 */
let params = {
  type: '少年漫画',
  skip: 40
};

export default class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // ListView和ViewPager展示图文列表
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      viewpagerDataSource: new ViewPager.DataSource({
        pageHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  // 当挂载的时候拉取网络数据
  componentDidMount() {
    const {main} = this.props;
    main(Api.API_COMBIC_LIST, params, isLoading, isLoadMore, isRefreshing);
  }

  render() {
    return (
      <View style={mainStyle.contentContainer}>
        <StatusBar backgroundColor="#000000" translucent={true}/>
        <ListView
          style={mainStyle.listview}/>
      </View>
    );
  }

  /**
   * 头部
   */
  _renderHeader() {}

  /**
   * 底部
   */
  _renderFooter() {}

  /**
   * banner布局
   */
  _renderPage() {}

  /**
   * item
   */
  _renderRow(rowData, sectionId, rowId) {}

  /**
   * 滑动监听
   */
  _onScroll() {}

  /**
   * 下拉刷新
   */
  _onRefresh() {}

  /**
   * 加载更多
   */
  _onEndReach() {}

  /**
   * 跳转到漫画详情页
   */
  _onPressRow(rowData, rowId) {}
}