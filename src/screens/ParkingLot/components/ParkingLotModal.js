import ButtonComponent from '@src/components/Button';
import { parkingslotsMock } from '@src/mock/mock';
import { generalColor } from '@src/theme/color';
import { center, row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ParkingLotModal = ({
  parkingslot = parkingslotsMock[0],
  isVisible,
  handleContinue,
  onClose,
}) => {
  const callAgent = (phoneNumber = '0846303261') => {
    Linking.openURL(`tel:${parkingslot.argent?.phoneNumber}`);
  };
  const onContinue = () => {
    handleContinue();
  };
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="slideInUp"
      backdropOpacity={0}
      useNativeDriver={true}
      animationOut="slideOutDown"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{margin: 0}}>
      <View style={styles.container}>
        <View style={row}>
          <View>
            <Image
              source={{uri: parkingslot.avatar}}
              style={styles.img}></Image>
            {/* <View style={row}>
              <StarRating
                fullStarColor={generalColor.other.yellow}
                disabled={true}
                maxStars={5}
                containerStyle={{marginTop: 8}}
                rating={parkingslot.rating}
                starSize={16}
              />
              <Text style={{lineHeight: 32, color: 'black'}}>
                ({parkingslot.rating})
              </Text>
            </View> */}
            {/* <Text style={{lineHeight: 18, color: 'black'}}>
              (xxx lượt đánh giá)
            </Text> */}
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
              {parkingslot.name}
            </Text>

            <View style={{...row}}>
              <Entypo name="location-pin" size={20}></Entypo>

              <Text
                numberOfLines={2}
                style={{
                  ...textStyle.content.small,
                  marginBottom: 8,
                  flex: 1,
                }}>
                {parkingslot.address}
              </Text>
            </View>
          </View>
        </View>

        <View style={rowCenter}>
          <AntDesign name="wifi" color="black" size={20}></AntDesign>
          <Text style={styles.txt}>Wifi miễn phí</Text>

          <Divider style={{marginLeft: 12}}></Divider>
          <FontAwesome5 name="parking" color="black" size={20}></FontAwesome5>
          <Text style={styles.txt}>Có bãi đỗ xe</Text>

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
          onPress={onContinue}
          style={{marginVertical: 24, marginTop: 40}}
          text={'Tiếp tục'}></ButtonComponent>
      </View>
    </ReactNativeModal>
  );
};

export default ParkingLotModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    height: 280,
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
