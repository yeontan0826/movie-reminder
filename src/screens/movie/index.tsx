import { Fragment, useCallback, useRef } from 'react';
import { Alert, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import Colors from 'open-color';
import moment from 'moment';

import { RootStackRoute } from '../../navigations/rootStack/types';
import useMovie from '../../hooks/useMovie';
import useReminder from '../../hooks/useReminder';
import Screen from '../../components/screen';
import Loading from '../../components/loading';
import MovieSection from '../../components/movieSection';
import MoviePeople from '../../components/moviePeople';
import Separator from '../../components/separator';
import YoutubeVideo from '../../components/youtubeVideo';
import CalendarModule from '../../modules/calendarModule';
import RewardAd, { RewardAdRef } from '../../components/rewardAd';

const MovieScreen = (): JSX.Element => {
  const {
    params: { id },
  } = useRoute<RootStackRoute<'MovieScreen'>>();

  const { movie, isLoading } = useMovie({ id });
  const { addReminder, hasReminder, removeReminder, canAddReminder } =
    useReminder();
  const rewardRef = useRef<RewardAdRef>(null);

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

    /**
     * 캘린더에 해당 영화 추가
     * 내용: 영화제목
     * 날짜: 개봉 날짜
     */
    const onPressAddToCalendar = async () => {
      try {
        await CalendarModule.createCalendarEvent(
          moment(releaseDate).valueOf() / 1000,
          title,
        );

        Alert.alert('캘린더 등록이 완료되었습니다');
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    /**
     * 알림 추가하기
     */
    const onPressAddReminder = async () => {
      const addReminderHandler = async () => {
        try {
          await addReminder(id, releaseDate, title);
          Alert.alert('알림 등록이 완료되었습니다');
        } catch (error: any) {
          Alert.alert(error.message);
        }
      };

      if (await canAddReminder()) {
        addReminderHandler();
      } else {
        Alert.alert('광고를 보고 알림을 등록하시겠습니까?', undefined, [
          { text: '취소' },
          {
            text: '확인',
            onPress: () => {
              rewardRef.current?.show({
                onRewarded: rewarded => {
                  if (rewarded) {
                    addReminderHandler();
                  }
                },
              });
            },
          },
        ]);
      }
    };

    /**
     * 알림 취소하기
     */
    const onPressRemoveReminder = async () => {
      try {
        await removeReminder(String(id));
        Alert.alert('알림이 취소되었습니다');
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

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
        {/* 캘린더에 추가 */}
        <AddToCalendarButton onPress={onPressAddToCalendar}>
          <AddToCalendarButtonLabel>캘린더에 추가하기</AddToCalendarButtonLabel>
        </AddToCalendarButton>
        {/* 알림 추가/제거 */}
        <AddToCalendarButton
          onPress={
            hasReminder(String(id)) ? onPressRemoveReminder : onPressAddReminder
          }>
          <AddToCalendarButtonLabel>
            알림 {hasReminder(String(id)) ? '취소' : '설정'}하기
          </AddToCalendarButtonLabel>
        </AddToCalendarButton>
        {/* 소개 */}
        {overview.length !== 0 && (
          <MovieSection title="소개">
            <Overview>{overview}</Overview>
          </MovieSection>
        )}
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
  }, [addReminder, canAddReminder, hasReminder, id, movie, removeReminder]);

  return (
    <Screen>
      {isLoading ? <Loading /> : renderMovie()}
      <RewardAd ref={rewardRef} />
    </Screen>
  );
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

const AddToCalendarButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 8px;
  padding-top: 18px;
  padding-bottom: 18px;
  border-radius: 8px;
  background-color: ${Colors.white};
`;

const AddToCalendarButtonLabel = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
`;
