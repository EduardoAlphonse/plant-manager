import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import { formatDistance } from 'date-fns';

import { Header } from '../components/Header';
import { WaterInfoCard } from '../components/WaterInfoCard';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import { loadPlants, PlantProps } from '../libs/storage';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import ptBR from 'date-fns/esm/locale/pt-BR';

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlants();

      const timeInterval = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      );

      setNextWatered(`Regue sua ${plantsStorage[0].name} em ${timeInterval}.`);

      setPlants(plantsStorage);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <WaterInfoCard waterTip={nextWatered ? nextWatered : ''} />

      <Text style={styles.title}>
        Próximas regadas
      </Text>

      <FlatList
        data={plants}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PlantCardSecondary
            plant={{
              name: item.name,
              photo: item.photo,
              dateTimeNotification: item.dateTimeNotification,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.plantCardsContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: colors.white,
  },
  title: {
    marginTop: 40,
    marginBottom: 16,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    paddingHorizontal: 32,
  },
  plantCardsContainer: {
    paddingHorizontal: 32,
  },
})