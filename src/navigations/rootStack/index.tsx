import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import MoviesScreen from '../../screens/movies';
import MovieScreen from '../../screens/movie';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="MoviesScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoviesScreen" component={MoviesScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
