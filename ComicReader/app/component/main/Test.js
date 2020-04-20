import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import StaticContainer from 'react-static-container';
import window from '../../constant/dimission';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3a',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91a',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e2',
    title: 'Third Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

var bannerImgs = [
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d6.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad61f.jpg',
  'http://imgs.juheapi.com/comic_xin/5559b86938f275fd560ad6d0.jpg',
];

function ListHeader({imgUri}) {
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
              backgroundColor: '#83ffcf',
              width: 10,
              height: 10,
              borderRadius: 4,
              marginLeft: 10,
              marginRight: 9,
              marginTop: 9,
              marginBottom: 4,
          }}/>}
      >
        <Image source={{ uri: imgUri[0] }} style={styles.banner} resizeMode={'contain'} />
        <Image source={{ uri: imgUri[1] }} style={styles.banner} resizeMode={'contain'} />
        <Image source={{ uri: imgUri[2] }} style={styles.banner} resizeMode={'contain'} />
      </Swiper>
    </StaticContainer>
  );
}

// 上拉时调用
function _onEndReached() {
  console.log('重新加载')
}

export default function Test() {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        style={styles.container}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}

        // horizontal={false}
        // numColumns={2}   // 这两个属性同时设置时，才能在一行显示两个漫画

        // 当离底部还剩onEndReachedThreshold时触发onEndReached回调
        // onEndReachedThreshold={0.1}
        // onEndReached={_onEndReached()}
        ListHeaderComponent={()=><ListHeader imgUri={bannerImgs}/>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 49,
    marginVertical: 8,
    marginHorizontal: 16,
    // width: 150
  },
  title: {
    fontSize:32,
  },
  wrapper: {
    height: 200
  }, 
  banner: {
    width: window.width,
    height: 200
  },
});
