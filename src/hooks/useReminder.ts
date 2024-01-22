import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';
import moment from 'moment';

const MAX_REMINDER_NUM_FOR_FREE = 2;

const useReminder = () => {
  const [channelId, setChannelId] = useState<string | null>(null); // reminder 채널
  const [reminders, setReminders] = useState<TriggerNotification[]>([]); // reminder 목록

  /**
   * Only for Android
   * 채널 생성
   */
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const id = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
        setChannelId(id);
      } else {
        setChannelId('ios-channel-id');
      }
    })();
  }, []);

  /**
   * API - 알림 목록 가져오기
   */
  const loadReminders = useCallback(async () => {
    const notifications = await notifee.getTriggerNotifications();
    setReminders(notifications);
  }, []);

  const canAddReminder = useCallback(async () => {
    const triggeredNotifications = await notifee.getTriggerNotifications();
    return triggeredNotifications.length < MAX_REMINDER_NUM_FOR_FREE;
  }, []);

  /**
   * 알림 추가
   */
  const addReminder = useCallback<
    (movieId: Number, releaseDate: string, title: string) => Promise<void>
  >(
    async (movieId, releaseDate, title) => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
        throw new Error('Permission is denied');
      }

      if (Platform.OS === 'android') {
        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
          throw new Error(
            'Please allow setting alarms and reminder on settings',
          );
        }
      }

      if (channelId == null) {
        throw new Error('Channel is not created');
      }

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: moment(releaseDate).valueOf(),
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          id: String(movieId),
          title: '영화 개봉일 알림',
          body: title,
          android: {
            channelId,
          },
        },
        trigger,
      );

      await loadReminders();
    },
    [channelId, loadReminders],
  );

  /**
   * 알림 목록 가져오기
   */
  useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  /**
   * 알림 제거
   */
  const removeReminder = useCallback(
    async (id: string) => {
      await notifee.cancelTriggerNotification(id);
      await loadReminders();
    },
    [loadReminders],
  );

  const hasReminder = useCallback(
    (id: string) => {
      const reminder = reminders.find(r => r.notification.id === id);

      return reminder !== undefined;
    },
    [reminders],
  );

  return {
    addReminder,
    reminders,
    removeReminder,
    hasReminder,
    canAddReminder,
  };
};

export default useReminder;
