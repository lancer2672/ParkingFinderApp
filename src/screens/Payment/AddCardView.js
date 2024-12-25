import { goBack } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import CardComponent from './components/CardComponent';
import { navigate } from '@src/navigation/NavigationController';

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

  const toggleSwitch = () => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    setUser({
      ...user,
      cardInfo: newIsEnabled ? selectedCard : null,
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
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          onIndexChanged={(index) => {
            setSelectedCard(mockCards[index]);
            setIsEnabled(user?.cardInfo?.id === mockCards[index].id);
          }}
        >
          <View style={styles.slide1}>
            <CardComponent card={mockCards[0]} />
          </View>
          <View style={styles.slide2}>
            <CardComponent card={mockCards[1]} />
          </View>
          <View style={styles.slide3}>
            <CardComponent card={mockCards[2]} />
          </View>
        </Swiper>
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
              value={selectedCard.cardNumber}
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
                value={selectedCard.expiryDate}
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
              backgroundColor: '#613EEA',
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