import notifee, {AndroidImportance} from '@notifee/react-native';
import {useCallback, useEffect} from 'react';

const DEFAULT_CHANNEL_ID = 'default';
const DEFAULT_CHANNEL_NAME = 'Default Channel';
const useNotification = () => {
  // Tạo channel cho Android
  const createChannel = useCallback(async (channelConfig = {}) => {
    try {
      const channelId = await notifee.createChannel({
        id: channelConfig.id || DEFAULT_CHANNEL_ID,
        name: channelConfig.name || DEFAULT_CHANNEL_NAME,
        importance: channelConfig.importance || AndroidImportance.HIGH,
        ...channelConfig,
      });
      return channelId;
    } catch (error) {
      console.error('Error creating notification channel:', error);
      throw error;
    }
  }, []);

  // Request permission
  const requestPermission = useCallback(async () => {
    try {
      const settings = await notifee.requestPermission();
      return settings;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  }, []);

  // Display notification
  const displayNotification = useCallback(
    async ({title, body, android = {}, ios = {}, data = {}}) => {
      try {
        // Request permission first
        await requestPermission();

        // Create default channel if not provided
        const channelId = android.channelId || (await createChannel());

        await notifee.displayNotification({
          title,
          body,
          data,
          android: {
            channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,
            ...android,
          },
          ios: {
            ...ios,
          },
        });
      } catch (error) {
        console.error('Error displaying notification:', error);
        throw error;
      }
    },
    [createChannel, requestPermission],
  );

  // Cancel all notifications
  const cancelAllNotifications = useCallback(async () => {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error cancelling notifications:', error);
      throw error;
    }
  }, []);

  // Cancel specific notification
  const cancelNotification = useCallback(async notificationId => {
    try {
      await notifee.cancelNotification(notificationId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
      throw error;
    }
  }, []);

  // Get displayed notifications
  const getDisplayedNotifications = useCallback(async () => {
    try {
      const notifications = await notifee.getDisplayedNotifications();
      return notifications;
    } catch (error) {
      console.error('Error getting displayed notifications:', error);
      throw error;
    }
  }, []);

  //just need one channel for now
  useEffect(() => {
    createChannel;
  }, []);
  return {
    displayNotification,
    cancelAllNotifications,
    cancelNotification,
    getDisplayedNotifications,
    createChannel,
    requestPermission,
  };
};

export default useNotification;
