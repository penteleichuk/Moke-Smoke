import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Rate from 'react-native-rate';
import * as Anims from 'shared/assets/anims';
import { rateConfig } from 'shared/config/rate';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { Row } from 'shared/ui/Row';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetReviewStyle';

export const SheetReview = React.memo(() => {
  const { [AppSheet.REVIEW]: reviewRef } = useContext(SheetCreateContext);
  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressReviewHandler = () => {
    try {
      Rate.rate(rateConfig);
    } catch (e) {}

    reviewRef?.current?.dismiss();
  };

  return (
    <Sheet name={AppSheet.REVIEW} ref={reviewRef}>
      <View style={styles.container}>
        <Lottie style={styles.animation} source={Anims.Review} autoPlay loop />
        <CustomText
          size={TextSize.S_LG}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('review.description')}
        </CustomText>
        <Row>
          <CustomButton
            onPress={onPressReviewHandler}
            background={[cn('indigo.500'), cn('indigo.600')]}
            radius={10}>
            {t('settings.info.review')}
          </CustomButton>
        </Row>
      </View>
    </Sheet>
  );
});
