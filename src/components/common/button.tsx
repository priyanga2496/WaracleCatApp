//button.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  rest?: TouchableOpacityProps;
} & TouchableOpacityProps;

const Button = ({
  title = '',
  disabled = false,
  loading = false,
  loadingColor = 'white',
  onPress,
  containerStyle,
  textStyle,
  rest,
}: Props) => {
  const handleOnPress = () => {
    onPress();
    
  };
  return (
    <TouchableOpacity
      {...rest}
      onPress={handleOnPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, containerStyle, {opacity: disabled ? 0.5 : 1}]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {loading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="small"
          color={loadingColor}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    flexDirection: 'row',
    backgroundColor: '#7A57D1',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginLeft: 4,
  },
});

export default Button;
