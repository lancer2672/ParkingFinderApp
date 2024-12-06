import parkingLotAPI from '@src/api/parkingLot.api';
import ButtonComponent from '@src/components/Button';
import { parkingslotsMock } from '@src/mock/mock';
import { navigate } from '@src/navigation/NavigationController';
import { generalColor } from '@src/theme/color';
import { center, row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ReactNativeModal from 'react-native-modal';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Booking from './Booking';

const ParkingLotModal = ({
  parkingslot = parkingslotsMock[0],
  isVisible,
  carType,
  handleContinue,
  onClose,
  navigation,
}) => {
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [freeSlot, setFreeSlot] = useState(0);
  const callAgent = (phoneNumber = '0846303261') => {
    Linking.openURL(`tel:${parkingslot.agent?.phoneNumber}`);
  };

  const onContinue = () => {
    // onClose();
    if(freeSlot == 0){
      showMessage({
        message: 'Không đủ chỗ trống',
        type: 'error',
      });
      return
    }
    handleContinue();
    setIsBookingVisible(true);
  };

  const fetchFreeSlots = async () =>{
    const data = await parkingLotAPI.getFreeSlots({
      parkingLotId: parkingslot.id,
      //checkInTime=2024-10-23T10:03:00
      checkIn: new Date().toISOString(),
      carType: carType,
    })
    if (data){
      setFreeSlot(data);
    }
  }
  console.log('ParkingLotModal props:', { parkingslot, isVisible, navigation });
  useEffect(() => {
    if(isVisible){
      fetchFreeSlots()
    }
  }, [isVisible]);
  return (
    <>
      <ReactNativeModal
        isVisible={isVisible}
        animationIn="slideInUp"
        backdropOpacity={0.5}
        useNativeDriver={true}
        animationOut="slideOutDown"
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{ margin: 0 }}>
        <View style={styles.container}>
          <View style={row}>
            <View>
              <Image
                source={{ uri: parkingslot.avatar }}
                style={styles.img}></Image>
            </View>
            <View
              style={{
                marginLeft: 12,
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  ...textStyle.content.medium,
                  fontWeight: '500',
                  marginBottom: 8,
                  color: generalColor.primary,
                }}>
                {parkingslot.name} ({freeSlot} chỗ trống)
              </Text>

              <View style={{ ...row }}>
                <Entypo name="location-pin" size={20}></Entypo>

                <Text
                  numberOfLines={2}
                  style={{
                    ...textStyle.content.small,

                    flex: 1,
                  }}>
                  {parkingslot.address}
                </Text>
              </View>
              <Text
                style={{
                  ...textStyle.content.small,
                  color: generalColor.strongprimary,
                  flex: 1,
                }}>
                4.3 (120 lượt đánh giá)
              </Text>
            </View>
          </View>

          <View style={rowCenter}>
            <AntDesign name="wifi" color="black" size={20}></AntDesign>
            <Text style={styles.txt}>Wifi miễn phí</Text>

            <Divider style={{ marginLeft: 12 }}></Divider>
     

            <TouchableOpacity
              style={{
                ...center,
                marginLeft: 'auto',
                borderRadius: 25,
                backgroundColor: generalColor.primary,
                width: 50,
                height: 50,
              }}
              onPress={callAgent}>
              <Feather name="phone-call" color="white" size={20}></Feather>
            </TouchableOpacity>
          </View>
          <ButtonComponent
            leftIcon={
              <FontAwesome
                name="commenting-o"
                color={generalColor.white[100]}
                size={24}></FontAwesome>
            }
            onPress={() => {
              navigate('Review');
              onClose();
            }}
            color={generalColor.other.bluepurple}
            style={{marginVertical: 24, marginTop: 40, borderRadius: 12}}
            text={'Xem đánh giá'}></ButtonComponent>
          <ButtonComponent
            onPress={onContinue}
            color={generalColor.other.bluepurple}
            style={{marginVertical: 24, marginTop: 0, borderRadius: 12}}
            text={'Tiếp tục'}></ButtonComponent>
        </View>
      </ReactNativeModal>

      <Booking
        isVisible={isBookingVisible}
        onClose={() => setIsBookingVisible(false)}
        route={{ params: { parkingslot } }}
        
      />
    </>
  );
};

export default ParkingLotModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    height: 340,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  txt: {
    ...textStyle.content.medium,
    color: 'black',
    marginLeft: 4,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
