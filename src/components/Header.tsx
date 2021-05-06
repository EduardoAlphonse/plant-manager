import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { getGithubUser } from '../services/getGithubUser';

import profilePhoto from '../assets/avatar.jpg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface UserData {
  name: string;
  // avatar: string;
}

export function Header() {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    async function getUserFromLocalStorage() {
      const username = await AsyncStorage.getItem('@plantmanager:username');
      setUser({
        name: username || '',
        // avatar: 'https://avatars.githubusercontent.com/u/43072438?v=4',
      });
    }

    getUserFromLocalStorage();
  }, []);

  // useEffect(() => {
  //   async function getAndSetUser(username: string) {
  //     const userData = await getGithubUser(username);
  //     setUser(userData);
  //   }

  //   getAndSetUser(username);
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.text}>Olá,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>

        <Image source={profilePhoto} style={styles.avatar} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {

  },
  text: {
    fontFamily: fonts.text,
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
  },
  name: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
})