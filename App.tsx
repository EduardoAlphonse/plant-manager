import React, { useEffect } from 'react';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import { PlantProps } from './src/libs/storage';

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (event) => {
      const data = event.request.content.data.plant as PlantProps;
      console.log(data);
    });

    return () => subscription.remove();

    // async function notifications() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();

    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('NOTIFICAÇÕES AGENDADAS');
    //   console.log(data);
    // }

    // notifications();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}