import { getIsAuth } from 'entities/auth';
import { getUserIsBanned } from 'entities/user';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { isIos } from 'shared/lib/isIos';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { clockify } from 'shared/utils/clockify';
import { useSendMessage } from './../model/lib/hooks/useSendMessage/useSendMessage';
import { getMessageDelay } from './../model/selectors/getMessageDelay/getMessageDelay';
import { getSecondsToDate } from './../model/utils/getSecondsToDate/getSecondsToDate';
import { styles } from './SendMessageChatStyle';

const LIMIT_CHARACTER = 100;
const IS_IOS = isIos();

type SendMessageChatProps = {
  scrollToEnd: () => void;
  onAuthCallBack: () => void;
};

export const SendMessageChat = (props: SendMessageChatProps) => {
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [timerDelay, setTimerDelay] = useState(0);

  const { t } = useTranslation();
  const { onSendMessage } = useSendMessage();
  const { theme, cn } = useTheme();

  const messageDelay = useAppSelector(getMessageDelay);
  const isAuth = useAppSelector(getIsAuth);
  const isBanned = useAppSelector(getUserIsBanned);
  const inputRef = useRef<TextInput>(null);

  const limitchar = useMemo(() => LIMIT_CHARACTER - message.length, [message]);
  const timeToPrint = useMemo(() => clockify(timerDelay), [timerDelay]);

  const limitDelay = useMemo(
    () => getSecondsToDate(messageDelay),
    [messageDelay, timerDelay],
  );

  useEffect(() => {
    if (limitDelay) {
      setTimerDelay(limitDelay);
    }
  }, [limitDelay]);

  useEffect(() => {
    if (timerDelay > 0) {
      let interval = setInterval(() => {
        setTimerDelay(state => {
          if (state - 1 < 1) {
            clearInterval(interval);
          }
          return state - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerDelay]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current.measure((_x, _y, _width, height: number) => {
        if (height) {
          if (+height.toFixed() !== inputHeight) {
            setInputHeight(+height.toFixed());
            onBlurHandler();
          }
        }
      });
    }
  }, [message]);

  const onPressSendHandler = () => {
    if (getSecondsToDate(messageDelay) < 1) {
      Keyboard.dismiss();
      setMessage('');
      onSendMessage(message);
    }
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
            value={message}
            onBlur={onBlurHandler}
            onPressIn={onPressInHandler}
            onFocus={onBlurHandler}
            onChangeText={setMessage}
            keyboardAppearance={theme}
            placeholder={t('friend.message.name')}
            placeholderTextColor={cn('white', 'black')}
            maxLength={LIMIT_CHARACTER}
            multiline={IS_IOS}
            numberOfLines={IS_IOS ? 4 : 1}
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            editable={
              timerDelay < 1 && !isBanned && isAuth
                ? true
                : IS_IOS
                  ? false
                  : undefined
            }
            style={[
              styles.input,
              {
                color: cn('white', 'black'),
                backgroundColor: cn('slate.800', 'slate.100'),
              },
              inputHeight > 40 && { borderRadius: moderateScale(10) },
            ]}
          />
          <View style={styles.limit}>
            <CustomText
              style={[
                {
                  color: limitchar ? cn('slate.400') : cn('red.400'),
                },
                timerDelay > 0 && { color: cn('orange.400') },
              ]}>
              {timerDelay > 0
                ? `${timeToPrint.displayMins}:${timeToPrint.displaySecs}`
                : LIMIT_CHARACTER - limitchar > 0
                  ? limitchar
                  : ''}
            </CustomText>
          </View>
        </View>
        {message.length > 0 && (
          <PressableOpacity
            disabled={timerDelay > 0}
            onPress={onPressSendHandler}>
            <View
              style={[styles.button, { backgroundColor: cn('indigo.500') }]}>
              <Icons.ArowRight
                fill={cn('white')}
                width={moderateScale(15)}
                height={moderateScale(15)}
              />
            </View>
          </PressableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
