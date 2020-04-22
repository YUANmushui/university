import {
  StyleSheet
} from 'react-native';

import Dimen from '../../constant/dimission';

export let discoverStyle = StyleSheet.create({

  container: {
    flex: 1
  },

  listitem: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10,
  },

  img: {
    width: Dimen.window.width - 20,
    height: 200,
    borderRadius: 10
  },

  intro: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  
  arrow_down_up: {
    marginTop: 3,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ffa07a',
  }
}); 