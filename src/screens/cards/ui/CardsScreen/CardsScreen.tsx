import { PURCHASE_CARDS_LIMIT } from '@env';
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium, getUserIsUnlockCards } from 'entities/user';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { CardContainer } from './../CardContainer';
import { styles } from './CardsScreenStyle';

type CardsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.CARDS
>;

export const CardsScreen = ({ navigation }: CardsScreenProps) => {
  const [active, setActive] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);

  const isCards = useAppSelector(getUserIsUnlockCards);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { t } = useTranslation();
  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  const wallets = useMemo(() => {
    const data = t('help.cards', { returnObjects: true }) as string[];

    if (isCards || isPremium || isUserPremium) {
      return data.sort(() => Math.random() - 0.5);
    }

    const sliceData = data
      .sort(() => Math.random() - 0.5)
      .slice(0, data.length - data.length + PURCHASE_CARDS_LIMIT);

    const fillData = Array(data.length - PURCHASE_CARDS_LIMIT).fill(
      t('help.premium'),
    );

    return [...sliceData, ...fillData];
  }, [isCards, isPremium, isUserPremium]);

  const onPenSetActiveHandler = useCallback(() => {
    if (active + 1 > 2) {
      setActive(0);
    } else {
      setActive(active + 1);
    }

    if (index + 4 >= wallets.length) {
      setIndex(0);
    } else {
      if (active === 1) {
        setIndex(index + 2);
      }
    }
  }, [active, index]);

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <CustomText
          size={TextSize.S_3XL}
          weight={TextWeight.MEDIUM}
          style={[styles.title, { color: cn('white', 'black') }]}>
          {t('help.header.cards.title')}
        </CustomText>
        <GestureHandlerRootView style={styles.cards}>
          <View style={styles.content}>
            <CardContainer
              id={2}
              color={[cn('blue.600'), cn('blue.800')]}
              textColor={cn('white')}
              priority={thirdPriority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
              active={active}
              onPenSetActive={onPenSetActiveHandler}
              text={wallets[index + 2]}
            />
            <CardContainer
              id={1}
              color={[cn('purple.600'), cn('purple.800')]}
              textColor={cn('white')}
              priority={secondPriority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
              active={active}
              onPenSetActive={onPenSetActiveHandler}
              text={wallets[index + 1]}
            />
            <CardContainer
              id={0}
              textColor={cn('white')}
              color={[cn('green.600'), cn('green.800')]}
              priority={firstPriority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
              active={active}
              onPenSetActive={onPenSetActiveHandler}
              text={wallets[index]}
            />
          </View>
        </GestureHandlerRootView>
      </View>
    </ScreenContent>
  );
};
