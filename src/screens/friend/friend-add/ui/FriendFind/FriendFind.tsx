import { StackActions } from '@react-navigation/native';
import {
  FriendMotivationItem,
  FriendSchema,
  useAddFriend,
  useFrinds,
} from 'entities/friend';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import * as Images from 'shared/assets/images';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { substringStr } from 'shared/utils/substringStr';
import { styles } from './FriendFindStyle';

type FriendFindProps = {
  friend: FriendSchema;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const FriendFind = ({
  friend,
  loading,
  setLoading,
}: FriendFindProps) => {
  const { _id, toBegin, name, motivations, coin } = friend;

  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const { refetch: refetchAdd, setFriendId } = useAddFriend();
  const { refetch: refetchUpdateList } = useFrinds();

  const lastActivity = useMemo(() => {
    if (!toBegin) {
      return false;
    }

    return moment(toBegin).format('lll');
  }, [toBegin]);

  const onPressAddHandler = async () => {
    setLoading(true);
    setFriendId(_id);

    try {
      await refetchAdd();
      await refetchUpdateList();
    } finally {
      setLoading(false);
      const pushAction = StackActions.push(AppNavigation.FRIEND);
      navigation.dispatch(pushAction);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.animation}>
          <Lottie source={Anims.Fiesta} autoPlay loop />
        </View>
        <View style={styles.text}>
          <CustomText
            size={TextSize.S_2XL}
            style={{ color: cn('white', 'black') }}>
            {substringStr(name, 30)}
          </CustomText>

          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('slate.400', 'slate.700') }}>
            {lastActivity ? lastActivity : t('friend.group.nActivity')}
          </CustomText>
        </View>
        <View style={styles.items}>
          <FriendMotivationItem
            Icon={Images.SuccessEM}
            value={motivations.success}
          />
          <FriendMotivationItem
            Icon={Images.WrongEM}
            value={motivations.wrong}
          />
          <FriendMotivationItem
            Icon={Images.DangerEM}
            value={motivations.danger}
          />
          <FriendMotivationItem Icon={Images.Coin} value={coin || 0} />
        </View>
        <CustomButton
          onPress={onPressAddHandler}
          background={[cn('indigo.500'), cn('indigo.600')]}
          radius={10}
          disabled={loading}>
          {t('friend.group.add')}
        </CustomButton>
      </View>
    </View>
  );
};
