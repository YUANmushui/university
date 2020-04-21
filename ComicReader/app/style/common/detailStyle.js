import {
  StyleSheet
} from 'react-native';
import Dimen from '../../constant/dimission';

export let detailStyle = StyleSheet.create({

  img: {
    height: Dimen.window.height -165,
  },

  listview: {
    marginBottom: 100
  },

  barTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 15
  },
})