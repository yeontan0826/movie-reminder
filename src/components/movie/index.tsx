import styled from 'styled-components/native';
import Colors from 'open-color';

interface MovieProps {
  title: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
}

const Movie = ({
  title,
  originalTitle,
  releaseDate,
  overview,
  posterUrl,
}: MovieProps): JSX.Element => {
  return (
    <Container>
      <Poster source={{ uri: posterUrl }} />
      <InfoContainer>
        <Title>{title}</Title>
        <OriginalTitle>{originalTitle}</OriginalTitle>
        <ReleaseDate>{releaseDate}</ReleaseDate>
        <Overview numberOfLines={4} ellipsizeMode="tail">
          {overview}
        </Overview>
      </InfoContainer>
    </Container>
  );
};

export default Movie;

const Container = styled.View`
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
