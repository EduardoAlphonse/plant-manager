import React from 'react';
import {
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{'\n'}
          suas plantas de{'\n'}
          forma fácil
        </Text>

        <Image
          source={wateringImg}
          style={styles.image}
          resizeMode='contain'
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigate('UserIdentification')}
        >
          <Feather
            name='chevron-right'
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 80,
    padding: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.body,
    paddingHorizontal: 20,
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: 56,
    height: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24,
  }
})