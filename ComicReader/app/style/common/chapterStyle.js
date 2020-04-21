import {
  StyleSheet
} from 'react-native';

import Dimen from '../../constant/dimission';

export let chapterStyle = StyleSheet.create({

  itemContainer: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },

  itemText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    marginLeft: 10,
  },

  skipImg: {
    marginRight: 10
  },

  infoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 2,
    flexDirection: 'row',
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
    marginHorizontal: 3,
    marginVertical: 5
  },

  introContain: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc'
  },

  flatlist: {
    marginBottom: 55,
  },

  startRead: {
    color: '#fff',
    fontSize: 20
  },

})