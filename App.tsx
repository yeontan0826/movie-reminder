import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigations/rootStack';

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
