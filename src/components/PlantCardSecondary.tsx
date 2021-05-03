import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { format } from 'date-fns';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
  plant: {
    name: string;
    photo: string;
    dateTimeNotification: Date;

  }
}

export function PlantCardSecondary({
  plant,
  ...rest
}: PlantCardSecondaryProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <View style={styles.plant}>
        <SvgFromUri
          uri={plant.photo}
          width={40}
          height={40}
        />
        <Text
          style={styles.name}
        >
          {plant.name}
        </Text>
      </View>

      <View style={styles.time}>
        <Text style={styles.title}>
          Regar às
        </Text>
        <Text style={styles.hour}>
          {format(new Date(plant.dateTimeNotification), 'HH:mm')}
        </Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  plant: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.subheading,
    color: colors.body,
    fontSize: 17,
    lineHeight: 25,
    marginLeft: 25,
  },
  time: {
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.text,
    fontSize: 13,
    lineHeight: 20,
    color: colors.body_light,
  },
  hour: {
    fontFamily: fonts.subheading,
    fontSize: 13,
    lineHeight: 20,
    color: colors.body,
  },
})