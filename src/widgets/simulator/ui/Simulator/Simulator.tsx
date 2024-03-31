import { DesireToSmoke } from 'features/smoked/desire-to-smoke';
import { ISmoked } from 'features/smoked/i-smoked';
import { NoDesireToSmoke } from 'features/smoked/no-desire-to-smoke';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { CONTENT_PADDING } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { Row } from 'shared/ui/Row';
import { CountDownTimer } from './../CountDownTimer/CountDownTimer';
import { styles } from './SimulatorStyle';

export const Simulator = React.memo(() => {
  const navigation = useAppNavigation();
  const [isStart, setIsStart] = useState<boolean>(false);

  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressHelpHandler = () => {
    navigation.navigate(AppNavigation.TRAINER_HELP);
  };

  return (
    <View>
      <View style={styles.header}>
        <CustomText
          size={TextSize.S_2XL}
          style={{ color: cn('white', 'black') }}>
          {t('home.feeling')}
        </CustomText>
        <PressableOpacity onPress={onPressHelpHandler}>
          <CustomText
            size={TextSize.S_LG}
            style={[{ color: cn('indigo.300', 'indigo.600') }]}>
            {t('navigation.help')}
          </CustomText>
        </PressableOpacity>
      </View>
      <View
        style={[
          styles.content,
          {
            backgroundColor: cn('slate.800', 'white'),
            borderColor: cn('slate.800', 'slate.300'),
          },
        ]}>
        <View style={styles.timer}>
          <CountDownTimer isStart={isStart} setIsStart={setIsStart} />
          <NoDesireToSmoke disabled={isStart} />
        </View>
        <Row gap={CONTENT_PADDING}>
          <ISmoked disabled={isStart} />
          <DesireToSmoke disabled={isStart} />
        </Row>
      </View>
    </View>
  );
});
