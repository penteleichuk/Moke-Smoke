import { FeedEventTypes } from 'entities/feed';
import { getLanguage } from 'features/language-picker';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation, AppTabNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { isIos } from 'shared/lib/isIos';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { useFeedCreate } from './../model/lib/hooks/useFeedCreate/useFeedCreate';
import { styles } from './FeedCreatePostStyle';

interface FeedCreatePostProps {
  event: FeedEventTypes;
}

const LIMIT_CHARACTER = 300;
const IS_IOS = isIos();

export const FeedCreatePost = memo(({ event }: FeedCreatePostProps) => {
  const [message, setMessage] = useState<string>('');

  const { t } = useTranslation();
  const { theme, cn } = useTheme();
  const navigation = useAppNavigation();
  const country = useAppSelector(getLanguage);

  const { created } = useFeedCreate();

  const limitchar = useMemo(() => LIMIT_CHARACTER - message.length, [message]);

  const onPressSendHandler = () => {
    try {
      if (message.length > 0) {
        created(event, message, country);
      }
    } catch (err) {}

    navigation.reset({
      index: 0,
      routes: [
        {
          name: AppNavigation.MAIN,
          state: {
            routes: [
              {
                name: AppTabNavigation.FEEDS,
              },
            ],
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[
        styles.container,
        { backgroundColor: cn('slate.700', 'slate.300') },
      ]}>
      <View style={styles.content}>
        <View style={styles.inputs}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            keyboardAppearance={theme}
            placeholder={t('friend.message.name')}
            placeholderTextColor={cn('white', 'black')}
            maxLength={LIMIT_CHARACTER}
            multiline={IS_IOS}
            numberOfLines={IS_IOS ? 4 : 1}
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            style={[
              styles.input,
              {
                color: cn('white', 'black'),
                backgroundColor: cn('slate.800', 'slate.100'),
              },
            ]}
          />
          <CustomText
            style={[
              styles.limit,
              {
                color: limitchar ? cn('slate.400') : cn('red.400'),
              },
            ]}>
            {LIMIT_CHARACTER - limitchar > 0 ? limitchar : ''}
          </CustomText>
        </View>
        <PressableOpacity onPress={onPressSendHandler}>
          <View style={[styles.button, { backgroundColor: cn('indigo.500') }]}>
            <Icons.ArowRight
              fill={cn('white')}
              width={moderateScale(17)}
              height={moderateScale(17)}
            />
          </View>
        </PressableOpacity>
      </View>
    </SafeAreaView>
  );
});
