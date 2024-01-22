import { useCallback } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Colors from 'open-color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { RootStackNavigation } from '../../navigations/rootStack/types';
import useMovies from '../../hooks/useMovies';
import Movie from '../../components/movie';
import Separator from '../../components/separator';
import Loading from '../../components/loading';
import Screen from '../../components/screen';

const MoviesScreen = (): JSX.Element => {
  const { navigate } = useNavigation<RootStackNavigation<'MoviesScreen'>>();
  const { movies, isLoading, loadMore, refresh } = useMovies();

  const renderRightComponent = useCallback(() => {
    return (
      <HeaderRightComponent>
        <TouchableOpacity onPress={() => navigate('RemindersScreen')}>
          <AlarmIcon name="notifications" />
        </TouchableOpacity>
      </HeaderRightComponent>
    );
  }, [navigate]);

  return (
    <Screen renderRightComponent={renderRightComponent}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          indicatorStyle="white"
          data={movies}
          renderItem={({ item: movie }) => <Movie {...movie} />}
          ItemSeparatorComponent={() => <Separator space={14} />}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refresh}
              tintColor={Colors.white}
            />
          }
        />
      )}
    </Screen>
  );
};

export default MoviesScreen;

const HeaderRightComponent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AlarmIcon = styled(MaterialIcons)`
  font-size: 32px;
  color: ${Colors.white};
`;
