import { generalColor } from '@src/theme/color';
import textStyle from '@src/theme/text';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
const ButtonComponent = ({
  outline,
  style = {},
  leftIcon,
  text,
  txtStyle = {},
  onPress,
  color = 'blue', 
  loadingState = false,
}) => {
  return (
    <Pressable onPress={onPress} disabled={loadingState}>
      <View
        style={{
          backgroundColor: outline ? undefined :color,
          borderRadius: 2,
          alignItems: 'center',
          borderColor: color,
          borderWidth: outline ? 2 : 0,
          justifyContent: 'center',
          padding: 10,
          flexDirection: 'row',
          minHeight: 52, 
          ...style,
        }}>
        {leftIcon && leftIcon}
        {loadingState ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              color: outline ? generalColor.primary : 'white',

              textAlign: 'center',
              marginHorizontal: 4,
              ...textStyle.h[4],
              ...txtStyle,
            }}>
            {text}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
