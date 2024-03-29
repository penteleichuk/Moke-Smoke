import { getSubscriptionIsPremium } from 'entities/subscription';
import { UserTaskType, getUserIsPremium } from 'entities/user';
import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { substringStr } from 'shared/utils/substringStr';
import { styles } from './TaskItemStyle';

interface TaskItemProps {
  onPress?: () => void;
  taskId: number;
  task: UserTaskType;
  name: string;
  currencies: string;
  money: number;
}

export const TaskItem = (props: TaskItemProps) => {
  const { onPress, taskId, task, name, currencies, money } = props;

  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const taskName = useMemo(() => {
    return substringStr(task.name || name, 20);
  }, [task.name, name]);

  const taskValue = useMemo(() => {
    return `${task.value || 0} ${currencies}`;
  }, [task.value, currencies]);

  const taskLock = useMemo(() => {
    if (!task.value) {
      return 0;
    }
    if (!task.lock && !isPremium && !isUserPremium) {
      return 0;
    }

    const percent = (money * 100) / task.value;
    return +(percent > 100 ? 1 : (percent / 100).toFixed(2));
  }, [task.value, money]);

  const onPressEditHandler = () => {
    if (onPress) {
      return onPress();
    }

    if (task.lock && !isPremium && !isUserPremium) {
      navigation.navigate(AppNavigation.SUBS);
    } else {
      navigation.navigate(AppNavigation.TASK_EDIT, { taskId });
    }
  };

  return (
    <Pressable onPress={onPressEditHandler}>
      <View
        style={[
          styles.container,
          task.lock && !isPremium && !isUserPremium && styles.lock,
          {
            backgroundColor: cn('slate.800', 'slate.100'),
          },
        ]}>
        <View style={styles.content}>
          <CustomText
            size={TextSize.S_XL}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'black') }}>
            {taskName}
          </CustomText>
          <View
            style={[
              styles.money,
              { backgroundColor: cn('slate.700', 'slate.400') },
            ]}>
            <CustomText size={TextSize.S_LG} style={[{ color: cn('white') }]}>
              {taskValue}
            </CustomText>
          </View>
        </View>
        <View style={styles.progress}>
          <Progress.Circle
            animated={false}
            size={60}
            progress={taskLock}
            thickness={5}
            showsText={true}
            textStyle={{ color: cn('white', 'black') }}
            color={cn('teal.400')}
            unfilledColor={cn('slate.700', 'slate.400')}
            borderColor={cn('slate.700', 'slate.400')}
          />
        </View>
      </View>
    </Pressable>
  );
};
