import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

interface ActionButton {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  color?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  fixed?: boolean;
  position?: 'bottom' | 'top';
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  fixed = false,
  position = 'bottom',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
    }).start();
    setIsExpanded(!isExpanded);
  };

  if (fixed) {
    return (
      <View style={[styles.container, position === 'bottom' ? styles.bottom : styles.top]}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: button.color || colors.primary.light }]}
            onPress={button.onPress}
          >
            <Ionicons name={button.icon} size={24} color="white" />
            <Text style={styles.actionButtonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, position === 'bottom' ? styles.bottom : styles.top]}>
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: colors.primary.light }]}
        onPress={toggleExpanded}
      >
        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
      </TouchableOpacity>

      {buttons.map((button, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(index + 1) * 60],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.actionButton,
              { backgroundColor: button.color || colors.primary.light },
              {
                transform: [{ translateY }],
                opacity: animation,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => {
                button.onPress();
                toggleExpanded();
              }}
            >
              <Ionicons name={button.icon} size={24} color="white" />
              <Text style={styles.actionButtonText}>{button.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    zIndex: 1000,
  },
  bottom: {
    bottom: 16,
  },
  top: {
    top: 16,
  },
  mainButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButton: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 