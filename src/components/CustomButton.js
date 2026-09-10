import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({
  children,
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  textColor,
  style,
  textStyle,
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'danger':
        return styles.danger;
      case 'outline':
        return styles.outline;
      case 'primary':
      default:
        return styles.primary;
    }
  };

  const getVariantTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'danger':
        return styles.textDanger;
      case 'outline':
        return styles.textOutline;
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      case 'medium':
      default:
        return styles.medium;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.baseButton,
        getVariantStyle(),
        getSizeStyle(),
        backgroundColor && { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
    >
      {typeof children === 'string' || typeof title === 'string' ? (
        <Text
          style={[
            styles.baseText,
            getVariantTextStyle(),
            textColor && { color: textColor },
            textStyle,
          ]}
        >
          {children || title}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

CustomButton.defaultProps = {
  disabled: false,
  variant: 'primary',
  size: 'medium',
  backgroundColor: null,
  textColor: null,
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  primary: {
    backgroundColor: '#6366F1',
  },
  secondary: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  danger: {
    backgroundColor: '#DC2626',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  disabled: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#F8FAFC',
  },
  textDanger: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#818CF8',
  },
});
