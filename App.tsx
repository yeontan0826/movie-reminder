import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootStackNavigation from './src/navigations/rootStack';
import SubscriptionProvider from './src/components/provider/subscription';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <SubscriptionProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </SubscriptionProvider>
  );
};

export default App;
