import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.title,
        active && styles.titleActive
      ]}>
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: 76,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginHorizontal: 2,
    backgroundColor: colors.shape,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  title: {
    fontSize: 13,
    lineHeight: 23,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
  },
  titleActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
})