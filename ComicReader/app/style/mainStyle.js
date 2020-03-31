import {
  StyleSheet
} from 'react-native';

import Dimen from '../constant/dimission';

export let mainStyle = StyleSheet.create({

  conatiner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    flex: 1,
  },

  listview: {
    height: Dimen.window.height
  },

  banner: {
    width: Dimen.window.width,
    height: (Dimen.window.width - 120)
  },

  listitem: {
    alignItems: "center",
    flexDirection: 'row',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 0.5
  },

  itemimage: {
    margin: 10,
    width: 105,
    height: 70,
    borderRadius:5
  },

  item: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },

  itemcontent: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  des: {
    fontSize: 12
  },

  itemtitle: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },

  time: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 12
  },

  hintImg: {
    width: 50,
    height: 50
  },
})