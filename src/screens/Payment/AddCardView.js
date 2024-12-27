import { goBack, navigate } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { Card_Key } from '@src/utils/localStorage';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import { addItem, deleteAllMatchingPattern, getAllValuesMatchingPattern, removeItem } from '../Notification/components/as';
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
  const [selectedCard, setSelectedCard] = useState({});
  // const [isEnabled, setIsEnabled] = useState(user?.cardInfo?.id == selectedCard?.id);
  const [cards,setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    getAllValuesMatchingPattern(Card_Key).then(data => {
      setCards(data);
    });
    return async () => {};
  }, []);
  console.log(">>>>>>>>>>>>>>>user",user.cardInfo, cards);
  const toggleSwitch = async () => {
    // const newIsEnabled = !isEnabled;
    // setIsEnabled(newIsEnabled);
    if (idx == -1) return;
    const card = cards[idx];
    if (user.cardInfo?.id == card.id) {
      setUser({
        ...user,
        cardInfo: null,
      });
      await removeItem(Card_Key);
      return;
    }
    setUser({
      ...user,
      cardInfo:  card,
    });
    await addItem(Card_Key, card);
  };
  const handleDeleteCard =async () =>{
    if (idx == -1) return;
    const card = cards[idx];
    if(user.cardInfo?.id == card.id){
      Alert.alert("Thông báo","Bạn không thể xoá thẻ mặc định")
      return;
    }
    
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xoá thẻ này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
            await removeItem(Card_Key + "-" + card.id);
            await deleteAllMatchingPattern(Card_Key);
            getAllValuesMatchingPattern(Card_Key).then(data => {
              setIdx(0);
              setCards(data);
            });
            showMessage({
              message: "Xoá thẻ thành công",
              type: "success",
            });
          }}
      ]
    );
  }
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

          {
            cards.length == 0 && 
            <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Không có thẻ nào</Text>

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
          }
          {
            cards.length > 0 &&
            <>
        
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
              value={user.cardInfo?.id == cards[idx]?.id}
            />
            <Text>Đặt làm phương thức mặc định</Text>
            </View>

{
  cards.length > 0 && 
  <>
 
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
                color:"black",
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
            {/* <View
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
            </View> */}
          </View>
          <TouchableHighlight
            onPress={handleDeleteCard}
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
 </>
}
</View>
      </View>
          </>
          }

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