import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MoviesScreen: undefined;
  MovieScreen: {
    id: number;
  };
  RemindersScreen: undefined;
};

export type RootStackNavigation<RouteName extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;

export type RootStackRoute<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
