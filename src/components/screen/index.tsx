import { useCallback, useContext } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from 'open-color';

import { RootStackParamList } from '../../navigations/rootStack/types';
import ScreenBannerAd from '../screenBannerAd';
import SubscriptionContext from '../context/subscription';

interface ScreenProps {
  title?: string;
  children?: React.ReactNode;
  headerVisible?: boolean;
  renderRightComponent?: () => JSX.Element;
}

const Screen = ({
  title,
  children,
  headerVisible = true,
  renderRightComponent,
}: ScreenProps): JSX.Element => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { goBack, canGoBack } = useNavigation();

  const { subscribed } = useContext(SubscriptionContext);

  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.black} />

      {headerVisible && (
        <Header>
          <HeaderLeft>
            {canGoBack() && (
              <TouchableOpacity onPress={onPressBackButton}>
                <BackButtonIcon name="arrow-back" />
              </TouchableOpacity>
            )}
          </HeaderLeft>
          <HeaderCenter>
            <HeaderTitle>{title}</HeaderTitle>
          </HeaderCenter>
          <HeaderRight>
            {renderRightComponent && renderRightComponent()}
          </HeaderRight>
        </Header>
      )}
      {!subscribed && (
        <>
          <Subscription onPress={() => navigate('PurchaseScreen')}>
            <SubscriptionLabel>
              구독하고 광고 없이 앱을 무제한으로 사용해보세요!
            </SubscriptionLabel>
          </Subscription>
          <ScreenBannerAd />
        </>
      )}
      <Body>{children}</Body>
    </Container>
  );
};

export default Screen;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.black};
`;

const Header = styled.View`
  height: 48px;
  flex-direction: row;
`;

const HeaderLeft = styled.View`
  flex: 1;
  justify-content: center;
`;

const BackButtonIcon = styled(MaterialIcons)`
  margin-left: 20px;
  font-size: 28px;
  color: ${Colors.white};
`;

const HeaderCenter = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.white};
`;

const Body = styled.View`
  flex: 1;
`;

const Subscription = styled.TouchableOpacity`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${Colors.white};
`;

const SubscriptionLabel = styled.Text`
  font-size: 14px;
  color: ${Colors.black};
`;
