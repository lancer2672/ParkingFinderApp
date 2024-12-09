import { Image, StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const CardComponent = () => {
  const mockCards = [
    {
      id: 1,
      cardNumber: '**** **** **** 8104',
      cardHolder: 'NGUYEN DUC PHUONG',
      expiryDate: '08/21',
      type: 'visa'
    },
    {
      id: 2, 
      cardNumber: '**** **** **** 4582',
      cardHolder: 'NGUYEN DUC PHUONG',
      expiryDate: '12/24',
      type: 'visa'
    },
    {
      id: 3,
      cardNumber: '**** **** **** 9231',
      cardHolder: 'NGUYEN DUC PHUONG', 
      expiryDate: '03/23',
      type: 'visa'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/imgs/visa.png')}
          style={{width: 30, height: 30}}
        />
        <Feather name="more-horizontal" color={'#FFFFFF'} size={18} />
      </View>
      <Text style={styles.cardNumber}>{mockCards[0].cardNumber}</Text>
      <View style={styles.information}>
        <View style={styles.cardHolder}>
          <Text style={styles.subTitle}>Tên chủ thẻ</Text>
          <Text style={styles.content}>{mockCards[0].cardHolder}</Text>
        </View>

        <View style={styles.expires}>
          <Text style={styles.subTitle}>Ngày hết hạn</Text>
          <Text style={styles.content}>{mockCards[0].expiryDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: 300,
    height: 160,
    backgroundColor: '#8676FB',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    letterSpacing: 2,
    verticalAlign: 'middle',
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardHolder: {
    flex: 1,
    flexShrink: 0,
  },
  expires: {
    flexShrink: 0,
  },
  subTitle: {
    fontWeight: '400',
    textTransform: 'uppercase',
    fontSize: 8,
    color: 'white',
  },
  content: {
    fontWeight: '600',
    fontSize: 12,
    color: 'white',
  },
});
