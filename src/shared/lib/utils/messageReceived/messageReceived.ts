import notifee from '@notifee/react-native';

export const onMessageReceived = async (message: any) => {
  notifee.displayNotification(JSON.parse(message.data.notifee));
};
