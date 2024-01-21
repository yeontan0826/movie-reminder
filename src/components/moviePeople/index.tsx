import styled from 'styled-components/native';
import Colors from 'open-color';

interface MoviePeopleProps {
  name: string;
  description: string;
  photoUrl: string;
}

const MoviePeople = ({
  name,
  description,
  photoUrl,
}: MoviePeopleProps): JSX.Element => {
  return (
    <Container>
      <Profile source={{ uri: photoUrl }} />
      <Bottom>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Bottom>
    </Container>
  );
};

export default MoviePeople;

const Container = styled.View`
  width: 150px;
  border-radius: 12px;
  background-color: ${Colors.white};
  overflow: hidden;
`;

const Profile = styled.Image`
  height: 150px;
  background-color: ${Colors.gray[3]};
`;

const Bottom = styled.View`
  padding: 12px;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;

const Description = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
`;
