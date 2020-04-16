import React, { Component } from 'react';
import {
    StatusBar,
    SafeAreaView, 
    View, 
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';

import {main} from '../../action/mainAction';
import * as API from '../../constant/api';
import mainStyle from '../../style/mainStyle';

/**
 * 初始化状态
 */
let isLoading = true;
let isLoadMore = false;
let isRefreshing = false;
let isFirstLoad = true;

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
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d',
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

export default class MainContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  componentDidMount() {
    main(API.API_COMBIC_LIST, {}, isLoading, isLoadMore, isRefreshing);

  }

  render() {
    return (
        <View>
            <StatusBar backgroundColor="#00000000" translucent={true} />
            <SafeAreaView>
              <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                 />
            </SafeAreaView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});