import OpenColor from 'open-color';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface LoadingBarProps {
  width: number;
  total: number;
  now: number;
}

const LoadingBar = ({ width, total, now }: LoadingBarProps): JSX.Element => {
  const loadingAnimRef = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.timing(loadingAnimRef, {
      toValue: now / total,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [loadingAnimRef, now, total]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const progressWidth = useMemo(() => {
    return loadingAnimRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width],
      extrapolate: 'clamp',
    });
  }, [loadingAnimRef, width]);

  return (
    <Outer width={width}>
      <Inner style={{ width: progressWidth }} />
    </Outer>
  );
};

export default LoadingBar;

const Outer = styled.View<Pick<LoadingBarProps, 'width'>>`
  height: 8px;
  width: ${props => props.width}px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${OpenColor.black};
  overflow: hidden;
`;

const Inner = styled(Animated.View)`
  height: 100%;
  background-color: ${OpenColor.black};
`;
