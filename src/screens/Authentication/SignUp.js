import ButtonComponent from '@src/components/Button';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import TextInputComponent from '@src/components/TextInputComponent';
import { navigate } from '@src/navigation/NavigationController';
import { generalColor } from '@src/theme/color';
import { row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { Formik } from 'formik';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { signUpSchema } from './component/validateSchema';
const SignUp = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    phoneNumber: '',
    lastName: '',
  };
  const handleFormSubmit = async data => {
    console.log('DATA', data);
    try {
      setIsloading(true);
      showMessage({
        message: `Đăng ký thành công`,
        type: 'success',
      });
      navigate('SignIn');
    } catch {
      showMessage({
        message: `Đăng ký thất bại`,
        type: 'danger',
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{
        alignSelf: 'center',
        marginTop: 30,
        alignItems: 'center',

        justifyContent: 'center',
        marginBottom: 12,
        flexDirection: 'row',
      }}>

        <Image
          source={require('../../assets/icons/iconapp.png')}
          style={{ width: 180, height: 70 }}
        />

      </View>
      {/* <Text
        style={[
          textStyle.h[2],
          {
            fontFamily: 'serif',
            color: 'black',
            marginTop: 12,
            marginBottom: 6,
          },
        ]}>
        Đăng Ký
      </Text> */}
      <Text style={styles.content}>Điền thông tin bên dưới</Text>

      {/* <View style={[rowCenter, {marginVertical: 12}]}>
        <View style={styles.sep}></View>

        <View style={styles.sep}></View>
      </View> */}

      <Formik
        validationSchema={signUpSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}>
        {({
          values,
          errors,

          touched,
          handleChange,

          handleSubmit,
        }) => (
          <>
            <View style={[row, { justifyContent: 'space-between' }]}>
              <View style={{ flex: 1 }}>
                <TextInputComponent
                  placeholder="Nhập Tên"
                  onChangeText={text => {
                    handleChange('firstName')(text);
                  }}
                  value={values.firstName}
                  widthTextInput={'80%'}
                  labelStyle={{ color: 'black' }}
                  heightTextInput={40}
                  error={!!errors.firstName && !!touched.firstName}
                  errorMessage={errors.firstName}
                  styleTextInput={[textStyle.h[5]]}
                  style={styles.textinput}
                  placeholderColor="black"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextInputComponent
                  placeholder="Nhập Họ"
                  onChangeText={text => {
                    handleChange('lastName')(text);
                  }}
                  value={values.lastName}
                  widthTextInput={'90%'}
                  labelStyle={{ color: 'black' }}
                  heightTextInput={40}
                  error={!!errors.lastName && !!touched.lastName}
                  errorMessage={errors.lastName}
                  styleTextInput={[textStyle.h[5]]}
                  style={styles.textinput}
                  placeholderColor="black"
                />
              </View>
            </View>
            <TextInputComponent
              placeholder="Nhập số điện thoại"
              widthTextInput={'80%'}
              heightTextInput={40}
              keyboardType="numeric"
              labelStyle={{ color: 'black' }}
              onChangeText={text => {
                handleChange('phoneNumber')(text);
              }}
              value={values.phoneNumber}
              error={!!errors.c && !!touched.phoneNumber}
              errorMessage={errors.phoneNumber}
              styleTextInput={[
                {
                  paddingLeft: 12,
                },
                textStyle.h[5],
              ]}
              style={styles.textinput}
              placeholderColor="black"
            />
            <TextInputComponent
              placeholder="Nhập Email"
              onChangeText={text => {
                handleChange('email')(text);
              }}
              value={values.email}
              widthTextInput={'80%'}

              labelStyle={{ color: 'black' }}
              heightTextInput={40}
              leftContent={
                <Fontisto name="email" color="black" size={20}></Fontisto>
              }
              error={!!errors.email && !!touched.email}
              errorMessage={errors.email}
              styleTextInput={[
                {
                  paddingLeft: 12,
                },
                textStyle.h[5],
              ]}
              style={styles.textinput}
              placeholderColor="black"
            />

            <TextInputComponent
              placeholder="Nhập mật khẩu"
              widthTextInput={'80%'}
              heightTextInput={40}

              labelStyle={{ color: 'black' }}
              secureTextEntry={secureTextEntry}
              leftContent={
                <Entypo name="lock" color="black" size={20}></Entypo>
              }
              rightContent={
                <Pressable
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}>
                  {/* <Entypo name="eye" color="white" size={20}></Entypo> */}
                  <Entypo
                    name={secureTextEntry ? 'eye-with-line' : 'eye'}
                    color="black"
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
              placeholderColor="black"
            />

            <ButtonComponent
              onPress={() => {
                console.log('press');
                handleSubmit();
              }}
              style={styles.buttonItem}
              text="Tạo tài khoản"
            />
            <Pressable
              onPress={() => {
                navigate('SignIn');
              }}
              style={{
                alignSelf: 'center',
                marginTop: 30,
                alignItems: 'center',

                justifyContent: 'center',
                marginBottom: 12,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'black',
                }}>
                Đã có tài khoản{' '}
              </Text>
              <Text
                style={{
                  color: 'blue',
                  textDecorationLine: 'underline',
                  fontWeight: '500',
                }}>
                Đăng nhập
              </Text>
            </Pressable>
          </>
        )}
      </Formik>

      <LoadingModal
        onClose={() => {
          setIsloading(false);
        }}
        visible={isLoading}></LoadingModal>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: generalColor.other.white,
  },
  buttonItem: {
    marginVertical: 20,
    paddingVertical: 12,
  },
  textinput: {
    backgroundColor: undefined,
    borderColor: generalColor.black[50],
    paddingVertical: 4,
    borderWidth: 2,
  },
  sep: {
    backgroundColor: '#666',
    borderRadius: 50,
    height: 2,
    flex: 1,
  },
  content: {
    color: 'black',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
