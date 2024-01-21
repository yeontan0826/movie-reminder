import { useCallback, useState } from 'react';
import { LayoutChangeEvent, Linking } from 'react-native';
import styled from 'styled-components/native';
import Colors from 'open-color';

interface YoutubeVideoProps {
  title: string;
  youtubeKey: string;
}

const YoutubeVideo = ({
  title,
  youtubeKey,
}: YoutubeVideoProps): JSX.Element => {
  const thumbnailImageUrl = `https://img.youtube.com/vi/${youtubeKey}/0.jpg`;
  const [imageHeight, setImageHeight] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setImageHeight(width * (9 / 16));
  }, []);

  const onPress = useCallback(() => {
    const url = `https://www.youtube.com/watch?v=${youtubeKey}`;
    Linking.openURL(url);
  }, [youtubeKey]);

  return (
    <Container onLayout={onLayout} onPress={onPress}>
      <Thumbnail source={{ uri: thumbnailImageUrl }} height={imageHeight} />
      <Title>{title}</Title>
    </Container>
  );
};
export default YoutubeVideo;

const Container = styled.TouchableOpacity`
  align-self: stretch;
  background-color: ${Colors.white};
  border-radius: 20px;
  overflow: hidden;
`;

const Thumbnail = styled.Image<{ height: number }>`
  height: ${props => props.height}px;
`;

const Title = styled.Text`
  padding: 12px;
  font-size: 16px;
  color: ${Colors.black};
`;
