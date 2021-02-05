import React from 'react';
import {
  Image, View, StyleSheet, Text,
} from 'react-native';

// sonplaceholder doesn't have images
const avatar = require('./avatar.png');

const SIZE = 64;
const PADDING = 16;
const s = StyleSheet.create({
  root: {
    padding: PADDING,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 24,
    width: SIZE,
    height: SIZE,
    borderRadius: 32,
  },
});

export default function Component({ item }) {
  return (
    <View style={s.root}>
      <Image source={avatar} style={s.avatar} />
      <Text>{item.title.substring(0, 30)}</Text>
    </View>
  );
}
