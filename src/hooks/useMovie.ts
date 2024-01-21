import { useCallback } from 'react';
import { useQuery } from 'react-query';

import { getMovieDetails } from '../modules/apiRequest';

interface UseMovieParams {
  id: number;
}

const useMovie = ({ id }: UseMovieParams) => {
  const getMovie = useCallback(() => getMovieDetails({ id }), [id]);

  const { data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: getMovie,
  });

  return {
    movie: data,
    isLoading,
  };
};

export default useMovie;
