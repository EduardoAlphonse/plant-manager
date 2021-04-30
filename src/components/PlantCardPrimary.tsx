import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps {
  plant: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({
  plant,
  ...rest
}: PlantCardPrimaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri
        uri={plant.photo}
        width={70}
        height={70}
      />
      <Text
        style={styles.name}
      >
        {plant.name}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    width: (Dimensions.get('screen').width / 2) - 32 - 8,
    height: 150,
  },
  name: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 13,
    lineHeight: 23,
    marginTop: 10,
  },
})