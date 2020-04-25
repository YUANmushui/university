/**
 * 漫画详情
 */
import React, { Component } from 'react';
import {
    View,
    StatusBar,
    SafeAreaView,
    FlatList,
    RefreshControl,
} from 'react-native';

import * as Api from '../../constant/api';
import Loading from '../../widget/Loading';
import ToolBar from '../../widget/ToolBar';
import { detailStyle } from '../../style/common/detailStyle';
import Item from './Item';
import LoadMoreFooter from '../../widget/LoadMoreFooter';

let isEnd = false;

class ComicDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      idList: [],
      currentIndex: 0
    }
    this.queryImg.bind(this);
    this.getCurrentId.bind(this);
  }

  /**
   * 获取漫画图片
   */
  queryImg(chapterId) {
    url = Api.API_COMBIC_CHAPTER_DETAIL + '?id=' + chapterId

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState(() => {
      const list = JSON.parse(data);
      isEnd = list.length ? false : true;
      const newList = this.state.imgList.concat(list);
      return {
        imgList: newList
      }
    }))
    .catch((err) => {console.log(err)})
  }

  /**
   * 根据下标返回id值
   */
  getCurrentId(index) {
    return this.state.idList[index];
  }

  componentDidMount() {
    let chapterId = this.props.id;
    this.setState({currentIndex: this.props.idArr.indexOf(chapterId)});
    this.setState({idList: this.props.idArr});   // 保存章节列表的id
    this.queryImg(chapterId);
  }

  render() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <ToolBar
          leftButton="ios-arrow-back"
          leftIconAction={this._back.bind(this)}
        />
        <SafeAreaView>
          <FlatList
            data={this.state.imgList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} />}
            ListEmptyComponent={() => <Loading />}
            ListFooterComponent={() => <LoadMoreFooter />}
            style={detailStyle.listview}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (!isEnd) {
                let index = this.state.currentIndex + 1;
                let id = this.getCurrentId(index);               
                this.setState(() => {               
                  return {
                    currentIndex: index
                  }
                });
                this.queryImg(id);
              }
            }}
           />
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 返回上一页
   */
  _back() {
    this.props.navigator.pop();
  }
}

export default ComicDetail;
