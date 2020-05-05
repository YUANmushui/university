import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView, 
    View, 
    FlatList,
    TouchableHighlight,
    RefreshControl,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Chapter from '../chapter/comicChapter';

// import {main} from '../../action/mainAction';
import HttpUtil from '../../utils/HttpUtil';
import * as API from '../../constant/api';
import Loading from '../../widget/Loading';
import LoadMoreFooter from '../../widget/LoadMoreFooter';
import {Item, ListHeader} from './content/Content';

/**
 * 初始化状态
 */
let isLoading = false;
let isLoadMore = false;
let isRefreshing = false;
let isFirstLoad = true;
let isEnd = false;

var bannerImgs = [
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d8.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad640.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d3.jpg'
];

export default class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        mianList: [],
        page: 1
    }
    this.queryMainList.bind(this);
  }

  /**
   * 加载列表
   */
  queryMainList(page) {

    let url = API.API_COMBIC_LIST + "?page=" + page
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState(() => {
      const list = JSON.parse(data);
      isEnd = list.length < 10 ? true : false;
      const newList = this.state.mianList.concat(list);
      return {
        mianList: newList
      };
    }))   // 将json格式的data转换为JavaScript对象
    .catch((err) => {console.error(err)})
  }

  componentDidMount() {
    
    this.queryMainList(this.state.page);
  }

  render() {
    return (
        <View>
            <StatusBar barStyle={('light-content')} translucent={true} backgroundColor={'transparent'} />
            <SafeAreaView>            
              <FlatList
                data={this.state.mianList}
                renderItem={({ item }) => (   // 列表中的每一项
                  <TouchableHighlight 
                    onPress={this._onPressRow.bind(this, item)}
                    underlayColor='#eee'>
                      <Item item={item} />
                  </TouchableHighlight>
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => <Loading />}
                ListHeaderComponent={()=><ListHeader imgUri={bannerImgs}/>}
                ListFooterComponent={() => <LoadMoreFooter />}
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                  if (!isEnd) {// 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                    this.setState(() => {
                      const Page = this.state.page+1;
                      return {
                        page: Page
                      }
                    });
                    this.queryMainList(this.state.page);
                  }
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => { // 下拉刷新
                      isEnd = false;
                      this.setState({page: 1});
                      this.state.mianList = [];
                      this.queryMainList(this.state.page);
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