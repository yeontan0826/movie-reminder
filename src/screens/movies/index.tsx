import { FlatList, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from 'open-color';

import useMovies from '../../hooks/useMovies';
import Movie from '../../components/movie';
import Separator from '../../components/separator';
import Loading from '../../components/loading';

const MoviesScreen = (): JSX.Element => {
  const { movies, isLoading, loadMore, refresh } = useMovies();

  return (
    <Container>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.black} />
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
    </Container>
  );
};

export default MoviesScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.black};
`;
