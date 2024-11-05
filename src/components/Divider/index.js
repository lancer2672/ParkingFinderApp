import {StyleSheet, View} from 'react-native';

export default function Divider() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(166, 170, 180, 0.6)',
  },
});
