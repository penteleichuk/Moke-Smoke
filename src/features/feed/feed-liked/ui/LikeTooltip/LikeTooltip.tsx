import { FeedEvent, FeedEventTypes } from 'entities/feed';
import { RefObject, memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Tooltip from 'rn-tooltip';
import * as Images from 'shared/assets/images';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

type LikeTooltipProps = {
  id: string;
  tooltipRef: RefObject<Tooltip>;
  onLikedHandler: (eventType: FeedEventTypes, id: string) => void;
};

export const LikeTooltip = memo((props: LikeTooltipProps) => {
  const { id, tooltipRef, onLikedHandler } = props;

  const onSelectHandler = (eventType: FeedEventTypes) => {
    tooltipRef?.current?.toggleTooltip();
    onLikedHandler(eventType, id);
  };

  return (
    <View style={styles.container}>
      <PressableOpacity onPress={() => onSelectHandler(FeedEvent.SUCCESS)}>
        <Image source={Images.SuccessEM} style={styles.image} />
      </PressableOpacity>
      <PressableOpacity onPress={() => onSelectHandler(FeedEvent.WRONG)}>
        <Image source={Images.WrongEM} style={styles.image} />
      </PressableOpacity>
      <PressableOpacity onPress={() => onSelectHandler(FeedEvent.DANGER)}>
        <Image source={Images.DangerEM} style={styles.image} />
      </PressableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});
