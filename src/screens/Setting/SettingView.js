import {navigate} from '@src/navigation/NavigationController';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';

const SettingView = () => {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        paddingTop: 100,
        gap: 8,
      }}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Image
          source={require('../../assets/imgs/DefaultAvatar.png')}
          style={{
            width: 77,
            height: 77,
            borderRadius: 1000000,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          alignSelf: 'center',
        }}>
        Nguyễn Văn A
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: 40,
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
            navigate('ParkingHistory');
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

        <TouchableHighlight
          onPress={() => {}}
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
            <Material size={28} name="logout" color={'tomato'} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
                color: 'tomato',
              }}>
              Đăng xuất
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SettingView;
