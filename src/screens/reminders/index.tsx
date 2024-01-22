import { Alert, FlatList, TouchableOpacity } from 'react-native';
import Colors from 'open-color';
import styled from 'styled-components/native';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useReminder from '../../hooks/useReminder';
import Screen from '../../components/screen';
import Separator from '../../components/separator';

const RemindersScreen = (): JSX.Element => {
  const { reminders, removeReminder } = useReminder();

  return (
    <Screen>
      <FlatList
        data={reminders}
        renderItem={({ item: reminder }) => (
          <Container>
            <InfoContainer>
              <Title>{reminder.notification.body}</Title>
              {'timestamp' in reminder.trigger && (
                <Timestamp>
                  {moment(reminder.trigger.timestamp).format('LLL')}
                </Timestamp>
              )}
            </InfoContainer>
            <RemoveReminderContainer>
              <TouchableOpacity
                onPress={async () => {
                  if (reminder.notification.id === undefined) {
                    return;
                  }

                  try {
                    await removeReminder(reminder.notification.id);
                    Alert.alert('알림을 취소하였습니다');
                  } catch (error: any) {
                    Alert.alert(error.message);
                  }
                }}>
                <AlarmOffIcon name="notifications-off" />
              </TouchableOpacity>
            </RemoveReminderContainer>
          </Container>
        )}
        ItemSeparatorComponent={() => <Separator space={12} />}
      />
    </Screen>
  );
};

export default RemindersScreen;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.white};
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.white};
`;

const Timestamp = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.white};
`;

const RemoveReminderContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const AlarmOffIcon = styled(MaterialIcons)`
  font-size: 28px;
  color: ${Colors.white};
`;
