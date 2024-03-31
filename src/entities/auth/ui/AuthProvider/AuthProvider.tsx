import AsyncStorage from '@react-native-async-storage/async-storage';
import { authLogout, getIsAuth } from 'entities/auth';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = React.memo(({ children }: AuthProviderProps) => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (isAuth && !refreshToken) {
        dispatch(authLogout());
      }
    })();
  }, []);

  return children;
});
