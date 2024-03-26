import { ImageSourcePropType } from 'react-native';
import * as Images from 'shared/assets/images';
import { FeedEventTypes } from './../types/feeds';

export const FeedIconEmotion: Record<FeedEventTypes, ImageSourcePropType> = {
  success: Images.SuccessEM,
  wrong: Images.WrongEM,
  danger: Images.DangerEM,
};
