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
} from 'react-native';

import ExpandableText from 'rn-expandable-text';
import {Navigator} from 'react-native-deprecated-custom-components';

import * as Api from '../../constant/api';
import ToolBar from '../../widget/ToolBar';
import { discoverStyle } from '../../style/discover/discoverStyle';
import Loading from '../../widget/Loading';
import Chapter from '../chapter/comicChapter';


/**
 * 初始化状态
 */
let isLoading = true;
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
      onSwitch: false
    }
  }

  componentDidMount() {
    url = Api.API_COMBIC_LIST;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState(() => ({discoverList: JSON.parse(data)})))
    .catch((err) => {console.log(err)})
  }

  render() {
    if (this.state.discoverList.length) {
      isFirstLoad = false;
    }
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
            )} />
            {this.state.discoverList.length ? <View /> : <Loading />}
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