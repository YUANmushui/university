import {
  StyleSheet
} from 'react-native';

import Dimen from '../constant/dimission';

export let chapterStyle = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },

  itemContainer: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center'
  },

  listView: {
    height: Dimen.window.height
  },

  item: {
    height: 50,
    flexDirection: 'column'
  },

  skipImg: {
    marginRight: 20
  },

  underLine: {
    height: 0.5,
    backgroundColor: "#E6E6E6",
    marginLeft: 10,
    marginRight: 10
  },


  infoContainer: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 2,
    flexDirection: 'row',
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
    height: 200,
  },

  coverimg: {
    flex: 2,
    resizeMode: 'contain',
    borderRadius: 15,
  },

  infoRight: {
    flex: 3,
    marginLeft: 20
  },

  titleContain: {
    alignItems: 'center',
    marginBottom: 60
  },

  title: {
    fontSize: 20,
  },

  infoBottom: {
    justifyContent: 'flex-start'
  },

  auth: {
    backgroundColor: '#00bfff',
    borderRadius: 10,
    color: '#fff',
    marginBottom: 10
  },

  status: {
    backgroundColor: '#3cb371',
    borderRadius: 10,
    marginBottom: 10,
    color: '#fff'
  },

  category: {
    backgroundColor: '#ff6347',
    borderRadius: 10,
    color: '#fff'
  },

  introduction: {
    borderBottomColor: '#ddd',
    color: '#999',
    marginHorizontal: 3
  },

})