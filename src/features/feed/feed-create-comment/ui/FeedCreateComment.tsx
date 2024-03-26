import { getIsAuth } from 'entities/auth';
import { FeedType } from 'entities/feed';
import { addUserRating, getUserIsBanned } from 'entities/user';
import { memo, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { isIos } from 'shared/lib/isIos';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { useFeedComment } from './../model/lib/hooks/useFeedComment';
import { styles } from './FeedCreateCommentStyle';

const LIMIT_CHARACTER = 200;
const IS_IOS = isIos();

type FeedCreateCommentProps = {
  feedId: string;
  userId?: string;
  scrollToEnd: () => void;
  onAuthCallBack: () => void;
  setData: React.Dispatch<React.SetStateAction<FeedType>>;
};

export const FeedCreateComment = memo((props: FeedCreateCommentProps) => {
  const [text, setText] = useState('');

  const { comment } = useFeedComment(props.feedId);
  const { t } = useTranslation();
  const { theme, cn } = useTheme();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(getIsAuth);
  const isBanned = useAppSelector(getUserIsBanned);
  const inputRef = useRef<TextInput>(null);

  const limitchar = useMemo(() => LIMIT_CHARACTER - text.length, [text]);

  const onPressSendHandler = async () => {
    const res = await comment(text);

    if (res.status === 'error') {
      DisplayMessage({
        message: t('message.error.network.title'),
        description: t('message.error.network.message'),
        type: 'danger',
      });
    } else {
      if (res.response) {
        dispatch(addUserRating(1));

        props.setData((prevData: FeedType) => {
          return {
            ...prevData,
            comments: [...prevData.comments, res.response.comments[0]],
          };
        });
      }
    }

    setText('');
    Keyboard.dismiss();
  };

  const onBlurHandler = () => {
    const timeout = setTimeout(props.scrollToEnd, 100);
    return () => clearTimeout(timeout);
  };

  const onPressInHandler = () => {
    if (!isAuth) {
      props.onAuthCallBack();
    }
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
            ref={inputRef}
            value={text}
            onBlur={onBlurHandler}
            onPressIn={onPressInHandler}
            onFocus={onBlurHandler}
            onChangeText={setText}
            keyboardAppearance={theme}
            placeholder={t('friend.message.name')}
            placeholderTextColor={cn('white', 'black')}
            maxLength={LIMIT_CHARACTER}
            multiline={IS_IOS}
            numberOfLines={IS_IOS ? 4 : 1}
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            editable={!isBanned && isAuth ? true : IS_IOS ? false : undefined}
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
        {text.length > 0 && (
          <PressableOpacity onPress={onPressSendHandler}>
            <View
              style={[styles.button, { backgroundColor: cn('indigo.500') }]}>
              <Icons.ArowRight
                fill={cn('white')}
                width={moderateScale(17)}
                height={moderateScale(17)}
              />
            </View>
          </PressableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
});
