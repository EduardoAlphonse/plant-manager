import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert
} from 'react-native';
import { formatDistance } from 'date-fns';

import { Header } from '../components/Header';
import { WaterInfoCard } from '../components/WaterInfoCard';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Loading } from '../components/Loading';

import { loadPlants, PlantProps, removePlant } from '../libs/storage';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import ptBR from 'date-fns/esm/locale/pt-BR';

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😐',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setPlants(oldData =>
              oldData.filter(data => data.id !== plant.id)
            );

          } catch (error) {
            Alert.alert('Houve um erro ao tentar deletar a planta 😭');
          }
        },
        style: 'destructive',
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      try {
        const plantsStorage = await loadPlants();

        if (plantsStorage.length !== 0) {
          const timeInterval = formatDistance(
            new Date(plantsStorage[0].dateTimeNotification).getTime(),
            new Date().getTime(),
            { locale: ptBR }
          );

          setNextWatered(`Regue sua ${plantsStorage[0].name} em ${timeInterval}.`);
          setPlants(plantsStorage);
        }
      } catch {
        Alert.alert('Houve um erro ao carregar suas plantas 😥');
      }
    }

    setLoading(false);
    loadStorageData();
  }, []);

  if (loading)
    return <Loading />

  if (plants.length === 0)
    return (
      <View style={styles.noPlantsContainer}>
        <Text style={styles.title}>
          Não há plantas cadastradas.
        </Text>
      </View>
    )

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
            plant={item}
            handleRemove={() => handleRemove(item)}
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
    paddingRight: 32,
  },

  noPlantsContainer: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'space-between',
  },
})