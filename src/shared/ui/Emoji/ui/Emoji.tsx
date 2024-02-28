import * as Emojies from 'node-emoji';
import React from 'react';
import { CustomText } from 'shared/ui/CustomText';

type EmojiProps = {
  name: string;
  size: number;
};

export const Emoji = React.memo(({ name, size }: EmojiProps) => {
  const emoji = Emojies.get(name);
  return <CustomText style={{ fontSize: size }}>{emoji}</CustomText>;
});
