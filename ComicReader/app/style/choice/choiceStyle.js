import {
  StyleSheet
} from 'react-native';
import window from '../../constant/dimission';

const itemWidth = (window.width - 40) / 2;

export let choiceStyle = StyleSheet.create({

  container: {
    flex: 1
  },

  item: {
    borderColor: '#ff9089',
    borderWidth: 1,
    flex: 1,
    height: 82,
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    textAlign: 'center'
  },

  img: {
    flex: 1,
    borderRadius: 6,
  },
});