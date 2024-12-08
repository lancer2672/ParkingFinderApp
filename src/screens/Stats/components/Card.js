import {StyleSheet, View} from 'react-native';

const Card = ({children, style, variant = 'default'}) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryCard;
      case 'outline':
        return styles.outlineCard;
      default:
        return styles.defaultCard;
    }
  };

  return <View style={[styles.card, getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  defaultCard: {
    backgroundColor: 'white',
  },
  primaryCard: {
    backgroundColor: '#e6f2ff',
    borderColor: '#b3d9ff',
    borderWidth: 1,
  },
  outlineCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default Card;
