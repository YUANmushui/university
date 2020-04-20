import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableNativeFeedback,
} from 'react-native';
import StaticContainer from 'react-static-container';
import Swiper from 'react-native-swiper';
import window from '../../../constant/dimission';
import Loading from '../../../widget/Loading';

function onPressRow(data, id) {
  // this.props.navigator.push()
}

// 列表的每一项
let Item = ({item}) => {
  return (



    // 给item添加监听事件，待。。。
    <TouchableNativeFeedback onPress={onPressRow(item, item.id)}>
      <View style={styles.item} id={item.id}>
        <Image source={{uri: item.cover}} style={styles.img} />
        <View style={styles.text}>
          <View style={styles.top}>
            <View>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
              <Text style={styles.type}>{item.category}</Text>
            </View>
            {!item.state ? <Image source={require('../../../images/ic_over.png')}
                style={styles.hintImg}
                resizeMode={'stretch'}/> : <View />}
          </View>
          <Text numberOfLines={2} style={styles.intr}>    {item.introduction}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

// 轮播图, 列表顶部
let ListHeader = ({imgUri}) => {
  return (
    <StaticContainer>
      <Swiper style={styles.wrapper}
          removeClippedSubviews={false}
          showsButtons={true}         //显示控制按钮
          loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
          autoplay={true}                //自动轮播
          autoplayTimeout={3}          //每隔
          dot={<View style={{           //未选中的圆点样式
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 9,
              marginTop: 9,
              marginBottom: 4,
          }}/>}
          activeDot={<View style={{    //选中的圆点样式
              backgroundColor: '#FF620E',
              width: 10,
              height: 10,
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 9,
              marginTop: 9,
              marginBottom: 4,
          }}/>}
      >
        <Image source={{ uri: imgUri[0] }} style={styles.banner} resizeMode={'cover'} />
        <Image source={{ uri: imgUri[1] }} style={styles.banner} resizeMode={'cover'} />
        <Image source={{ uri: imgUri[2] }} style={styles.banner} resizeMode={'cover'} />
      </Swiper>
    </StaticContainer>
  );
}

// 列表底部,加载更多
let ListFooter = () => {}

export {Item, ListHeader, ListFooter};

const styles = StyleSheet.create({
  item: {
    padding: 1,
    marginVertical: 4,
    marginHorizontal: 2,
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    color: '#28292D'
  },
  img: {
    height: 150,
    borderRadius: 15,
    resizeMode: 'contain',
    flex: 1
  },
  text: {
    flex: 2,
  },
  author: {
    fontSize: 10,
    color: '#999',
  },
  type: {
    marginBottom: 30,
    marginTop: 10,
    color: '#FF620E'
  },
  intr: {
    color: 'gray',
    
  },
  wrapper: {
    height: 200
  }, 
  banner: {
    width: window.width,
    height: 200
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  hintImg: {
    width: 50,
    height: 50,
  },
  itemImage: {
    width: 105,
    height: 150,
    borderRadius: 5
  },
});