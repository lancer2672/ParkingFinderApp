import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '@src/screens/Authentication/SignIn';
import SignUp from '@src/screens/Authentication/SignUp';
import ParkingLotsMap from '@src/screens/ParkingLot/ParkingLotMap';
import { ROLE } from '@src/utils/constant';
import { UserID_Key } from '@src/utils/localStorage';
import { useEffect, useState } from 'react';
import { navigationRef } from './NavigationController';
const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
};
const Stack = createNativeStackNavigator();
const AuthenticationStack = () => {
  const username = null;
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={screenOptions}>
      {username == null ? (
        <Stack.Group>
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
      initialRouteName={'ParkingLotMap'}
      screenOptions={{presentation: 'card', ...screenOptions}}>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name={'ParkingLotMap'} component={ParkingLotsMap} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
const Root = () => {
  const [isLoading, setIsloading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUsere = async () => {
      try {
        const userId = await AsyncStorage.getItem(UserID_Key);
        if( userId != null){
          setUserId(userId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUsere();
  }, []);

  const getStackByRole = role => {
    switch (role) {
      case ROLE.USER:
        return <Stack.Screen name={'MainStack'} component={MainStack} />;
      default:
        return <Stack.Screen name={'MainStack'} component={MainStack} />;
    }
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={screenOptions}>
        {false ? (
          getStackByRole(ROLE.USER)
        ) : (
          <Stack.Screen
            options={{
              animationTypeForReplace: true ? 'push' : 'pop',
            }}
            name={'AuthenticationStack'}
            component={AuthenticationStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
