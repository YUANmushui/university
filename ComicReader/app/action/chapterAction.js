/**
 * 章节列表
 */
import HttpUtil from '../utils/HttpUtil';
import * as types from '../constant/actionType';

// 请求加载漫画列表
let loadChapterData = (isLoding) => {
  return {
    type: types.LOAD_CHAPTER_LIST,
    isLoading: isLoding,
  }
}

// 接收漫画列表
let receiveChapterData = (chapterList) => {
  return {
    type: types.GET_CHAPTER_LIST,
    chapterList: chapterList,
  }
}

export let chapter = (url, params, isLoding) => {
  return dispatch => {
    dispatch(loadChapterData(isLoding));
    return HttpUtil.fetchGet(url, params,
      (responseObj) => dispatch(receiveChapterData(responseObj.result.chapterList)),
      (err) => dispatch(receiveChapterData([]))
    );
  }
}