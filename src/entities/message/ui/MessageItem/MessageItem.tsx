import { getIsAuth } from 'entities/auth';
import React, { useRef } from 'react';
import { View } from 'react-native';
import Tooltip from 'rn-tooltip';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { abbreviateNumber } from 'shared/lib/format/abbreviateNumber';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { MessageTail } from './../MessageTail/MessageTail';
import { MessageTooltip } from './../MessageTooltip/MessageTooltip';
import { styles } from './MessageItemStyle';

export type MessageType = {
  message: string;
  name: string;
  rating: string;
  email: string;
  me: boolean;
  premium: boolean;
};

const ICON_SIZE = moderateScale(13);

export const MessageItem = React.memo((props: MessageType) => {
  const isAuth = useAppSelector(getIsAuth);
  const tooltipRef = useRef<Tooltip>(null);

  const { cn } = useTheme();

  return (
    <View style={styles.container}>
      <Tooltip
        ref={tooltipRef}
        actionType={isAuth ? 'longPress' : 'none'}
        popover={<MessageTooltip tooltipRef={tooltipRef} />}
        overlayColor={cn('slate.900') + '99'}
        pointerColor={cn('slate.600')}
        width={200}
        backgroundColor={cn('slate.600')}>
        <View
          style={[
            styles.content,
            props.me && styles.me,
            {
              backgroundColor: cn('slate.800', 'slate.50'),
            },
          ]}>
          <MessageTail
            direction={props.me ? 'right' : 'left'}
            fill={cn('slate.800', 'slate.50')}
          />
          <View style={styles.header}>
            <View style={styles.data}>
              {props.premium && (
                <Icons.Mark
                  style={styles.icon}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  fill={cn('orange.300', 'orange.500')}
                />
              )}
              <CustomText
                size={TextSize.S_XL}
                weight={TextWeight.MEDIUM}
                style={{ color: cn('white', 'slate.700') }}>
                {props.name}
              </CustomText>
            </View>
            <View style={styles.rating}>
              <Icons.ArowTop
                width={ICON_SIZE}
                height={ICON_SIZE}
                fill={cn('indigo.300', 'indigo.400')}
              />
              <CustomText
                size={TextSize.S_XL}
                weight={TextWeight.BOLD}
                style={{ color: cn('indigo.300', 'indigo.400') }}>
                {abbreviateNumber(props.rating || 0, 0)}
              </CustomText>
            </View>
          </View>

          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('slate.300', 'black') }]}>
            {props.message}
          </CustomText>
        </View>
      </Tooltip>
    </View>
  );
});
