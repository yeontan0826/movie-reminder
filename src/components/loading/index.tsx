import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from 'open-color';

const Loading = (): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator size={'large'} color={Colors.white} />
    </Container>
  );
};

export default Loading;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
