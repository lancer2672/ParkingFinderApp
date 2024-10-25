import {generalColor} from '@src/theme/color';
import textStyle from '@src/theme/text';
import {Pressable, StyleSheet, Text, View} from 'react-native';
const ButtonComponent = ({
  outline,
  style = {},
  leftIcon,
  text,
  txtStyle = {},
  onPress,
  color = 'blue', 
}) => {
  return (
    <Pressable onPress={onPress}>
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
          minHeight: 38,
          ...style,
        }}>
        {leftIcon && leftIcon}
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
      </View>
    </Pressable>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
