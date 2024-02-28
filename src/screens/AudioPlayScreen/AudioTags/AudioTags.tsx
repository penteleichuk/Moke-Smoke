import { ColorValue, View } from 'react-native';
import { CustomText } from 'shared/ui/CustomText';
import { styles } from './AudioTagsStyle';

type AudioTagsProps = {
  tags: string[];
  backgroundColor: ColorValue;
  color: ColorValue;
};

export const AudioTags = ({ tags, backgroundColor, color }: AudioTagsProps) => {
  return (
    <View style={styles.container}>
      {tags.map(text => (
        <View key={text} style={[styles.tag, { backgroundColor }]}>
          <CustomText style={{ color }}>{text}</CustomText>
        </View>
      ))}
    </View>
  );
};
