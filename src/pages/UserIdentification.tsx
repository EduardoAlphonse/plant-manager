import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const { navigate } = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [username, setUsername] = useState<string>();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!username);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setUsername(value);
  }

  async function handleSubmit() {
    if (!username)
      return Alert.alert('Me diga como chamar você 🤔');

    await AsyncStorage.setItem('@plantmanager:username', username);

    navigate('Confirmation');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Text style={styles.emoji}>
              {isFilled ? '🌿' : '🌱'}
            </Text>

            <Text style={styles.title}>
              Como podemos{'\n'}
                chamar você?
              </Text>

            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green }
              ]}
              placeholder='Digite seu nome'
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />

            <View style={styles.buttonContainer}>
              <Button
                title='Confirmar'
                onPress={handleSubmit}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    fontFamily: fonts.text,
    color: colors.body,
    width: '100%',
    fontSize: 17,
    lineHeight: 23,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  }
})