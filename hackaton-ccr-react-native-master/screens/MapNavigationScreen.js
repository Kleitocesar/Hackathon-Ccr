/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useCallback, useEffect} from 'react';
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
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Appbar, Searchbar, FAB, Card, Title, Button} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {useTheme} from 'react-native-paper';

import HealthCareScreen from './HealthCareScreen';
import BenefitsScreen from './BenefitsScreen';
import RoadsScreen from './RoadsScreen';
import BackupHelpScreen from './BackupHelpScreen';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Geocoder from 'react-native-geocoding';

import Geolocation from '@react-native-community/geolocation';

const MapNavigationScreen = (props) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyD306b6xVDA5-oc-mgt9NOFBcQ1M3dWFUs';

  const mapRef = useRef();
  const {colors} = useTheme();
  const [routeQuery, setRouteQuery] = useState(props.route.params.place.street);
  const [autocompleteIsVisible, setAutocompleteIsVisible] = useState(false);
  const [placesIsLoading, setPlacesIsLoading] = useState(false);
  const [placesResults, setPlacesResult] = useState([]);

  const [activeScreen, setActiveScreen] = useState('map');
  const [activeTab, setActiveTab] = useState('map');
  const [navigationStack, setNavigationStack] = useState({map: ['map']});

  const [userLocation, setUserLocation] = useState({
    latitude: -18.2638734,
    longitude: -39.6490737,
  });

  const [destineLocation, setDestineLocation] = useState({
    latitude: -23.5162445,
    longitude: -46.5642456,
  });

  const tabNavigate = (tab, route) => {
    setActiveTab(tab);

    const newStack = {...navigationStack};

    if (!newStack[tab]) {
      newStack[tab] = [];
    }

    if (!route && newStack[tab].length === 0) {
      newStack[tab] = [tab];
    }

    if (route) {
      newStack[tab] = [...newStack[tab], route];
    }

    setNavigationStack(newStack);

    setActiveScreen(newStack[tab][newStack[tab].length - 1]);
  };

  const tabGoBack = () => {
    const newStack = navigationStack.filter(
      (i, index) => index < navigationStack.length - 1,
    );
    setNavigationStack(newStack);
    setActiveScreen(newStack[newStack.length - 1]);
  };

  const debounceRef = useRef();

  const searchAddress = (text) => {
    setAutocompleteIsVisible(true);

    if (debounceRef && debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (routeQuery) {
        getGooglePlaceSuggestion(text);
      }
    }, 30);
  };

  const getGooglePlaceSuggestion = async (text) => {
    setPlacesIsLoading(true);

    const directionSuggestions = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_APIKEY}&language=pt&input=${
        text || routeQuery
      }`,
    ).then((response) => response.json());

    const results = directionSuggestions.predictions.map((place) => ({
      street: place.description,
    }));

    setPlacesIsLoading(false);
    setPlacesResult(results);
  };

  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    geocodeAddress(routeQuery);
    watchUserPosition();
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const watchUserPosition = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    Geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        if (mapRef.current) {
          const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
          const circumference = (40075 / 360) * 1000;

          const latDelta =
            50 *
            (1 / (Math.cos(parseFloat(pos.coords.latitude)) * circumference));
          const lonDelta = 50 / oneDegreeOfLongitudeInMeters;

          // mapRef.current.animateToRegion({
          //   latitude: parseFloat(pos.coords.latitude),
          //   longitude: parseFloat(pos.coords.longitude),
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // });

          mapRef.current.fitToCoordinates([destineLocation, userLocation], {
            edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
            animated: false,
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };

  const selectPlace = (place) => {
    setRouteQuery(place.street);
    setPlacesResult([]);
    setAutocompleteIsVisible(false);
    geocodeAddress(place.street);
  };

  const geocodeAddress = async (address) => {
    const geocodeResult = await Geocoder.from(address);

    setDestineLocation({
      latitude: geocodeResult.results[0].geometry.location.lat,
      longitude: geocodeResult.results[0].geometry.location.lng,
    });

    mapRef.current.fitToCoordinates(
      [
        {
          latitude: geocodeResult.results[0].geometry.location.lat,
          longitude: geocodeResult.results[0].geometry.location.lng,
        },
        userLocation,
      ],
      {
        edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
        animated: false,
      },
    );
  };

  return (
    <View style={{flex: 1, paddingBottom: 50}}>
      <Appbar.Header style={{elevation: 0}}>
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            marginLeft: 10,
            marginRight: 15,
            fontSize: 16,
          }}>
          De
        </Text>
        <Searchbar
          placeholder="Minha localização"
          icon="near-me"
          style={{
            width: Dimensions.get('window').width - 100,
            height: 40,
          }}
          clearIcon={null}
          editable={false}
        />
      </Appbar.Header>
      <View
        style={{
          height: 55,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            marginLeft: 10,
            marginRight: 14,
            fontSize: 16,
          }}>
          Até
        </Text>
        <Searchbar
          placeholder="Para onde?"
          icon="navigation"
          onChangeText={(text) => {
            setRouteQuery(text);
            searchAddress(text);
          }}
          value={routeQuery}
          style={{
            width: Dimensions.get('window').width - 100,
            height: 40,
          }}
        />
        <TouchableOpacity onPress={() => searchAddress()}>
          <Appbar.Action
            icon="directions"
            color={'white'}
            size={30}
            style={{marginLeft: 3}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          opacity: activeTab === 'map' && activeScreen === 'map' ? 1 : 0,
          position:
            activeTab === 'map' && activeScreen === 'map'
              ? 'relative'
              : 'absolute',
        }}>
        <MapView
          style={{flex: 1}}
          loadingEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            identifier="Destination"
            coordinate={destineLocation}
            pinColor={`red`}
          />
          <MapViewDirections
            origin={userLocation}
            destination={destineLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={colors.primary}
          />
        </MapView>
      </View>

      <View
        style={{
          flex: 1,
          opacity: activeTab === 'Roads' && activeScreen === 'Roads' ? 1 : 0,
          position:
            activeTab === 'Roads' && activeScreen === 'Roads'
              ? 'relative'
              : 'absolute',
        }}>
        <RoadsScreen
          headless={true}
          navigateTab={tabNavigate}
          tabGoBack={tabGoBack}
        />
      </View>

      <View
        style={{
          flex: 1,
          opacity:
            activeTab === 'HealthCare' && activeScreen === 'HealthCare' ? 1 : 0,
          position:
            activeTab === 'HealthCare' && activeScreen === 'HealthCare'
              ? 'relative'
              : 'absolute',
        }}>
        <HealthCareScreen
          headless={true}
          navigateTab={tabNavigate}
          tabGoBack={tabGoBack}
        />
      </View>

      <View
        style={{
          flex: 1,
          opacity:
            activeTab === 'Benefits' && activeScreen === 'Benefits' ? 1 : 0,
          position:
            activeTab === 'Benefits' && activeScreen === 'Benefits'
              ? 'relative'
              : 'absolute',
        }}>
        <BenefitsScreen
          headless={true}
          navigateTab={tabNavigate}
          tabGoBack={tabGoBack}
        />
      </View>

      <View
        style={{
          flex: 1,
          opacity:
            activeTab === 'BackupHelp' && activeScreen === 'BackupHelp' ? 1 : 0,
          position:
            activeTab === 'BackupHelp' && activeScreen === 'BackupHelp'
              ? 'relative'
              : 'absolute',
        }}>
        <BackupHelpScreen
          headless={true}
          navigateTab={tabNavigate}
          tabGoBack={tabGoBack}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          backgroundColor: '#e3e3e3',
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderTopColor: 'rgba(0,0,0,0.2)',
          borderTopWidth: 1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => tabNavigate('Roads')}
            style={{
              marginHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="road-variant"
              size={24}
              color={activeTab === 'Roads' ? colors.primary : 'grey'}
            />
            <Text
              style={{color: activeTab === 'Roads' ? colors.primary : 'grey'}}>
              Estradas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => tabNavigate('HealthCare')}
            style={{
              marginHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="medical-bag"
              size={24}
              color={activeTab === 'HealthCare' ? colors.primary : 'grey'}
            />
            <Text
              style={{
                color: activeTab === 'HealthCare' ? colors.primary : 'grey',
              }}>
              Saúde
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            elevation: 8,
            backgroundColor: '#FF1300',
            marginTop: -30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="car-brake-alert" size={40} color="white" />
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => tabNavigate('Benefits')}
            style={{
              marginHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="trophy"
              size={24}
              color={activeTab === 'Benefits' ? colors.primary : 'grey'}
            />
            <Text
              style={{
                color: activeTab === 'Benefits' ? colors.primary : 'grey',
              }}>
              Benefícios
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => tabNavigate('BackupHelp')}
            style={{
              marginHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="human-greeting"
              size={24}
              color={activeTab === 'BackupHelp' ? colors.primary : 'grey'}
            />
            <Text
              style={{
                color: activeTab === 'BackupHelp' ? colors.primary : 'grey',
              }}>
              Apoio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {autocompleteIsVisible && (
        <>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 110,
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
              width: '85%',
              minHeight: 150,
              marginLeft: 49,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 107,
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
                      onPress={() => selectPlace(place)}>
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

export default MapNavigationScreen;
