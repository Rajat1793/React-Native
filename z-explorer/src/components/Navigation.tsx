import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TopBarProps = {
  title?: string;
};

export function TopBar({ title = 'Z-EXPLORER' }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }] }>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  title: {
    color: '#FF9F4A',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
