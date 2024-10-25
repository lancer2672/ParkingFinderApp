import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '@src/screens/Authentication/SignIn';
import SignUp from '@src/screens/Authentication/SignUp';
import { ROLE } from '@src/utils/constant';
import { useState } from 'react';
import { navigationRef } from './NavigationController';
import Onboarding from '@src/components/onboarding';
import SplashScreen from '@src/components/splash';
const screenOptions = {
  header: () => null,
  cardOverlayEnabled: true,
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  const username = null;
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={screenOptions}>
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
      initialRouteName="Tabs"
      screenOptions={{ presentation: 'card', ...screenOptions }}>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Root = () => {
  const [isLoading, setIsloading] = useState(false);

  const getStackByRole = role => {
    switch (role) {
      case ROLE.USER:
        return <Stack.Screen name="MainStack" component={MainStack} />;
      default:
        return <Stack.Screen name="MainStack" component={MainStack} />;
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
            name="AuthenticationStack"
            component={AuthenticationStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;