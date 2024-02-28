import { getUserPricePack, setUserPricePack } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { InputScreen } from 'shared/ui/InputScreen';
import { cigarettePrice } from './../model/validations/cigarette-price';

export const SetCigarettePrice = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentPrice = useAppSelector(getUserPricePack) || 0;

  const onSubmitPrice = (value: string | number) => {
    dispatch(setUserPricePack(value as number));
  };

  return (
    <InputScreen
      keyboardType={'number-pad'}
      autoCapitalize={'none'}
      placeholder={t('settings.client.price')}
      name={'price'}
      value={currentPrice.toString()}
      onSubmitButton={onSubmitPrice}
      schema={cigarettePrice}
    />
  );
};
