/**
 * 漫画详情
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ListView,
    Navigator,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';

import * as Api from '../../constant/api';
import { detail } from '../../action/detailAction';
import Loading from '../../widget/Loading';
import ToolBar from '../../widget/ToolBar';
import { detailStyle } from '../../style/common/detailStyle';
import Item from './Item';

let isLoading = true;

class ComicDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgList: []
    }
  }

  componentDidMount() {
    let chapterId = this.props.id;
    url = Api.API_COMBIC_CHAPTER_DETAIL + '?id=' + chapterId

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState({imgList: JSON.parse(data)}))
    .catch((err) => {console.log(err)})
    // detail(Api.API_COMBIC_CHAPTER_DETAIL, params, isLoading);  //获取漫画详情
  }

  render() {
    return (
      <View>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
        <ToolBar
          leftButton="ios-arrow-back"
          title={this.props.name}
          titleStyle={detailStyle.barTitle}
          leftIconAction={this._back.bind(this)}
        />
        <SafeAreaView>
          <FlatList
            data={this.state.imgList}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => <Loading />}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={this._pressItem.bind(this, item)}>
                  <Item item={item} />
              </TouchableHighlight>
            )}
            style={detailStyle.listview}
          />
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 
   */
  _pressItem(rowData) {

  }

  /**
   * 返回上一页
   */
  _back() {
    this.props.navigator.pop();
  }
}

export default ComicDetail;
