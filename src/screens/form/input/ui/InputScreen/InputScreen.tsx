import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { InputText } from 'shared/ui/InputText';
import { ScreenContent } from 'shared/ui/ScreenContent';

type InputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.INPUT
>;

export const InputScreen = ({ navigation, route }: InputScreenProps) => {
  const { placeholder, value, name, onSubmitButton, schema, ...res } =
    route.params;

  const { cn } = useTheme();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: { [name]: value },
    resolver: yupResolver(schema),
  });

  const onPressSubnitHandler = (data: { [name: string]: string }) => {
    onSubmitButton(data[name]);
    navigation.goBack();
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}>
      <View style={styles.container}>
        <View>
          <CustomText
            size={TextSize.S_3XL}
            style={[styles.placeholder, { color: cn('white', 'black') }]}>
            {placeholder}
          </CustomText>
          <View style={styles.panel}>
            <InputText
              autoFocus={true}
              control={control}
              name={name}
              {...res}
            />
            <CustomButton
              onPress={handleSubmit(onPressSubnitHandler)}
              background={[cn('indigo.500'), cn('indigo.600')]}
              radius={10}>
              {t('sheet.registration.link.change')}
            </CustomButton>
          </View>
        </View>
      </View>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  placeholder: {
    textAlign: 'center',
  },
  panel: {
    marginTop: moderateScale(20),
    gap: moderateScale(15),
  },
});
