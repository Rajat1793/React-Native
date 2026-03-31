import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

interface KiGaugeProps {
  percent: number;
  style?: ViewStyle;
  glowColor?: string;
}

export function KiGauge({ percent, style, glowColor = '#ffd709' }: KiGaugeProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: Math.max(0, Math.min(100, percent)),
      duration: 850,
      useNativeDriver: false,
    }).start();
  }, [percent, widthAnim]);

  return (
    <View style={[styles.track, style]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            shadowColor: glowColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#1D2636',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FFD709',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
});
