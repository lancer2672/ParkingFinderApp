import { goBack } from '@src/navigation/NavigationController';
import { generalColor } from '@src/theme/color';
import { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import CardComponent from './components/CardComponent';

const AddCardView = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <Heading style={{color: generalColor.primary}}>Phương thức thanh toán</Heading>
      </View>

      <View style={styles.container}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <CardComponent />
          </View>
          <View style={styles.slide2}>
            <CardComponent />
          </View>
          <View style={styles.slide3}>
            <CardComponent />
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
              trackColor={{false: '#767577', true: '#81b0ff'}}
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
              value="**** **** **** 8104"
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
                value="09/25"
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
            onPress={() => {}}
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