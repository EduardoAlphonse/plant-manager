import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😁',
  hug: '🤗',
}

export function Confirmation() {
  const { navigate } = useNavigation();
  const route = useRoute();
  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = route.params as ConfirmationParams;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.text}>
          {subtitle}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title={buttonTitle}
            onPress={() => navigate(nextScreen)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 30,
    marginTop: 64,
    color: colors.heading,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 16,
    color: colors.body,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
})