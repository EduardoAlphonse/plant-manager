import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Loading } from '../components/Loading';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Environment {
  key: string;
  title: string;
}

interface Plant {
  id: 1,
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelection() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { navigate } = useNavigation();

  function handleEnvironmentSelection(environmentKey: string) {
    setSelectedEnvironment(environmentKey);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    getPlants();
  }

  function handlePlantSelection(plant: Plant) {
    navigate('PlantSave', { plant });
  }

  async function getPlants() {
    const { data } = await api.get(`plants?_sort=name&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true);

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
    setPage(oldValue => oldValue + 1);
  }

  useEffect(() => {
    async function getEnvironments() {
      const { data } = await api.get('plants_environments?_sort=title');
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }

    getEnvironments();
  }, []);

  useEffect(() => {
    getPlants();
  }, []);

  useEffect(() => {
    if (selectedEnvironment === 'all')
      return setFilteredPlants(plants);

    const filtered = plants?.filter(plant => {
      return plant.environments.includes(selectedEnvironment);
    });

    setFilteredPlants(filtered);
  }, [selectedEnvironment]);

  if (loading)
    return <Loading />

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.strong}>Em qual ambiente</Text>
      <Text style={styles.text}>você quer colocar sua planta?</Text>
      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === selectedEnvironment}
              onPress={() => handleEnvironmentSelection(item.key)}
            />
          )}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plantsListContainer}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary
              plant={item}
              onPress={() => handlePlantSelection(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.plantsList}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadingMore
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
  },
  strong: {
    fontFamily: fonts.subheading,
    fontSize: 17,
    lineHeight: 23,
    color: colors.body,
    paddingHorizontal: 32,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 23,
    color: colors.body,
    paddingHorizontal: 32,
  },
  environmentList: {
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 32 - 2,
    paddingBottom: 5,
  },
  plantsListContainer: {
    flex: 1,
  },
  plantsList: {
    flexGrow: 1,
    paddingHorizontal: 32 - 8,
  },
})