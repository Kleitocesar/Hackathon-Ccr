/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef, useCallback} from 'react';
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

import {useNavigation} from '@react-navigation/native';

import {useTheme} from 'react-native-paper';

const App = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const [routeQuery, setRouteQuery] = useState('Santa Cruz, Rio de Janeiro');
  const [autocompleteIsVisible, setAutocompleteIsVisible] = useState(false);
  const [placesIsLoading, setPlacesIsLoading] = useState(false);
  const [placesResults, setPlacesResult] = useState([]);

  const debounceRef = useRef();

  const searchAddress = useCallback(() => {
    setAutocompleteIsVisible(true);
    setPlacesIsLoading(true);

    if (debounceRef && debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (routeQuery) {
        getGooglePlaceSuggestion();
      }
    }, 30);
  }, []);

  const getGooglePlaceSuggestion = async () => {
    setPlacesIsLoading(true);

    const directionSuggestions = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD306b6xVDA5-oc-mgt9NOFBcQ1M3dWFUs&language=pt&input=${routeQuery}`,
    ).then((response) => response.json());

    const results = directionSuggestions.predictions.map((place) => ({
      street: place.description,
    }));

    setPlacesIsLoading(false);
    setPlacesResult(results);
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={'never'}
        contentContainerStyle={{flex: 1}}>
        <Appbar.Header>
          <Searchbar
            placeholder="Para onde?"
            icon="navigation"
            onChangeText={(text) => {
              setRouteQuery(text);
              searchAddress();
            }}
            value={routeQuery}
            style={{
              width: Dimensions.get('window').width - 70,
              marginLeft: 10,
              height: 40,
            }}
          />
          <TouchableOpacity onPress={() => searchAddress()}>
            <Appbar.Action
              icon="directions"
              color={'white'}
              size={30}
              style={{marginRight: -5}}
            />
          </TouchableOpacity>
        </Appbar.Header>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Card style={{margin: 10, marginRight: 5}}>
              <Card.Content>
                <TouchableOpacity
                  onPress={() => navigation.navigate('HealthCare')}
                  style={{width: '100%', alignItems: 'center'}}
                  hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
                  <Icon name="medical-bag" size={50} color="grey" />
                  <Title>Saúde</Title>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
          <View style={{flex: 1}}>
            <Card style={{margin: 10, marginLeft: 5}}>
              <Card.Content style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Benefits')}
                  style={{width: '100%', alignItems: 'center'}}
                  hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
                  <Icon name="trophy" size={50} color="grey" />
                  <Title>Benefícios</Title>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Card style={{margin: 10, marginRight: 5, marginTop: 5}}>
              <Card.Content style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Roads')}
                  style={{width: '100%', alignItems: 'center'}}
                  hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
                  <Icon name="road-variant" size={50} color="grey" />
                  <Title>Estradas</Title>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
          <View style={{flex: 1}}>
            <Card style={{margin: 10, marginLeft: 5, marginTop: 5}}>
              <Card.Content style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BackupHelp')}
                  style={{width: '100%', alignItems: 'center'}}
                  hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}>
                  <Icon name="human-greeting" size={50} color="grey" />
                  <Title>Apoio</Title>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>

      {autocompleteIsVisible && (
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 56,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onPress={() => setAutocompleteIsVisible(false)}
          />

          <View
            style={{
              backgroundColor: 'white',
              width: '93%',
              minHeight: 150,
              marginLeft: 15,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 53,
            }}>
            {placesIsLoading && (
              <ActivityIndicator size={'large'} color={colors.primary} />
            )}

            {!placesIsLoading && (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  padding: 10,
                }}>
                {placesResults.map((place, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{flex: 1}}
                      onPress={() => {
                        setRouteQuery(place.street);
                        setPlacesResult([]);
                        setAutocompleteIsVisible(false);
                        navigation.navigate('Map', {
                          place,
                        });
                      }}>
                      <Text style={{fontWeight: '600', fontSize: 16}}>
                        {place.street}
                      </Text>
                      <Text>{place.state}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </>
      )}
    </>
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

export default App;
