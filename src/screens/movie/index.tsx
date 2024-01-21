import { Fragment, useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import Colors from 'open-color';

import { RootStackRoute } from '../../navigations/rootStack/types';
import Screen from '../../components/screen';
import useMovie from '../../hooks/useMovie';
import Loading from '../../components/loading';
import MovieSection from '../../components/movieSection';
import MoviePeople from '../../components/moviePeople';
import Separator from '../../components/separator';
import YoutubeVideo from '../../components/youtubeVideo';

const MovieScreen = (): JSX.Element => {
  const {
    params: { id },
  } = useRoute<RootStackRoute<'MovieScreen'>>();

  const { movie, isLoading } = useMovie({ id });

  const renderMovie = useCallback<() => JSX.Element>(() => {
    if (movie === undefined) {
      return <></>;
    }

    const {
      posterUrl,
      title,
      original_title,
      releaseDate,
      overview,
      crews,
      casts,
      videos,
    } = movie;

    const director = crews.find(crew => crew.job === 'Director');
    const youtubeVideos = videos.filter(video => video.site === 'YouTube');

    return (
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TitleSection>
          {/* 포스터 */}
          <Poster source={{ uri: posterUrl }} />
          <InfoContainer>
            {/* 영화 제목 */}
            <TitleContainer>
              <Title>{title}</Title>
              <OriginalTitle>{original_title}</OriginalTitle>
            </TitleContainer>
            {/* 개봉일 */}
            <ReleaseDate>{releaseDate}</ReleaseDate>
          </InfoContainer>
        </TitleSection>
        {/* 소개 */}
        <MovieSection title="소개">
          <Overview>{overview}</Overview>
        </MovieSection>
        {/* 감독 */}
        {director !== undefined && (
          <MovieSection title="감독">
            <MoviePeople
              name={director.name}
              photoUrl={director.profileUrl}
              description={director.job}
            />
          </MovieSection>
        )}
        {/* 배우 */}
        <MovieSection title="배우">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={casts}
            renderItem={({ item: cast }) => (
              <MoviePeople
                name={cast.name}
                description={cast.character}
                photoUrl={cast.profileUrl}
              />
            )}
            ItemSeparatorComponent={() => <Separator horizontal space={12} />}
          />
        </MovieSection>
        {/* 관련 영상 */}
        {youtubeVideos.length !== 0 && (
          <MovieSection title="관련 영상">
            {youtubeVideos.map((video, index) => (
              <Fragment key={`video-${video.id}}`}>
                {index !== 0 && <Separator space={16} />}
                <YoutubeVideo title={video.name} youtubeKey={video.key} />
              </Fragment>
            ))}
          </MovieSection>
        )}
      </ScrollView>
    );
  }, [movie]);

  return <Screen>{isLoading ? <Loading /> : renderMovie()}</Screen>;
};

export default MovieScreen;

const TitleSection = styled.View`
  flex-direction: row;
`;

const Poster = styled.Image`
  width: 128px;
  aspect-ratio: 2/3;
  border-radius: 8px;
  background-color: ${Colors.gray[3]};
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${Colors.white};
`;

const OriginalTitle = styled.Text`
  margin-top: 6px;
  font-size: 16px;
  color: ${Colors.white};
`;

const ReleaseDate = styled.Text`
  color: ${Colors.white};
`;

const Overview = styled.Text`
  line-height: 22px;
  color: ${Colors.white};
`;
