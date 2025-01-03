import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FAQScreen from '@src/screens/FAQ/FAQ';
import Notification from '@src/screens/Notification/Notification';
import ParkingLotsMap from '@src/screens/ParkingLot/ParkingLotMap';
import UserProfile from '@src/screens/Profile/Profile';
import QrScan from '@src/screens/Security/QrScan';
import SettingView from '@src/screens/Setting/SettingView';
import Stats from '@src/screens/Stats/Stats';
import { Pressable, StyleSheet, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Material from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

const Tab = createBottomTabNavigator();

const CustomTabButton = ({children, onPress}) => (
  <Pressable
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
  </Pressable>
);

export const Tabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Navigation"
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
            return <Feather name="bell" size={24} color={color} />;
          } else if (route.name === 'FAQ') {
            return <AntDesign name="questioncircleo" size={24} color={color} />;
          } else if (route.name === 'Navigation') {
            return <Feather name="send" size={24} color="#ffffff" />;
          } else if (route.name === 'Wallet') {
            return  <Material size={28} color={color}  name="payment" />
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user" size={24} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="Wallet" component={SettingView} />
      <Tab.Screen name="Home" component={Notification} />
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
      <Tab.Screen name="Profile" component={UserProfile} />
        <Tab.Screen name="FAQ" component={FAQScreen} />
    </Tab.Navigator>
  );
};

export const StaffTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Stats"
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

          if (route.name === 'Stats') {
            return <Feather name="bar-chart" size={24} color={color} />;
          } else if (route.name === 'QrScan') {
            return <AntDesign name="qrcode" size={24} color="#ffffff" />;
          } else if (route.name === 'Profile') {
            return <FontAwesome name="user" size={24} color={color} />;
          }
        },
      })}>
      {/* <Tab.Screen name="Home" component={ParkingLotsMap} />
      <Tab.Screen name="Wallet" component={SecurityDashboard} /> */}
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen
        name="QrScan"
        component={QrScan}
        options={{
          // tabBarIcon: ({focused}) => (
          //   <AntDesign name="qrcode" size={24} color="#ffffff" />
          // ),
          tabBarButton: props => <CustomTabButton {...props} />,
        }}
      />
           <Tab.Screen name="Profile" component={UserProfile} />

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
