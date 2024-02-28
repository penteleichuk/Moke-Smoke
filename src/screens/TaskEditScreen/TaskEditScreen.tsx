import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  getUserTaskLists,
  setUserTaskName,
  setUserTaskValue,
} from 'entities/user';
import { editTaskDto } from 'features/EditTask';
import Lottie from 'lottie-react-native';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { isIos } from 'shared/lib/utils/isIos';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { InputText } from 'shared/ui/InputText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './TaskEditScreenStyle';

type TaskEditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.TASK_EDIT
>;

const IS_IOS = isIos();

export const TaskEditScreen = ({ navigation, route }: TaskEditScreenProps) => {
  const { taskId } = route.params;
  const tasks = useAppSelector(getUserTaskLists) || [];

  const task = useMemo(() => {
    return tasks[taskId];
  }, [taskId]);

  const dispatch = useAppDispatch();
  const { cn } = useTheme();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: task.name,
      value: task.value,
    },
    resolver: yupResolver(editTaskDto),
  });

  const onPressSendHandler = (data: { name?: string; value?: number }) => {
    dispatch(setUserTaskName({ taskId, name: data.name || '' }));
    dispatch(setUserTaskValue({ taskId, value: +(data?.value || 0) }));
    navigation.goBack();
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <Lottie
            source={Anims.Task}
            style={styles.animation}
            autoPlay
            resizeMode={'cover'}
          />
          <CustomText
            size={TextSize.S_3XL}
            style={[styles.title, { color: cn('white', 'black') }]}>
            {t('sheet.help.task.title')}
          </CustomText>
        </View>
        <View style={styles.form}>
          <InputText
            placeholder={t('sheet.help.task.input.name')}
            control={control}
            name={'name'}
          />
          <InputText
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            placeholder={t('sheet.help.task.input.value')}
            control={control}
            name={'value'}
          />
          <CustomButton
            onPress={handleSubmit(onPressSendHandler)}
            background={[cn('indigo.500'), cn('indigo.600')]}
            radius={10}>
            {t('sheet.registration.link.change')}
          </CustomButton>
        </View>
      </KeyboardAvoidingView>
    </ScreenContent>
  );
};
