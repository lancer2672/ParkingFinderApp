import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '@src/api/auth.api';
import userAPI from '@src/api/user.api';
import ButtonComponent from '@src/components/Button';
import TextInputComponent from '@src/components/TextInputComponent';
import { navigate } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { UserID_Key } from '@src/utils/localStorage';
import { Formik } from 'formik';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { accountSchema } from './component/validateSchema';
const STAFF_EMAIL = "nguyenkhang@gmail.com"
const STAFF_PASSWORD = "JBdragonfire1135@"

//MOCK user 
const userInfo = { "phoneNumber": "jbkhanhtran@gmail.com", hotelId: 16, "firstName": "Khánh", "id": 15, "lastName": "Trần", "phoneNumber": "0846354255", "role": "USER", "status": "ACTIVE" }
const SignIn = () => {
  const setUser = useUserStore  (state => state.setUser);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const [isLoading, setIsloading] = useState(false);
  const handleUserLogin = async(values) => {
    try {
      const data = await authAPI.loginUser(values);
      console.log('data', data);

      let accessToken = data.accessToken;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem(UserID_Key, data.userId.toString());
      return data.userId;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const fetchUserById = async(userId) => {
    try {
      // Assuming there's an API to fetch user by ID
      const data = await userAPI.getUserByID(userId);
      console.log('Fetched user:', data);
      // Set the user in zustandStorage
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const handleFormSubmit = async (values) => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsloading(true);
    try {
      const userId = await handleUserLogin(values);
      await fetchUserById(userId);
      showMessage({
        message: 'Đăng nhập thành công',
        type: 'success',
      });
    } catch (error) {
      console.error('Error during login or fetching user:', error);
      showMessage({
        message: 'Đăng nhập thất bại',
        type: 'danger',
      });
    } finally {
      setIsloading(false);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text
        style={[
          textStyle.h[2],
          {
            fontFamily: 'serif',
            color: 'white',
            marginTop: 12,
            marginBottom: 6,
          },
        ]}>
        Đăng Nhập
      </Text> */}
      <View style={[rowCenter, { marginVertical: 12,  marginTop:40  }]}>
        <View style={styles.sep}></View>
        <Image
          source={require('../../assets/icons/iconapp.png')}
          style={{ width: 120, height: 80 }}
        />
        <View style={styles.sep}></View>
      </View>

      <Formik
        validationSchema={accountSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}>
        {({
          values,
          errors,

          touched,
          handleChange,

          handleSubmit,
        }) => (
          <View style={{ flex: 1, marginTop:40 }}>
            <TextInputComponent
              placeholder="Nhập số điện thoại"
              onChangeText={text => {
                handleChange('phoneNumber')(text);
              }}
              value={values.phoneNumber}
              widthTextInput={'80%'}
              heightTextInput={40}
              leftContent={
                <Fontisto name="phone" color= {generalColor.secondary}  size={20}></Fontisto>
              }
              error={!!errors.phoneNumber && !!touched.phoneNumber}
              errorMessage={errors.phoneNumber}
              styleTextInput={[
                {
                  paddingLeft: 12,
                },
                textStyle.h[5],
              ]}
              style={styles.textinput}
              placeholderColor= {generalColor.secondary} 

            />
            <TextInputComponent
              placeholder="Nhập mật khẩu"
              widthTextInput={'80%'}
              heightTextInput={40}
              secureTextEntry={secureTextEntry}
              leftContent={
                <Entypo name="lock" color={generalColor.secondary} size={20}></Entypo>
              }
              rightContent={
                <Pressable
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}>
                  {/* <Entypo name="eye" color="white" size={20}></Entypo> */}
                  <Entypo
                    name={secureTextEntry ? 'eye-with-line' : 'eye'}
                    color={generalColor.secondary} 
                    size={20}></Entypo>
                </Pressable>
              }
              onChangeText={text => {
                handleChange('password')(text);
              }}
              value={values.password}
              error={!!errors.password && !!touched.password}
              errorMessage={errors.password}
              styleTextInput={[
                {
                  paddingLeft: 12,
                },
                textStyle.h[5],
              ]}
              style={styles.textinput}
              placeholderColor= {generalColor.secondary} 

            />

            <Pressable
              onPress={() => {
                navigate('ForgotPassword');
              }}
              style={{ marginVertical: 12, alignSelf: 'flex-end' }}>
              <Text
                style={{
                  color: generalColor.other.bluepurple,
                  textDecorationLine: 'underline',
                  fontWeight: '500',
                }}>
                Quên mật khẩu
              </Text>
            </Pressable>
            <ButtonComponent
            loadingState={isLoading}
              onPress={() => {
                console.log('press');
                handleSubmit();
              }}
              style={styles.buttonItem}
              text="Đăng nhập"
              color = {generalColor.other.bluepurple}
            />
          </View>
        )}
      </Formik>

      <View style={{}}>
        <Pressable
          onPress={() => {
            navigate('SignUp');
          }}
          style={{
           
            alignSelf: 'center',
        
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
            }}>
            Chưa có tài khoản?{' '}
          </Text>
          <Text
            style={{
              color: generalColor.other.bluepurple,
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}>
            Đăng ký ngay
          </Text>
        </Pressable>

      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: generalColor.other.white,
  },
  buttonItem: {
    marginVertical: 20,
    borderRadius:12,
    paddingVertical: 12,
  },
  image: {
    width: 100,
    height: 100,
  },
  textinput: {
    backgroundColor: undefined,
    borderColor: generalColor.black[50],
    paddingVertical: 4,
    borderBottomWidth: 2,
    color: 'black',
  },
  sep: {
    borderRadius: 50,
    height: 2,
    flex: 1,
  },
  content: {
    color: 'black',
  },
});
