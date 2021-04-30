import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getGithubUser } from '../services/getGithubUser';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface UserData {
  name: string;
  avatar: string;
}

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    async function getAndSetUser(username: string) {
      const userData = await getGithubUser(username);
      setUser(userData);
    }

    getAndSetUser(username);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.text}>Olá,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>

        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
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