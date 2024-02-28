import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  fetchInviteActivated,
  getInvitedId,
  getInvitedToken,
} from 'entities/invited';
import { getUserEmail } from 'entities/user';
import {
  ResendToken,
  useIssueAccept,
  useIssueCode,
} from 'features/EmailActivation';
import Lottie from 'lottie-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { getCountry } from 'shared/lib/utils/getCountry';
import { isIos } from 'shared/lib/utils/isIos';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { InputCode } from 'shared/ui/InputCode';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { codeDto } from 'shared/validations/code';
import { styles } from './VerifyScreenStyle';

type VerifyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.VERIFY
>;

const IS_IOS = isIos();
const country = getCountry();

export const VerifyScreen = ({ navigation }: VerifyScreenProps) => {
  const { refetch, setEmailToken, fetchStatus } = useIssueAccept();
  const { mutate: mutateIssue } = useIssueCode();
  const [isSendToken, setIsSendToken] = useState(false);

  const userEmail = useAppSelector(getUserEmail);
  const invitedToken = useAppSelector(getInvitedToken);
  const installedId = useAppSelector(getInvitedId);

  const dispatch = useAppDispatch();
  const { cn } = useTheme();
  const { t } = useTranslation();

  const { control } = useForm({
    defaultValues: {
      code: '',
    },
    resolver: yupResolver(codeDto),
  });

  const onSubmitCode = async (value: string) => {
    setEmailToken(value);
    const res = await refetch();
    if (res.status === 'success' && invitedToken) {
      dispatch(
        fetchInviteActivated({
          code: invitedToken,
          installedId,
          country,
        }),
      );
    }

    navigation.reset({
      index: 0,
      routes: [{ name: AppNavigation.MAIN }],
    });
  };

  const onPressResend = () => {
    if (!isSendToken) {
      setIsSendToken(true);
      mutateIssue();
    }
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoiding}
          behavior={IS_IOS ? 'padding' : 'height'}>
          <View style={styles.header}>
            <CustomText
              size={TextSize.S_3XL}
              weight={TextWeight.BOLD}
              style={[styles.title, { color: cn('white', 'black') }]}>
              {t('verify.title')}
            </CustomText>
            <Lottie
              style={styles.animation}
              source={Anims.Verify}
              resizeMode={'cover'}
              autoPlay
            />
            <CustomText
              size={TextSize.S_LG}
              style={[
                styles.description,
                { color: cn('slate.300', 'slate.700') },
              ]}>
              {t('verify.info', { email: userEmail })}
            </CustomText>
          </View>
          <View style={styles.wrapper}>
            {fetchStatus === 'idle' ? (
              <InputCode
                cellCount={5}
                control={control}
                name={'code'}
                placeholder=" "
                onSubmit={onSubmitCode}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
            {fetchStatus === 'idle' && !isSendToken && (
              <ResendToken
                onPress={onPressResend}
                color={cn('indigo.500', 'indigo.300')}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenContent>
  );
};
