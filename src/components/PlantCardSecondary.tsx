import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { format } from 'date-fns';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecondaryProps extends RectButtonProps {
  plant: {
    name: string;
    photo: string;
    hour: string;
    dateTimeNotification: Date;
  }
  handleRemove: () => void;
}

export function PlantCardSecondary({
  plant,
  handleRemove,
  ...rest
}: PlantCardSecondaryProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name='trash' size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
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
    </Swipeable>
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
  buttonRemove: {
    backgroundColor: colors.red,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80 + 40,
    marginLeft: -40,
    paddingLeft: 40,
    height: '100%',
    marginBottom: -16,
  },
})