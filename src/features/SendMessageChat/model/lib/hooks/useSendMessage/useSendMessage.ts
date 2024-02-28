import database from '@react-native-firebase/database';
import { getLanguage } from 'entities/i18n';
import { getSubscriptionIsPremium } from 'entities/subscription';
import {
  getUserEmail,
  getUserIsPremium,
  getUserName,
  getUserRating,
} from 'entities/user';
import { useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { setMessageDelay } from './../../../slices/chatSlice';

type useSendMessageProps = {
  onSendMessage: (value: string) => void;
  error: boolean;
  loading: boolean;
};

export const useSendMessage = (): useSendMessageProps => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(getUserName);
  const email = useAppSelector(getUserEmail);
  const rating = useAppSelector(getUserRating);
  const country = useAppSelector(getLanguage);

  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSendMessage = (message: string) => {
    if (name.length > 0) {
      setLoading(true);

      try {
        const messagesRef = database().ref(`/chat/${country}/`);

        messagesRef.push({
          name,
          message,
          email,
          rating,
          premium: isPremium || isUserPremium,
          timestamp: database.ServerValue.TIMESTAMP,
        });

        dispatch(setMessageDelay());
      } catch (e) {
        setError(true);
      }

      setLoading(false);
    }
  };

  return { onSendMessage, error, loading };
};
