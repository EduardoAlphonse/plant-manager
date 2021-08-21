import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';
import { WaterInfoCard } from '../components/WaterInfoCard';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';

import { PlantProps, savePlant } from '../libs/storage';

interface PlantParams {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const { navigate } = useNavigation();

  const route = useRoute();
  const { plant } = route.params as PlantParams;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(!showDatePicker);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch {
      Alert.alert('Não foi possível salvar 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plant}>
          <SvgFromUri
            uri={plant.photo}
          />
          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.wateringDescription}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.wateringInfoContainer}>
          <WaterInfoCard waterTip={plant.water_tips} />
        </View>

        <View style={styles.clockContainer}>
          <Text style={styles.clockText}>
            Ecolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker &&
            <DateTimePicker
              value={selectedDateTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
            />
          }

          {
            Platform.OS === 'android' &&
            <TouchableOpacity
              onPress={() => setShowDatePicker(!showDatePicker)}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>
                {format(selectedDateTime, 'HH:mm')}''
              </Text>
            </TouchableOpacity>
          }

          <Button
            title='Cadastrar planta'
            onPress={handleSavePlant}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  plant: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 70,
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    marginTop: 32,
  },
  wateringDescription: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    color: colors.body,
    marginTop: 16,
  },
  wateringInfoContainer: {
    transform: [{ translateY: -45 }],
    marginBottom: -45,
  },
  clockContainer: {
    paddingHorizontal: 32,
    marginTop: 40,
  },
  clockText: {
    fontFamily: fonts.text,
    color: colors.body,
    fontSize: 13,
    lineHeight: 23,
    textAlign: 'center',
  },
  dateTimePickerButton: {
    backgroundColor: colors.shape,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  dateTimePickerText: {
    fontFamily: fonts.subheading,
    fontSize: 20,
    lineHeight: 25,
    color: colors.body,
  },
})