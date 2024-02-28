import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getLanguage } from 'entities/i18n';
import { MessageItem, useChatMessage } from 'entities/messages';
import { SendMessageChat } from 'features/SendMessageChat';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { HeaderRight } from './../HeaderRight/HeaderRight';
import { HeaderTitle } from './../HeaderTitle/HeaderTitle';
import { styles } from './ChatScreenStyle';

type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.CHAT
>;

export const ChatScreen = ({ navigation }: ChatScreenProps) => {
  const messageRef = useRef<FlatList>(null);
  const language = useAppSelector(getLanguage);

  const { t } = useTranslation();
  const { cn } = useTheme();
  const { messages, isLoading } = useChatMessage(language);
  const headerHeight = useHeaderHeight();

  const onPressLoginHandler = useCallback(() => {
    navigation.navigate(AppNavigation.AUTH);
  }, []);

  const scrollToEnd = useCallback(() => {
    const timeout = setTimeout(() => {
      messageRef.current?.scrollToEnd();
    }, 250);

    return () => clearTimeout(timeout);
  }, [messageRef]);

  const renderHeaderTitle = () => {
    return <HeaderTitle />;
  };

  const renderHeaderRight = () => {
    return <HeaderRight />;
  };

  return (
    <ScreenContent
      excludeEdges={['top', 'bottom']}
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      navigationOptions={{
        headerTitle: renderHeaderTitle,
        headerRight: renderHeaderRight,
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: cn('white', 'black'),
        headerStyle: {
          backgroundColor: cn('slate.700', 'slate.300'),
        },
      }}>
      <View style={[styles.continaer, { paddingTop: headerHeight }]}>
        <View style={styles.content}>
          {!isLoading ? (
            <>
              {messages.length > 0 ? (
                <FlatList
                  ref={messageRef}
                  onContentSizeChange={scrollToEnd}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  refreshing={false}
                  contentContainerStyle={[styles.contentContainer]}
                  data={messages}
                  renderItem={({ item, index }) => (
                    <MessageItem key={index} {...item} />
                  )}
                />
              ) : (
                <View style={styles.info}>
                  <CustomText
                    size={TextSize.S_XL}
                    style={[styles.text, { color: cn('white', 'black') }]}>
                    {t('friend.message.empty')}
                  </CustomText>
                </View>
              )}
            </>
          ) : (
            <View style={styles.info}>
              <ActivityIndicator size="large" />
              <CustomText
                size={TextSize.S_XL}
                style={[styles.text, { color: cn('white', 'black') }]}>
                {t('friend.message.emptyLoading')}
              </CustomText>
            </View>
          )}
        </View>
        <SendMessageChat
          scrollToEnd={scrollToEnd}
          onAuthCallBack={onPressLoginHandler}
        />
      </View>
    </ScreenContent>
  );
};
