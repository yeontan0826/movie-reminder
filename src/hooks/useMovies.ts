import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import moment from 'moment';

import { Movie } from '../@types/movie';
import { getDiscoverMovies } from '../modules/apiRequest';

const useMovies = () => {
  /**
   * api request - 1년 안에 개봉할 영화 목록
   */
  const getUpComingMovies = useCallback(async ({ pageParam = 1 }) => {
    const result = await getDiscoverMovies({
      releaseDateGte: moment().format('YYYY-MM-DD'), // 현재 날짜
      releaseDateLte: moment().add(1, 'years').format('YYYY-MM-DD'), // 현재 날짜 기준 1년 뒤
      page: pageParam,
    });
    return result;
  }, []);

  /**
   * 개봉예정 영화 목록 가져오기 쿼리(무한 스크롤을 위해 InfiniteQuery 사용)
   */
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['upcoming-movies'],
      queryFn: getUpComingMovies,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  /**
   * 무한 스크롤을 통해 가져온 목록을 기존 목록에 병합
   */
  const movies = useMemo(() => {
    return data?.pages.reduce<Movie[]>((allMovies, page) => {
      return allMovies.concat(page.results);
    }, []);
  }, [data?.pages]);

  /**
   * 목록 더 가져오기
   */
  const loadMore = useCallback(() => {
    if (hasNextPage) {
      // 다음 목록이 존재한다면, 목록 가져오기
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  /**
   * 새로고침
   */
  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    movies,
    isLoading,
    loadMore,
    refresh,
  };
};

export default useMovies;
