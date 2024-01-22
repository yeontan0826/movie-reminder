import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import {
  AdEventType,
  RewardedAdEventType,
  RewardedInterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';
import Colors from 'open-color';

interface RewardAdShowParams {
  onRewarded: (rewardedRef: boolean) => void;
}

export interface RewardAdRef {
  show: (props: RewardAdShowParams) => void;
}

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : Platform.OS === 'ios'
  ? 'ca-app-pub-8694566346923190/6853258314'
  : 'ca-app-pub-8694566346923190/5540176641';

const RewardAd = forwardRef<RewardAdRef>((props, ref): JSX.Element => {
  const rewardedAdRef = useRef(
    RewardedInterstitialAd.createForAdRequest(adUnitId),
  );
  const onRewardedRef = useRef<RewardAdShowParams['onRewarded']>();

  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const rewardedRef = useRef(false);

  useEffect(() => {
    const unsubscribeLoaded = rewardedAdRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeEarned = rewardedAdRef.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        rewardedRef.current = true;
      },
    );

    const unsubscribeClosed = rewardedAdRef.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (onRewardedRef.current !== undefined) {
          onRewardedRef.current(rewardedRef.current);
        }

        rewardedRef.current = false;
        setVisible(false);
        setLoaded(false);
      },
    );

    if (!loaded) {
      rewardedAdRef.current.load();
    }

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, [loaded]);

  useEffect(() => {
    if (loaded && visible) {
      rewardedAdRef.current.show();
    }
  }, [loaded, visible]);

  useImperativeHandle(ref, () => ({
    show: ({ onRewarded }) => {
      onRewardedRef.current = onRewarded;
      setVisible(true);
    },
  }));

  if (visible && !loaded) {
    return (
      <Container>
        <ActivityIndicator size={'large'} color={Colors.white} />
      </Container>
    );
  }

  return <></>;
});

export default RewardAd;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.black};
`;
