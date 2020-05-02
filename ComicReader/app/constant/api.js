const BASE_API = "http://127.0.0.1:1234/api";
// https://www.mkzhan.com/

// 漫画分类
export const API_COMBIC_CATEGORY = BASE_API + "/category";

// 漫画列表（根据类别）
export const API_COMBIC_LIST = BASE_API + "/homepage";

// 漫画章节列表(根据漫画名称)
export const API_COMBIC_CHAPTER_LIST = BASE_API + "/detail";

// 漫画章节详情内容（漫画名称，章节id）
export const API_COMBIC_CHAPTER_DETAIL = BASE_API + "/check";

// 漫画列表（随机）
export const API_COMBIC_LIST_RANDOM = BASE_API + "/random";

// 判断漫画是否被收藏
export const API_COMBIC_ISFAVORITE = BASE_API + "/isFavorite";

// 收藏漫画
export const API_COMBIC_COLLECT = BASE_API + "/collect";

// 取消收藏
export const API_COMBIC_CANCEL = BASE_API + "/cancellCollect";

// 查询收藏夹
export const API_COMBIC_ALLFAVORITE = BASE_API + "/getAllFavorite";

// 根据id查询漫画信息
export const API_COMBIC_INFO = BASE_API + "/getComicInfo";


