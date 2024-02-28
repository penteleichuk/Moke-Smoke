import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './IndicatorStyle';

export const Indicator = React.memo(() => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <ActivityIndicator size="small" />
      </View>
    </View>
  );
});
