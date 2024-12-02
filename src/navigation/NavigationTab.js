import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';

import ParkingLotsMap from '@src/screens/ParkingLot/ParkingLotMap';
import SettingView from '@src/screens/Setting/SettingView';

const Tab = createBottomTabNavigator();

const CustomTabButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#4A55A2',
        ...styles.shadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

export const Tabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = focused ? '#4A55A2' : '#748c94';

          if (route.name === 'Home') {
            return <Feather name="home" size={24} color={color} />;
          } else if (route.name === 'Wallet') {
            return <Feather name="folder" size={24} color={color} />;
          } else if (route.name === 'Navigation') {
            return <Feather name="send" size={24} color="#ffffff" />;
          } else if (route.name === 'Settings') {
            return <Feather name="settings" size={24} color={color} />;
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user" size={24} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={ParkingLotsMap} />
      <Tab.Screen name="Wallet" component={ParkingLotsMap} />
      <Tab.Screen
        name="Navigation"
        component={ParkingLotsMap}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather name="send" size={24} color="#ffffff" />
          ),
          tabBarButton: props => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen name="Settings" component={SettingView} />
      <Tab.Screen name="Profile" component={ParkingLotsMap} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
