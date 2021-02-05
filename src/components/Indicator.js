import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const BALLS = 2;
const FROM = 64;
const SIZE = 16;
const TO = 89;
const COLOR = '#7FB900';

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: TO,
    height: TO,
    position: 'relative',
  },
  middle: {
    backgroundColor: COLOR,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  outer: {
    backgroundColor: COLOR,
    borderRadius: TO / 2,
    position: 'absolute',
    opacity: 0.2,
  },
});

export default function Component() {
  const values = useRef(Array.from({ length: BALLS }).map(() => new Animated.Value(0)));

  function animate() {
    const animations = values.current?.map((value) => {
      value.setValue(0);
      return Animated.timing(value, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      });
    });
    Animated.stagger(1500, animations).start(() => {
      animate();
    });
  }

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={s.root}>
      <View style={s.middle} />
      {
        values.current.map((value, index) => {
          const size = value.interpolate({
            inputRange: [0, 1],
            outputRange: [FROM, TO],
          });

          const opacity = value.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.1, 0.1, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md#when-not-to-use-it
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={[s.outer, { opacity, width: size, height: size }]}
            />
          );
        })
      }
    </View>
  );
}
