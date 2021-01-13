import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {withRedux} from '../utils';

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'white',
  },
});

export default withRedux(HomeScreen);
