import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelection } from '../pages/PlantSelection';
import { PlantSave } from '../pages/PlantSave';

import colors from '../styles/colors';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
      gestureDirection: 'horizontal'
    }}
  >
    {/* <StackRoutes.Screen
      name='Welcome'
      component={Welcome}
    />
    <StackRoutes.Screen
      name='UserIdentification'
      component={UserIdentification}
    />
    <StackRoutes.Screen
      name='Confirmation'
      component={Confirmation}
    /> */}
    <StackRoutes.Screen
      name='PlantSelection'
      component={PlantSelection}
    />
    <StackRoutes.Screen
      name='PlantSave'
      component={PlantSave}
    />
  </StackRoutes.Navigator>
)

export default AppRoutes;