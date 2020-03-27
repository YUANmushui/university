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
})