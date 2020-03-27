/**
 * 漫画详情action
 */
import HttpUtil from '../utils/HttpUtil';
import * as types from '../constant/actionType';

// 请求漫画详情
let loadDetailData = (isLoading) => {
  return {
    type: types.LOAD_COMIC_DETAIL_LIST,
    isLoading: isLoading
  };
}
 
// 接收漫画详情数据
let receiveDetailData = (detailList) => {
  return {
    type: types.GET_COMIC_DETAIL_LIST,
    detailList: detailList
  };
}

export let detail = (url, params, isLoading) => {
  return dispatch => {
    dispatch(loadDetailData(isLoading));
    return HttpUtil.fetchGet(url, params,
      (responseObj) => dispatch(receiveDetailData(responseObj.result.imageList)),
      (err) => dispatch(receiveDetailData([]))
    );
  };
}
