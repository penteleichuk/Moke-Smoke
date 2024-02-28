import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH, moderateScale } from 'shared/config/dimensions';
import {
  FeedCarouselItem,
  FeedCarouselItemProps,
} from './../FeedCarouselItem/FeedCarouselItem';

type FeedCarouselProps = {
  items: FeedCarouselItemProps[];
};

export const FeedCarousel = ({ items }: FeedCarouselProps) => {
  return (
    <Carousel
      loop={true}
      width={SCREEN_WIDTH}
      height={moderateScale(220)}
      defaultIndex={2}
      snapEnabled={true}
      data={items}
      scrollAnimationDuration={400}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 55,
      }}
      renderItem={({ index, item }) => (
        <FeedCarouselItem
          key={index}
          index={index}
          title={item as unknown as string}
        />
      )}
    />
  );
};
