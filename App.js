import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TabsNavigator from './src/navigation/TabsNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

SplashScreen.preventAutoHideAsync();

export default function App() {

  [categorySelected, setCategorySelected] = useState("consolas")
  const [loaded, error] = useFonts({
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-Light': require('./assets/fonts/Karla-Light.ttf'),
    'Karla-Italic': require('./assets/fonts/Karla-Italic.ttf'),
    'PressStart-Regular': require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <TabsNavigator />
    </Provider>

  );
}

