import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import waterDropImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface WaterInfoCardProps {
  waterTip: string;
}

export function WaterInfoCard({ waterTip }: WaterInfoCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={waterDropImg}
        width={160}
        style={styles.waterDrop}
      />
      <Text style={styles.text}>
        {waterTip}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
    marginHorizontal: 32,
    height: 90,
  },
  waterDrop: {
    marginRight: 24,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 15,
    lineHeight: 23,
    color: colors.blue,
    flexShrink: 1,
  },
})