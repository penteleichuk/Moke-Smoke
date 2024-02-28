import { useTranslation } from 'react-i18next';
import { CONTENT_IN_RADIUS } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';

interface DesireToSmokeProps {
  disabled?: boolean;
}

export const DesireToSmoke = ({ disabled }: DesireToSmokeProps) => {
  const navigation = useAppNavigation();

  const { t } = useTranslation();
  const { cn } = useTheme();

  const onPressHandler = () => {
    navigation.navigate(AppNavigation.MORNING);
  };

  return (
    <CustomButton
      onPress={onPressHandler}
      background={[cn('orange.600'), cn('orange.500')]}
      radius={CONTENT_IN_RADIUS}
      disabled={disabled}>
      {t('home.buttons.iWant')}
    </CustomButton>
  );
};
