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

// 轮播图片
let bannerImgs = [
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d6.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad61f.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d0.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d8.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad640.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d3.jpg'
];

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

    const {Main} = this.props;
    let mainList = Main.mainList;
    if (mainList.length) {
      isFirstLoad = false;
    }
    return (
      // 漫画列表
      <View style={mainStyle.contentContainer}>
        <StatusBar backgroundColor="#000000" translucent={true} />
        <ListView
          style={mainStyle.listview}
          dataSource={this.state.dataSource.cloneWithRows(mainList)}
          onEndReachedThreshold={10}  //决定当距离内容最底部还有多远时触发onEndReached回调，其参数为比值
          onEndReached={this._onEndReach.bind(this)}  //滚动位置进入onEndReachedThreshold渲染内容时调用一次
          enableEmptySections={true}  //指示是否应呈现空节头的标志
          renderRow={this._renderRow.bind(this)}  //从数据源及其ID中获取数据条目，并应返回可渲染的组件以将其渲染为行
          onScroll={this._onScroll.bind(this)}  //绑定滑动监听事件
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}  //页眉和页脚始终在每个渲染通道上渲染，重新渲染很昂贵，则包裹在适当的机制中
          refreshControl={
            // 在ScrollView或ListView中使用此组件可添加拉动刷新功能
            <RefreshControl
              refreshing={false}  // 视图是否应该指示活动刷新
              onRefresh={this._onRefresh.bind(this)}  // 视图开始刷新时调用
              colors={["#F70938"]}  // 用于绘制刷新指示器的颜色（至少一种）
            />
          }
          />
      </View>
    );
  }

  /**
   * 头部
   */
  _renderHeader() {
    // StaticContainer解决ListView每次循环导致Header和Footer刷新
    // 轮播图
    return <StaticContainer>
      <ViewPager
        dataSource={this.state.viewpagerDataSource.cloneWithPages(bannerImgs)}
        renderPage={this._renderPage.bind(this)}
        isLoop={true}
        autoPlay={true}
      />
    </StaticContainer>
  }

  /**
   * 底部
   */
  _renderFooter() {
    const {Main} = this.props;
    // 假如isLoadMore为true，那么就显示加载更多的组件
    if (Main.isLoadMore) {
      return <StaticContainer>
        <LoadingMoreFooter />
      </StaticContainer>
    }
  }

  /**
   * banner布局
   */
  _renderPage(data, pageId) {
    return <Image source={{ uri: data }} style={mainStyle.banner} resizeMode={'stretch'} />
  }

  /**
   * 数据条目
   */
  _renderRow(rowData, sectionId, rowId) {
    return <TouchableHighlight underlayColor='#E6E6E6' onPress={this._onPressRow.bind(this, rowData, rowId)}>
      <View style={mainStyle.listitem}>
        <Image source={{ uri: rowData.coverImg }} style={mainStyle.itemimage} />
        <View style={mainStyle.item}>
          <View style={mainStyle.itemcontent}>
            <View style={mainStyle.itemtitle}>
              <Text style={{ fontSize: 16 }}>{rowData.name}</Text>
              <Text style={mainStyle.time}>{rowData.area}</Text>
            </View>

            {rowData.finish ? <Image source={require('../../images/ic_over.png')}
                  style={mainStyle.hintImg} resizeMode={'stretch'} /> : <View />}

          </View>
          <Text style={mainStyle.des} numberOfLines={1}>{rowData.des}</Text>
        </View>
      </View>
    </TouchableHighlight>
  }

  /**
   * 滑动监听
   */
  _onScroll() {}

  /**
   * 下拉刷新
   */
  _onRefresh() {
    isLoading = false;
    isLoadMore = false;
    isRefreshing = true;
    const {main} = this.props;
    params.skip = 40;  //初始到第一页
    main(Api.API_COMBIC_LIST, params, isLoading, isLoadMore, isRefreshing); //刷新
  }

  /**
   * 加载更多
   */
  _onEndReach() {

    if (!isFirstLoad) {
      isLoadMore = true;
      isLoading = false;
      isRefreshing = false;
      params.skip += 20;
      const {main} = this.props;
      main(Api.API_COMBIC_LIST, params, isLoading, isLoadMore, isRefreshing); 
    }
  }

  /**
   * 跳转到漫画详情页
   */
  _onPressRow(rowData, rowId) {

    this.props.navigator.push({
      name: 'chapter',
      component: Chapter,
      sceneConfig: Navigator.SceneConfigs.PushFromRight,
      params: {
        name: rowData.name
      }
    });
  }
}

export default connect((state) => {
  const {Main} = state;
  return {
    Main  // 1.相当于返回Main:Main，当key和value相同时，可省略key ==> es6（即可通过this.props.Main获取state中的状态值）
  }
}, {Main}  // 2.注入action,即可调用action中声明的方法,（即可通过this.props.main获取,用于调用main中的方法）
)(MainContent)  // 3.将组件注入