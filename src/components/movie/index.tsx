import styled from 'styled-components/native';
import Colors from 'open-color';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../../navigations/rootStack/types';

interface MovieProps {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
}

const Movie = ({
  id,
  title,
  originalTitle,
  releaseDate,
  overview,
  posterUrl,
}: MovieProps): JSX.Element => {
  const { navigate } = useNavigation<RootStackNavigation<'MoviesScreen'>>();

  const onPress = useCallback(() => {
    navigate('MovieScreen', { id });
  }, [id, navigate]);

  return (
    <Container onPress={onPress}>
      <Poster source={{ uri: posterUrl }} />
      <InfoContainer>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Title>
        <OriginalTitle numberOfLines={1} ellipsizeMode="tail">
          {originalTitle}
        </OriginalTitle>
        <ReleaseDate>{releaseDate}</ReleaseDate>
        <Overview numberOfLines={4} ellipsizeMode="tail">
          {overview}
        </Overview>
      </InfoContainer>
    </Container>
  );
};

export default Movie;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.gray[6]};
`;

const Poster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 4px;
  background-color: ${Colors.gray[3]};
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 14px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.white};
`;

const OriginalTitle = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  color: ${Colors.white};
`;

const ReleaseDate = styled.Text`
  margin-top: 2px;
  color: ${Colors.white};
`;

const Overview = styled.Text`
  margin-top: 6px;
  line-height: 18px;
  color: ${Colors.white};
`;
