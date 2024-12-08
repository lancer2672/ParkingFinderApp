import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import userAPI from '@src/api/user.api';
import Onboarding from '@src/components/onboarding';
import SplashScreen from '@src/components/splash';
import SignIn from '@src/screens/Authentication/SignIn';
import SignUp from '@src/screens/Authentication/SignUp';
import ParkingHistory from '@src/screens/History/ParkingHistory';
import Notification from '@src/screens/Notification/Notification';
import Booking from '@src/screens/ParkingLot/components/Booking';
import QrcodeScreen from '@src/screens/ParkingLot/components/QrcodeScreen';
import ParkingLotsMap from '@src/screens/ParkingLot/ParkingLotMap';
import AddCardView from '@src/screens/Payment/AddCardView';
import Review from '@src/screens/Review/Review';
import QrScan from '@src/screens/Security/QrScan';
import RidesScreen from '@src/screens/Security/RidesScreen';
import SecurityDashboard from '@src/screens/Security/SecurityDashboard';
import SettingView from '@src/screens/Setting/SettingView';
import useUserStore from '@src/store/userStore';
import { ROLE } from '@src/utils/constant';
import { UserID_Key } from '@src/utils/localStorage';
import { useEffect, useState } from 'react';
import { navigationRef } from './NavigationController';
import { Tabs } from './NavigationTab';
const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  const username = null;
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={screenOptions}>
      {username == null ? (
        <Stack.Group>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name={'SignUp'} component={SignUp} />
          <Stack.Screen name={'SignIn'} component={SignIn} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Tabs'}
      screenOptions={{presentation: 'card', ...screenOptions}}>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name={'Tabs'} component={Tabs} />
        <Stack.Screen name={'ParkingLotMap'} component={ParkingLotsMap} />
        <Stack.Screen name={'Review'} component={Review} />
        <Stack.Screen name={'Booking'} component={Booking} />
        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'ParkingHistory'} component={ParkingHistory} />
        <Stack.Screen name={'AddCardView'} component={AddCardView} />
        <Stack.Screen name={'SettingView'} component={SettingView} />
        <Stack.Screen name={'QrcodeScreen'} component={QrcodeScreen} />
        <Stack.Screen name={'RidesScreen'} component={RidesScreen} />
        <Stack.Screen name={'SecurityDashboard'} component={SecurityDashboard} />
        <Stack.Screen name={'QrScan'} component={QrScan} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const StaffStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'QrScan'}
      screenOptions={{presentation: 'card', ...screenOptions}}>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name={'Tabs'} component={Tabs} />
        <Stack.Screen name={'Notification'} component={Notification} />
        <Stack.Screen name={'SettingView'} component={SettingView} />
        <Stack.Screen name={'QrcodeScreen'} component={QrcodeScreen} />
        <Stack.Screen name={'RidesScreen'} component={RidesScreen} />
        <Stack.Screen name={'SecurityDashboard'} component={SecurityDashboard} />
        <Stack.Screen name={'QrScan'} component={QrScan} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const Root = () => {
  const [isLoading, setIsloading] = useState(false);
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem(UserID_Key);
        if (userId != null) {
          userRes = await userAPI.getUserByID(userId);
          const role = userRes.role.name
          console.log('userRes', userRes);
          setUser({...userRes,role});
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUser();
  }, []);

  const getMainStackByUserRole = (user) => {
      if (user.role === ROLE.USER) {
        return <MainStack />;
      } else{
        return <StaffStack />;
      }
      
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={screenOptions}>
        {user?.phoneNumber ? (
          user.role  === ROLE.USER ? (
            <Stack.Screen name="MainStack"  component={MainStack}/>
          ) : (
            <Stack.Screen name="StaffStack" component={StaffStack} />
          )
        ) : (
          <Stack.Screen
            options={{
              animationTypeForReplace: true ? 'push' : 'pop',
            }}
            name="AuthenticationStack"
            component={AuthenticationStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
