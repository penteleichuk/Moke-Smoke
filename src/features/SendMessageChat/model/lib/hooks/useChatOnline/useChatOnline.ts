import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import { getLanguage } from 'features/LanguagePicker';
import React, { useState } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { getMessageUuid } from './../../../selectors/getMessageUuid/getMessageUuid';

export const useChatOnline = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [online, setOnline] = useState(0);

  const userUuid = useAppSelector(getMessageUuid);
  const userCountry = useAppSelector(getLanguage);

  useFocusEffect(
    React.useCallback(() => {
      const connectedRef = database().ref('.info/connected');
      const connectionsRef = database().ref(`connections/${userCountry}/`);

      const connectedListener = connectedRef.on('value', snap => {
        if (snap.val() === true) {
          connectionsRef.child(userUuid).set(true);
          connectionsRef.child(userUuid).onDisconnect().remove();
        }
        if (!snap.exists()) {
          console.error('Error connecting to the database');
        }
      });

      const connectionsListener = connectionsRef.on('value', snap => {
        setIsLoading(false);
        setOnline(snap.numChildren());
      });

      return () => {
        setIsLoading(true);
        setOnline(0);
        connectionsRef.child(userUuid).remove();
        connectedRef.off('value', connectedListener);
        connectionsRef.off('value', connectionsListener);
      };
    }, [userUuid]),
  );

  return { online, loading: isLoading };
};
