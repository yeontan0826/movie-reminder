import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MoviesScreen: undefined;
};

export type RootStackNavigation<RouteName extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;
