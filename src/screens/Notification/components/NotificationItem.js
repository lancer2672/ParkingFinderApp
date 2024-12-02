import AntDesign from 'react-native-vector-icons/AntDesign';

import {generalColor} from '@src/theme/color';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {addItem, getNotiKey, removeItem} from './as';

export const getTimeDifference = pastDate => {
  const now = new Date();
  const diff = Math.abs(now - new Date(pastDate)); // Khoảng cách thời gian tính bằng milliseconds

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (weeks > 0) return `${weeks} tuần trước`;
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return 'Vừa xong';
};

const NotificationItem = ({notification = {}, onUpdate}) => {
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);

  const navigateToGuest = async () => {
    await addItem(getNotiKey(notification.createdAt.toString()), {
      ...notification,
      isSeen: true,
    });
    await onUpdate();
  };

  return (
    <TouchableOpacity
      onPress={navigateToGuest}
      onLongPress={() => setBottomMenuVisible(true)}
      style={[
        styles.notificationItem,
        {backgroundColor: notification.isSeen ? 'white' : generalColor.primary},
      ]}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/icons/iconapp.png')}
      />
      <View style={{flex: 1}}>
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.notificationContent,
              {color: notification.isSeen ? generalColor.primary : 'white'},
            ]}>
            {notification.title}
          </Text>
          <Text
            style={[
              styles.createdAt,
              {color: notification.isSeen ? generalColor.primary : 'white'},
            ]}>
            {getTimeDifference(notification.createdAt)}
          </Text>
        </View>
        <Text
          style={[
            styles.notificationDescription,
            {color: notification.isSeen ? generalColor.primary : 'white'},
          ]}>
          {notification.description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await removeItem(getNotiKey(notification.createdAt.toString()));
          await onUpdate();
        }}
        style={styles.closeButton}>
        <AntDesign
          name="close"
          size={24}
          color={notification.isSeen ? generalColor.primary : 'white'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    padding: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 5,
  },
  notificationContent: {
    fontSize: 15,
    color: 'black',
  },
  createdAt: {
    fontSize: 14,
    marginLeft: 5,
    color: 'black',
    opacity: 0.8,
  },
  notificationDescription: {
    marginLeft: 12,
    fontSize: 15,
  },
  closeButton: {
    paddingHorizontal: 4,
  },
});

export default NotificationItem;
