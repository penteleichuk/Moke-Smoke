import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  getUserIsQuitting,
  getUserPricePack,
  getUserSmokeEveryDay,
  getUserTaskLists,
} from 'entities/user';
import { getCurrency } from 'features/currency-picker';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { getCigaretteSavings } from 'shared/utils/getCigaretteSavings';
import { getCurrencySymbol } from 'shared/utils/getCurrencySymbol';
import { getUnsmokedCigarettesCount } from 'shared/utils/statistics/getUnsmokedCigarettesCount';
import { TaskItem } from './../TaskItem/TaskItem';
import { styles } from './TaskScreenStyle';

type TaskScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.TASK
>;

export const TaskScreen = ({ navigation }: TaskScreenProps) => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeInDay = useAppSelector(getUserSmokeEveryDay);
  const pricePack = useAppSelector(getUserPricePack);
  const tasks = useAppSelector(getUserTaskLists);
  const currency = useAppSelector(getCurrency);

  const headerHeight = useHeaderHeight();
  const { cn } = useTheme();
  const { t } = useTranslation();

  const currencySymbol = useMemo(() => {
    return getCurrencySymbol(currency);
  }, [currency]);

  const money = useMemo(() => {
    const sum = getCigaretteSavings(isQuitting, smokeInDay);
    return getUnsmokedCigarettesCount(sum, pricePack, smokeInDay);
  }, [isQuitting, smokeInDay, pricePack]);

  const names = useMemo(() => {
    return t('help.tasks', { returnObjects: true }) as string[];
  }, []);

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={tasks}
          numColumns={1}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.header}>
              <CustomText
                size={TextSize.S_3XL}
                style={{ color: cn('white', 'black') }}>
                {t('help.header.task.title')}
              </CustomText>
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('slate.200', 'slate.800') }}>
                {t('help.header.task.description')}
              </CustomText>
            </View>
          }
          renderItem={({ item: task, index }) => (
            <TaskItem
              key={index}
              taskId={index}
              task={task}
              name={names[index]}
              money={money}
              currencies={currencySymbol}
            />
          )}
        />
      </View>
    </ScreenContent>
  );
};
