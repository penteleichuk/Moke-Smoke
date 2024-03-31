import database, {
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { getIsAuth } from 'entities/auth';
import { getUserEmail, getUserIsBanned } from 'entities/user';
import React, { useState } from 'react';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';

type Message = {
  id: string;
  text: string;
  timestamp: number;
  email: string;
  premium: boolean;
};

export const useChatMessage = (country: string) => {
  const email = useAppSelector(getUserEmail);
  const isAuth = useAppSelector(getIsAuth);
  const isBanned = useAppSelector(getUserIsBanned);

  const [messages, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      let temp: Message[] = [];

      const onValueChange = database()
        .ref(`/chat/${country}`)
        .orderByChild('timestamp')
        .limitToLast(10)
        .on('child_added', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
          if (snapshot.val().email) {
            temp.push({
              id: snapshot.val().timestamp,
              me: email === snapshot.val().email || false,
              premium: snapshot.val().premium || false,
              ...snapshot.val(),
            });
          }
        });

      database()
        .ref(`/chat/${country}`)
        .once('value')
        .then(() => {
          setMessage(temp.sort((a, b) => a.timestamp - b.timestamp));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Stop listening for updates when no longer required
      return () => {
        setIsLoading(true);
        setMessage([]);
        database().ref(`/chat/${country}`).off('child_added', onValueChange);
      };
    }, [isAuth, isBanned]),
  );

  return { messages, isLoading };
};
