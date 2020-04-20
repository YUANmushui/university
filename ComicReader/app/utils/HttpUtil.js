/**
 * 网络请求
 * url：请求地址
 * successCallback：成功后的回调函数
 * failCallback：失败后回调函数
 */

 let HttpUtil = {

  /**
   * GET
   */
  fetchGet: (url, params='', successCallback, failCallback) => {

    // 如果有参数
    if (params) {
      
      // params 为{'key1': value1, 'key2': value2} 格式
      var paramsBody = Object.keys(params)
          .reduce((a, k) => {
            a.push(k + '=' + decodeURIComponent(params[k]));  // ("key1=value1", "key2=value2")
            return a;
          }, []) 
          .join('&');  // "key1=value1&key2=value2"
      url += "?" + paramsBody;  
    }

   fetch(url)
    .then((response) => response.json())
    .then((responseJson) => JSON.stringify(responseJson['data']))
    .then((data) => JSON.parse(data))   // 将json格式的data转换为JavaScript对象
    .catch((err) => {console.error(err)})

  }
  /**
   * POST
   */
};

 export default HttpUtil;