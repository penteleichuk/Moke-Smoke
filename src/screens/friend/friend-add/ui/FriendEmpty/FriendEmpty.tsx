import { FriendSchema, friendApi } from 'entities/friend';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { styles } from './FriendEmptyStyle';

type FriendEmptyProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  setFriend: (value: FriendSchema | null) => void;
  setStatus: (value: 'idle' | 'find') => void;
};

export const FriendEmpty = (props: FriendEmptyProps) => {
  const { loading, setLoading, setFriend, setStatus } = props;

  const { t } = useTranslation();
  const { cn } = useTheme();

  const onReadSuccessHandler = async ({ data: userId }: BarCodeReadEvent) => {
    setLoading(true);

    try {
      const res = await friendApi.getFriendById(userId);
      setFriend(res);
      setStatus('find');
    } catch (e: any) {
      const network = e?.response?._response;
      const server = e?.response?.data?.message;

      DisplayMessage({
        message: t('detached.friend.title'),
        description: server
          ? t(`detached.friend.${server}`)
          : network
            ? t('detached.friend.response')
            : '',
        type: 'warning',
      });
    }

    setLoading(false);
  };

  return (
    <>
      {!loading && (
        <View>
          <QRCodeScanner
            showMarker
            onRead={onReadSuccessHandler}
            cameraType={'back'}
            cameraStyle={styles.scanner}
            flashMode={RNCamera.Constants.FlashMode.off}
            topContent={
              <CustomText
                size={TextSize.S_2XL}
                style={[styles.title, { color: cn('white', 'black') }]}>
                {t('friends.qr')}
              </CustomText>
            }
          />
        </View>
      )}
    </>
  );
};
