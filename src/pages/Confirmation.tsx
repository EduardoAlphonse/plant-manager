import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.text}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title='Começar'
            onPress={() => navigate('Welcome')}
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