/**
 * 首页action
 */

 import * as types from '../constant/actionType';
 import HttpUtil from '../utils/HttpUtil';

 /**
  * 发起首页内容请求
  */
 let loadMainContent = (isLoading, isLoadMore, isRefreshing) => {
   return {
     type: types.LOAD_MAIN_LIST,
     isLoading: isLoading,
     isLoadMore: isLoadMore,
     isRefreshing: isRefreshing
   };
 }

 /**
  * 接收首页内容
  */
 let receiveMainContent = (mainList) => {
   return {
     type: types.GET_MAIN_LIST,
     mainList: mainList
   };
 }

/**u
 * 发起请求数据请求
 */
export let main = (url, params, isLoading, isLoadMore, isRefreshing) => {
  return dispatch => {
    
    // dispatch一个类型为LOAD_MAIN_LIST的action，然后调用回调函数loadMainContent
    dispatch(loadMainContent(isLoading, isLoadMore, isRefreshing));

    // 发起网络请求获取漫画列表，后两个参数为回调函数，responseObj为响应内容
    return HttpUtil.fetchGet(url, params,
      (responseObj) => {
        // responseObj.result,booklist由后端决定
        dispatch(receiveMainContent(responseObj.result,booklist));
        console.log("success");
      },
      (err) => {
        dispatch(receiveMainContent([]));
        console.log("err: " + err);
      })
  }
}