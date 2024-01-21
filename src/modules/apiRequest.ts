import axios from 'axios';
import moment from 'moment';

import { Movie } from '../@types/movie';

const API_KEY = '537ab8136eb1cbbc050768c9fc13f635';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getImageUrl = (path: string) => `${IMG_BASE_URL}${path}`;

/**
 * api 요청에 있어서 공통된 기본 주소 및 파라미터
 */
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

interface MovieResponse {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

interface getDiscoverMoviesResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}

interface GetDiscoverMoviesParams {
  releaseDateGte?: string;
  releaseDateLte?: string;
  page?: number;
}

/**
 * API - 영화 목록 가져오기
 *
 * @param { GetDiscoverMoviesParams } params 영화 목록 조회 파라미터
 * @param { string } params.releaseDateGte 개봉 예정 기간 시작날
 * @param { string } params.releaseDateLte 개봉 예정 기간 마지막날
 * @param { number= } params.page 목록 페이지
 * @returns
 */
export const getDiscoverMovies = async ({
  releaseDateGte,
  releaseDateLte,
  page,
}: GetDiscoverMoviesParams) => {
  // 개봉 예정 영화
  const response = await instance.get<getDiscoverMoviesResponse>(
    'discover/movie',
    {
      params: {
        ['release_date.gte']: releaseDateGte,
        ['release_date.lte']: releaseDateLte,
        region: 'KR',
        page,
      },
    },
  );

  /**
   * response된 data를 가공
   */
  const movies: Movie[] = response.data.results.map<Movie>(r => ({
    id: r.id,
    title: r.title,
    originalTitle: r.original_title,
    releaseDate: r.release_date,
    overview: r.overview,
    posterUrl: getImageUrl(r.poster_path),
  }));

  return {
    page: response.data.page,
    results: movies,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  };
};

interface GetMovieDetailsParams {
  id: number;
}

interface GetCreditsResponse {
  cast: {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
  }[];
  crew: {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    job: string;
  }[];
}

interface GetVideosResponse {
  results: {
    name: string;
    key: string;
    site: string;
    type: string;
    id: string;
  }[];
}

interface GetReleaseDatesResponse {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      iso_639_1: string;
      release_date: string;
      type: number;
      note: string;
    }[];
  }[];
}

interface GetMovieResponse {
  id: number;
  genres: {
    id: number;
    name: string;
  };
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  credits: GetCreditsResponse;
  videos: GetVideosResponse;
  release_dates: GetReleaseDatesResponse;
}
/**
 * API - 영화 정보 가져오기
 *
 * @param { GetMovieDetailsParams } movie 영화 조회 파라미터
 * @param { number } movie.id 영화 id
 */

export const getMovieDetails = async ({ id }: GetMovieDetailsParams) => {
  const { data: movie } = await instance.get<GetMovieResponse>(`movie/${id}`, {
    params: {
      append_to_response: 'credits,videos,release_dates',
    },
  });

  const releaseDate = (() => {
    const releaseDateKR = movie.release_dates.results.find(
      r => r.iso_3166_1 === 'KR',
    )?.release_dates[0].release_date;

    if (releaseDateKR !== undefined) {
      return moment(releaseDateKR).format('YYYY-MM-DD');
    }
    return movie.release_date;
  })();

  return {
    id: movie.id,
    genres: movie.genres,
    title: movie.title,
    original_title: movie.original_title,
    overview: movie.overview,
    posterUrl: getImageUrl(movie.poster_path),
    releaseDate,
    runtime: movie.runtime,
    casts: movie.credits.cast.map(cast => ({
      id: cast.id,
      knownForDepartment: cast.known_for_department,
      name: cast.name,
      profileUrl: getImageUrl(cast.profile_path),
      character: cast.character,
    })),
    crews: movie.credits.crew.map(crew => ({
      id: crew.id,
      knownForDepartment: crew.known_for_department,
      name: crew.name,
      profileUrl: getImageUrl(crew.profile_path),
      job: crew.job,
    })),
    videos: movie.videos.results.map(video => ({
      name: video.name,
      key: video.key,
      site: video.site,
      type: video.type,
      id: video.id,
    })),
  };
};
