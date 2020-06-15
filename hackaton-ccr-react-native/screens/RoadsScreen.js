/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Appbar, Searchbar, FAB, Card, Title, Button} from 'react-native-paper';

import {useTheme} from 'react-native-paper';

const RoadsScreen = ({headless, navigation, navigateTab, tabGoBack}) => {
  return (
    <View
      style={{
        flex: 1,
        padding: headless ? 10 : 0,
        paddingBottom: headless ? 0 : 50,
      }}>
      {!headless && (
        <Appbar.Header style={{elevation: 0}}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Estradas" />
        </Appbar.Header>
      )}
      {headless && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigateTab('map')}>
            <Icon
              name="arrow-left"
              size={30}
              color="black"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <Appbar.Content title="Estradas" color={'black'} />
        </View>
      )}
      <ScrollView keyboardShouldPersistTaps={'never'} style={{flex: 1}}>
        <Text>RoadsScreen</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default RoadsScreen;
