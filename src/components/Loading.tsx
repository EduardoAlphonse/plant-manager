import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadingAnimation from '../assets/load.json';

export function Loading() {
  useEffect(() => {

  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        source={loadingAnimation}
        style={styles.animation}
        loop
        autoPlay
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    backgroundColor: 'transparent',
  },
})