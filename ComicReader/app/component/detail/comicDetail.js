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
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import * as Api from '../../constant/api';
import { detail } from '../../action/detailAction';
import Loading from '../../widget/Loading';
import ToolBar from '../../widget/ToolBar';
import { detailStyle } from '../../style/detailStyle';

/**
 * url参数
 */
let params = {
  comicName: '',
  id: 0
}
let isLoading = true;

class ComicDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        // 数据是否更新
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount() {
    const {detail} = this.props;
    params.id = this.props.rowData.id;
    params.comicName = this.props.comicName;
    detail(Api.API_COMBIC_CHAPTER_DETAIL, params, isLoading);  //获取漫画详情
  }

  render() {

    const {Detail} = this.props;
    let detailList = Detail.detailList;

    return (
      <View style={detailStyle.container}>
        <ToolBar
          leftButton="left"
          title={this.props.rowData.name}
          titleStyle={{ marginLeft: 10 }}
          leftIconAction={this._back.bind(this)}
        />

        {Detail.isLoading ? <Loading /> : <ListView
          dataSource={this.state.dataSource.cloneWithRows(detailList)}
          horizontal={true}
          enableEmptySections={true}
          style={detailStyle.listview}
          renderRow={this._renderRow.bind(this)}
        />}
      </View>
    );
  }

  /**
   * item
   */
  _renderRow(rowData, sectionId, rowId) {
    return <TouchableOpacity onPress={this._pressItem.bind(this, rowData)}>
      <View style={detailStyle.listitem}>
        <Image source={{ uri: rowData.imageUrl }} style={detailStyle.img} resizeMode={'contain'} />
      </View>
    </TouchableOpacity>
  }

  /**
   * 展示大图
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

export default connect((state) => {
  const {Detail} = state;
  return Detail;
}, { detail })(ComicDetail);
