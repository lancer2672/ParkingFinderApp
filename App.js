import Root from '@src/navigation/Root';
import ThemeProviderComponent from '@src/theme/context';
import { SafeAreaView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    
    
      
            <ThemeProviderComponent>
              <SafeAreaView style={{flex: 1}}>
                <Root></Root>
                <FlashMessage position="top" />
              </SafeAreaView>
            </ThemeProviderComponent>

    </GestureHandlerRootView>
  );
}

export default App;
