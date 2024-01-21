import { FlatList, RefreshControl } from 'react-native';
import Colors from 'open-color';

import useMovies from '../../hooks/useMovies';
import Movie from '../../components/movie';
import Separator from '../../components/separator';
import Loading from '../../components/loading';
import Screen from '../../components/screen';

const MoviesScreen = (): JSX.Element => {
  const { movies, isLoading, loadMore, refresh } = useMovies();

  return (
    <Screen headerVisible={false}>
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
