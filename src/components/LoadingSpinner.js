import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'large',
  color,
  style,
}) {
  const { theme } = useTheme();
  const spinnerColor = color || theme.primary;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message ? (
        <Text style={[styles.message, { color: theme.textMuted }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 10,
  },
});
