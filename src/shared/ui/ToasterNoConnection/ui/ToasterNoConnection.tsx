import Lottie from 'lottie-react-native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './ToasterNoConnectionStyle';

interface ToasterNoConnectionProps {
  refetch: () => void;
}

export const ToasterNoConnection = React.memo(
  (props: ToasterNoConnectionProps) => {
    const { t } = useTranslation();
    const { cn } = useTheme();

    const onPressRefreshHandler = useCallback(() => {
      props.refetch();
    }, [props]);

    return (
      <View style={[styles.container]}>
        <Lottie
          style={styles.animation}
          source={Anims.NeedAuth}
          autoPlay
          loop
        />
        <CustomText
          size={TextSize.S_LG}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('friend.wifi.message')}
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('blue.500') }}
            onPress={onPressRefreshHandler}>
            {t('friend.wifi.button')}
          </CustomText>
        </CustomText>
      </View>
    );
  },
);
