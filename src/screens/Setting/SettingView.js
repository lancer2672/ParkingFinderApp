import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { UserID_Key } from '@src/utils/localStorage';
import { Text, TouchableHighlight, View } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

const SettingView = () => {
  const resetUser = useUserStore(state => state.resetUser);
  const handleLogout = async () =>{
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem(UserID_Key);
    resetUser();
  }
  const user =  useUserStore(state => state.user);
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        paddingTop: 8,
        gap: 8,
      }}>
                <Heading style={{color: generalColor.primary}}>Thanh toán</Heading>

      <View
        style={{
          flex: 1,
          marginTop: 12,
        }}>
        <TouchableHighlight
          onPress={() => {
            navigate('AddCardView');
          }}
          style={{
            borderRadius: 6,
          }}
          underlayColor={'#4f4e4e'}>
          <View
            style={{
              padding: 12,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: '#333333',
            }}>
            <Material size={28} name="payment" />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
              }}>
              Phương thức thanh toán
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            navigate('PaymentHistory');
          }}
          style={{
            borderRadius: 6,
          }}
          underlayColor={'#4f4e4e'}>
          <View
            style={{
              padding: 12,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: '#333333',
            }}>
            <Material size={28} name="history" />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
              }}>
              Lịch sử giao dịch
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SettingView;
const Heading = styled(Text)`
  font-weight: bold;
  padding-top:12px;
  padding-left:12px;
  font-size: 24px;
  color: black;
`;