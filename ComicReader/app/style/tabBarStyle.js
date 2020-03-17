import {
  StyleSheet
} from 'react-native';

export let tabBarStyle = StyleSheet.create({
  
  container: {
    flexDirection: 'column',
    height: 50,
  },

  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})