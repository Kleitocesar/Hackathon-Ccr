import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, SafeAreaView, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MapNavigationScreen from './screens/MapNavigationScreen';

import HealthCareScreen from './screens/HealthCareScreen';
import BenefitsScreen from './screens/BenefitsScreen';
import RoadsScreen from './screens/RoadsScreen';
import BackupHelpScreen from './screens/BackupHelpScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFC107',
  },
};

export default function Main() {
  const MainStack = createStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainStack.Navigator headerMode={'none'}>
            <MainStack.Screen name="Home" component={App} />
            <MainStack.Screen name="Map" component={MapNavigationScreen} />
            <MainStack.Screen name="HealthCare" component={HealthCareScreen} />
            <MainStack.Screen name="Benefits" component={BenefitsScreen} />
            <MainStack.Screen name="Roads" component={RoadsScreen} />
            <MainStack.Screen name="BackupHelp" component={BackupHelpScreen} />
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
