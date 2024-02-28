import Emoji from 'node-emoji';
import React from 'react';
import { CustomText } from 'shared/ui/CustomText';
import { countries } from './../model/const/countries';
import { CountriesType } from './../model/types/countries';

type EmojiCountriesProps = {
  name: string;
  size: number;
};

export const EmojiCountries = React.memo(
  ({ name = '', size }: EmojiCountriesProps) => {
    const index = name.toUpperCase();
    const emoji = countries[index as CountriesType]?.flag;

    if (!emoji) {
      const getEmoji = Emoji.get('earth_americas');
      return <CustomText style={{ fontSize: size }}>{getEmoji}</CustomText>;
    }

    const getEmoji = Emoji.get(emoji);
    return <CustomText style={{ fontSize: size }}>{getEmoji}</CustomText>;
  },
);
