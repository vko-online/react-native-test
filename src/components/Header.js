import React from 'react';
import {
  View, StyleSheet, Text, Platform, StatusBar,
} from 'react-native';

const s = StyleSheet.create({
  root: {
    marginTop: Platform.select({ ios: 40, android: StatusBar.currentHeight }),
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default function Component({ title }) {
  return (
    <View style={s.root}>
      <Text style={s.title}>{title}</Text>
    </View>
  );
}
