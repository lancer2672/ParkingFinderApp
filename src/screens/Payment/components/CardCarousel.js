import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import CardComponent from './CardComponent';

const { width: screenWidth } = Dimensions.get('window');

export const AdvancedCardSlider = ({ 
  cards, 
  initialIndex = 0,
  autoPlay = false,
  onCardChange,
}) => {
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth / 1.5,
  };

  const animationStyle = React.useCallback((value) => {
    'worklet';

    const zIndex = interpolate(
      value,
      [-1, 0, 1],
      [10, 20, 30],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      value,
      [-1, 0, 1],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      value,
      [-1, 0, 1],
      [0.75, 1, 0.75],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }],
      zIndex,
      opacity,
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={autoPlay}
        autoPlayInterval={3000}
        data={cards}
        defaultIndex={initialIndex}
        scrollAnimationDuration={1000}
        onSnapToItem={onCardChange}
        renderItem={({ item, index, animationValue }) => {
          return (
            <Animated.View 
              style={[
                styles.cardContainer,
                useAnimatedStyle(() => animationStyle(animationValue.value))
              ]}
            >
              <CardComponent 
                card={item}
                style={styles.card}
              />
            </Animated.View>
          );
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
