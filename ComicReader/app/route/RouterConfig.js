import {
  createAppContainer,  
} from 'react-navigation';
import {
  Component
} from 'react';
import {
  createStackNavigator
} from 'react-navigation-stack';

import Main from '../component/main/main';
import MainContent from '../component/main/mainContent';


// 1.创建一个导航器栈实例，用于注册页面，对页面进行统一管理
const AppNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  MainContent: {
    screen: MainContent
  },
}, {
  initialRouteName: 'MainContent',
},
);

// 2.导航器栈还需使用下面的函数进行包裹
const AppContainer = createAppContainer(AppNavigator);
export default class NavigatorPage extends Component {
  render() {
    return <AppContainer />;
  }
}
// 3. 在入口文件以组件形式引入