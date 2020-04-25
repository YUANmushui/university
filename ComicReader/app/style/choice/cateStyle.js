import {
  StyleSheet
} from 'react-native';

export let cateStyle = StyleSheet.create({

  barTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 15,
  },

  container: {
    flex: 1
  },

  comicTitle: {
    fontSize: 16,
    marginTop: 5,
    color: '#28292D',
    flex: 1,
    textAlign: 'center'
  },

  coverImg: {
    flex: 5,
    borderRadius: 10,
    width: 150
  },

  item: {
    flex: 1,
    height: 180,
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
});