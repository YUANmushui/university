import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView, 
    View, 
    Text,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';

// import {main} from '../../action/mainAction';
import HttpUtil from '../../utils/HttpUtil';
import * as API from '../../constant/api';
import Loading from '../../widget/Loading';
import {Item, ListHeader} from './content/Content';

/**
 * 初始化状态
 */
let isLoading = true;
let isLoadMore = false;
let isRefreshing = false;
let isFirstLoad = true;

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
    }
  }

  componentDidMount() {

    // HttpUtil.fetchGet(API.API_COMBIC_LIST);

    fetch(API.API_COMBIC_LIST)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => this.setState({mianList:JSON.parse(data)}))   // 将json格式的data转换为JavaScript对象
    .catch((err) => {console.error(err)})
    
  }

  render() {
    return (
        <View>
            <StatusBar barStyle={('dark-content')} translucent={false} />
            <SafeAreaView>            
              <FlatList
                data={this.state.mianList}
                renderItem={({ item }) => <Item 
                  item={item} />}
                keyExtractor={item => item.id}
                initialNumToRender={10}
                ListEmptyComponent={() => <Loading />}
                ListHeaderComponent={()=><ListHeader imgUri={bannerImgs}/>}
                 />
            </SafeAreaView>
        </View>
    );
  }

}