import { memo, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Tooltip from 'rn-tooltip';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

type TooltipChatType = {
  tooltipRef: RefObject<Tooltip>;
};

export const MessageTooltip = memo(({ tooltipRef }: TooltipChatType) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressReportHandler = async () => {
    tooltipRef?.current?.toggleTooltip();

    showMessage({
      message: t('feed.message.title'),
      description: t('feed.message.success'),
      duration: 5000,
      type: 'success',
      floating: true,
      style: { borderRadius: 20 },
    });
  };

  return (
    <View style={styles.container}>
      <PressableOpacity onPress={onPressReportHandler}>
        <CustomText style={{ color: cn('white') }}>
          {t('feed.tooltip.report')}
        </CustomText>
      </PressableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
