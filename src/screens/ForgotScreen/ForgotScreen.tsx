import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ForgotChange,
  ForgotSend,
  ForgotStepType,
  ForgotVerify,
} from 'features/ForgotPassword';
import Lottie from 'lottie-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { isIos } from 'shared/lib/utils/isIos';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './ForgotScreenStyle';

type ForgotScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FORGOT
>;

const IS_IOS = isIos();

export const ForgotScreen = ({ navigation, route }: ForgotScreenProps) => {
  const [step, setStep] = useState<ForgotStepType>(ForgotStepType.SEND);
  const [isSendToken, setIsSendToken] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [submit, setSubmit] = useState(false);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const onSuccessChange = (success: boolean) => {
    if (success) {
      navigation.push(AppNavigation.AUTH, { show: route.params?.show });
    } else {
      setStep(ForgotStepType.SEND);
      setIsSendToken(false);
      setSubmit(false);
      setEmail('');
      setToken('');
    }
  };

  const onPressBackHandler = () => {
    navigation.navigate(AppNavigation.WELCOME_INFO);
  };

  const onPressNextHandler = () => {
    navigation.navigate(AppNavigation.SUBS, { show: true });
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoiding}
          behavior={IS_IOS ? 'padding' : 'height'}>
          <View style={styles.header}>
            <CustomText
              size={TextSize.S_3XL}
              weight={TextWeight.BOLD}
              style={[styles.title, { color: cn('white', 'black') }]}>
              {t('sheet.forgot.title')}
            </CustomText>
            <Lottie
              style={styles.animation}
              source={Anims.Forgot}
              resizeMode={'cover'}
              autoPlay
            />
            <CustomText
              size={TextSize.S_LG}
              style={[
                styles.description,
                { color: cn('slate.300', 'slate.700') },
              ]}>
              {step === ForgotStepType.SEND && t('forgot.send')}
              {step === ForgotStepType.VERIFY && t('verify.info', { email })}
              {step === ForgotStepType.CHNAGE && t('forgot.change')}
            </CustomText>
          </View>
          <View>
            {step === ForgotStepType.SEND && (
              <ForgotSend
                setEmail={setEmail}
                setStep={setStep}
                backgroundColor={[cn('indigo.500'), cn('indigo.600')]}
              />
            )}
            {step === ForgotStepType.VERIFY && (
              <ForgotVerify
                setToken={setToken}
                setStep={setStep}
                setIsSendToken={setIsSendToken}
                email={email}
                isSendToken={isSendToken}
                color={cn('indigo.300', 'indigo.700')}
              />
            )}
            {step === ForgotStepType.CHNAGE && (
              <ForgotChange
                onSuccess={onSuccessChange}
                setSubmit={setSubmit}
                submit={submit}
                email={email}
                token={token}
                backgroundColor={[cn('indigo.500'), cn('indigo.600')]}
              />
            )}
          </View>
          {route.params?.show && (
            <NavigationSplash
              onPressBack={onPressBackHandler}
              onPressNext={onPressNextHandler}
              nextText={t('welcome.nav.skip')}
            />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenContent>
  );
};
