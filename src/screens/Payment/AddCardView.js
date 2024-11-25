import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  Pressable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import CardComponent from './components/CardComponent';
import React, {useState} from 'react';
import Material from 'react-native-vector-icons/MaterialIcons';
import {goBack} from '@src/navigation/NavigationController';

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
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
          marginBottom: 24,
          alignItems: 'center',
          gap: 18,
          paddingHorizontal: 12,
          backgroundColor: 'white',
        }}>
        <Pressable onPress={() => goBack()}>
          <Material name="arrow-back" size={24} />
        </Pressable>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
          }}>
          Phương thức thanh toán
        </Text>
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
