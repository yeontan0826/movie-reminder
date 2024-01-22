import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import LoadingScreen from '../../screens/loading';
import MoviesScreen from '../../screens/movies';
import MovieScreen from '../../screens/movie';
import RemindersScreen from '../../screens/reminders';
import PurchaseScreen from '../../screens/purchase';
import useCodePush from '../../hooks/useCodePush';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = (): JSX.Element => {
  const { updating, progress } = useCodePush();

  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{ headerShown: false }}>
      {updating ? (
        <Stack.Screen name="LoadingScreen">
          {props => (
            <LoadingScreen
              {...props}
              progress={
                progress !== undefined
                  ? {
                      total: progress.totalBytes,
                      now: progress.receivedBytes,
                    }
                  : undefined
              }
            />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
          <Stack.Screen name="MovieScreen" component={MovieScreen} />
          <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
          <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
