/**
 * App的入口，将store注入Provider
 */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducer/rootReducer';

// 判断redux调试工具是否存在
let composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      }) : compose;

let enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

// createStore的第二个参数为state初始值(可以为空)，第三参数为enhancer,返回增强后的reducer
let store = createStore(rootReducer, enhancer);

export default store