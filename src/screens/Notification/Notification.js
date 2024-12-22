
import { generalColor } from '@src/theme/color';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import NotificationItem from './components/NotificationItem';
import { getAllValuesMatchingPattern } from './components/as';

const Notification = ({navigation}) => {
  console.log('notification show', notifications);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllValuesMatchingPattern('noti').then(data => {
      setNotifications(data.sort((a, b) => b.createdAt - a.createdAt));
    });
    return async () => {};
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          // borderBottomWidth: 2,
          borderBottomColor: generalColor.primary,
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <AntDesign name="arrowleft" size={24} color={generalColor.primary} />
        </TouchableOpacity> */}
        <Heading style={{color: generalColor.primary}}>Thông báo</Heading>
      </View>
      <FlatList
        style={{flex: 1}}
        data={notifications}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <NotificationItem
            onUpdate={async () => {
              getAllValuesMatchingPattern('noti').then(data => {
                console.log("Data'<", data);
                setNotifications(
                  data.sort((a, b) => b.createdAt - a.createdAt),
                );
              });
            }}
            notification={item}
          />
        )}
      />
    </View>
  );
};
export const Heading = styled(Text)`
  font-weight: bold;
  padding-top:12px;
  padding-left:4px;
  font-size: 24px;
  color: black;
`;

export default Notification;
