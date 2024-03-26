import { useTranslation } from 'react-i18next';
import { ColorValue, Linking, View } from 'react-native';
import TextLink from 'react-native-text-link';

interface PrivacyPoliceProps {
  color: ColorValue;
  colorLink: ColorValue;
}

export const PrivacyPolice = ({ color, colorLink }: PrivacyPoliceProps) => {
  const { t } = useTranslation();

  const handleTermsOfUse = () => {
    Linking.openURL(
      'https://docs.google.com/document/d/1y9PqA4XTYSal4ZRz0w5XvngMaUhmOZtKvNO7bJ85hbQ',
    );
  };

  const handlePrivacy = () => {
    Linking.openURL(
      'https://docs.google.com/document/d/1Tog-m_iirm_kk15Y_yfedpbFB_s0C-4L4UKcz72QyvI',
    );
  };

  return (
    <View>
      <TextLink
        textStyle={{ color }}
        textLinkStyle={{ color: colorLink }}
        pressingLinkStyle={{ color: colorLink }}
        links={[
          {
            text: t('term.link1'),
            onPress: handleTermsOfUse,
          },
          {
            text: t('term.link2'),
            onPress: handlePrivacy,
          },
        ]}>
        {t('term.text')}
      </TextLink>
    </View>
  );
};
