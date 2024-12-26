import { goBack, navigate } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { Card_Key } from '@src/utils/localStorage';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import { getAllValuesMatchingPattern } from '../Notification/components/as';
import { AdvancedCardSlider } from './components/CardCarousel';

const mockCards = [
  {
    id: 1,
    cardNumber: '**** **** **** 8104',
    cardHolder: 'NGUYEN DUC PHUONG',
    expiryDate: '08/21',
    type: 'visa',
  },
  {
    id: 2,
    cardNumber: '**** **** **** 4582',
    cardHolder: 'NGUYEN DUC PHUONG',
    expiryDate: '12/24',
    type: 'visa',
  },
  {
    id: 3,
    cardNumber: '**** **** **** 9231',
    cardHolder: 'NGUYEN DUC PHUONG',
    expiryDate: '03/23',
    type: 'visa',
  },
];

const AddCardView = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [selectedCard, setSelectedCard] = useState(mockCards[0]);
  const [isEnabled, setIsEnabled] = useState(user?.cardInfo?.id === selectedCard.id);
  const [cards,setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    getAllValuesMatchingPattern(Card_Key).then(data => {
      setCards(data);
    });
    return async () => {};
  }, []);
  console.log(">>>>>>>>>>>>>>>CARDS",cards);
  const toggleSwitch = () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    setUser({
      ...user,
      cardInfo: newIsEnabled ? cards[idx] : null,
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          // borderBottomWidth: 2,
          borderBottomColor: generalColor.primary,
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <AntDesign name="arrowleft" size={24} color={generalColor.primary} />
        </TouchableOpacity>
        <Heading style={{ color: generalColor.primary }}>
          Phương thức thanh toán
        </Heading>
      </View>

      <View style={styles.container}>
        <AdvancedCardSlider
          cards={cards}
          initialIndex={idx}
          onCardChange={setIdx}></AdvancedCardSlider>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            borderRadius: 12,
            display: 'flex',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 8px 20px 0px #7A7A7B52',
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 32,
            gap: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              ios_backgroundColor="#3e3e3e"
              thumbColor={'#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text>Đặt làm phương thức mặc định</Text>
          </View>

          <View
            style={{
              height: 60,
            }}>
            <Text>Mã thẻ</Text>
            <TextInput
              value={cards[idx].cardNumber}
              editable={false}
              style={{
                flex: 1,
                fontSize: 20,
                letterSpacing: 2,
              }}></TextInput>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <View
              style={{
                height: 60,
              }}>
              <Text>Ngày hết hạn</Text>
              <TextInput
                value={cards[idx].expiryDate}
                editable={false}
                style={{
                  flex: 1,
                  fontSize: 20,
                }}></TextInput>
            </View>
            <View
              style={{
                height: 60,
              }}>
              <Text>CVV</Text>
              <TextInput
                value={'324'}
                editable={false}
                style={{
                  flex: 1,
                  fontSize: 20,
                }}></TextInput>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => { }}
            style={{
              borderRadius: 6,
            }}
            underlayColor={'#cf0023'}>
            <View
              style={{
                backgroundColor: '#ff002b',
                padding: 12,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Xoá
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          onPress={() => {
            navigate('AddCardComonent');

          }}
          style={{
            borderRadius: 6,
            marginTop: 20,
          }}
          underlayColor={'#cf0023'}>
          <View
            style={{
              backgroundColor: generalColor.other.bluepurple,
         
              padding: 12,
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Thêm mới thẻ
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AddCardView;

const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingHorizontal: 20,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
const Heading = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  color: black;
`;