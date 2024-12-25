import { generalColor } from '@src/theme/color';
import { rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { SCREEN_HEIGHT } from '@src/utils/constant';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ESort = {
  NEWEST: 'NEWEST',
  OLDEST: 'OLDEST',
  MOST_VOTE: 'MOST_VOTE',
}
const SortModal = ({isVisible,sltxSort, onPress, onClose}) => {
  const handleItemClick = (v) => {
    onPress(v)
    onClose();
  };
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="slideInUp"
      useNativeDriver={true}
      animationOut="slideOutDown"
      style={{justifyContent: 'flex-end', margin: 0}}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.mark}></View>
        <Text style={{...textStyle.h[4], marginBottom: 12, color: 'white'}}>
          Sắp xếp theo
        </Text>
        <Item
          isSelected={sltxSort == ESort.NEWEST}
          onPress={()=>handleItemClick(ESort.NEWEST)}
          content="Đánh giá mới nhất"
          icon={
            <AntDesign name="star" color={'white'} size={28}></AntDesign>
          }></Item>
        <Item
          isSelected={sltxSort == ESort.OLDEST}
          onPress={()=>handleItemClick(ESort.OLDEST)}
          content="Đánh giá cũ nhất"
          
          icon={
            <FontAwesome name="dollar" color={'white'} size={28}></FontAwesome>
          }></Item>
        <Item
          isSelected={sltxSort == ESort.MOST_VOTE}
          onPress={()=>handleItemClick(ESort.MOST_VOTE)}
          content="Nhiều lượt vote nhất"
          icon={
            <FontAwesome name="dollar" color={'white'} size={28}></FontAwesome>
          }></Item>
      </View>
    </ReactNativeModal>
  );
};
const Item = ({icon, content, onPress,isSelected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...rowCenter, marginVertical: 8}}>
        {/* <View style={{minWidth: 30}}>{icon}</View> */}
        <Text style={styles.content}>{content}</Text>
        {isSelected && <Entypo name="check" color={'white'} size={24}></Entypo>}
      </View>
    </TouchableOpacity>
  );
};
export default SortModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: generalColor.primary,
    marginTop: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: (SCREEN_HEIGHT * 2) / 7,
  },
  content: {
    marginLeft: 12,
    flex: 1,
    ...textStyle.content.medium,
    color: 'white',
  },
  mark: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 4,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 8,
  },
});
