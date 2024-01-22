import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from 'open-color';

import LoadingBar from '../../components/loadingBar';

interface LoadingScreenProps {
  progress?: {
    now: number;
    total: number;
  };
}

const LoadingScreen = ({ progress }: LoadingScreenProps): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator size={'large'} color={Colors.black} />
      {progress !== undefined && (
        <LoadingBarContainer>
          <LoadingBar width={240} total={progress.total} now={progress.now} />
        </LoadingBarContainer>
      )}
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingBarContainer = styled.View`
  margin-top: 20px;
`;
