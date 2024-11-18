import Root from '@src/navigation/Root';
import ThemeProviderComponent from '@src/theme/context';
import { SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider>
            <ThemeProviderComponent>
              <SafeAreaView style={{flex: 1}}>
                <Root></Root>
                <FlashMessage position="top" />
              </SafeAreaView>
            </ThemeProviderComponent>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
