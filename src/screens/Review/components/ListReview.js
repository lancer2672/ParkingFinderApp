import {expandAnimation} from '@src/animation';
import {generalColor} from '@src/theme/color';
import {row, rowCenter} from '@src/theme/style';
import textStyle from '@src/theme/text';
import {useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const reviewBookingMock = [
  {
    id: 101,
    userId: 201,
    createdAt: '2024-05-12T08:00:00.000Z',
    checkInDate: '2024-05-10',
    roomId: 7,
    react: [201, 202, 203],
    hotelId: 16,
    parentId: null,
    description: 'Great experience, friendly staff and clean rooms.',
    images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    children: [
      {
        id: 103,
        userId: 203,
        createdAt: '2024-05-14T10:00:00.000Z',
        checkInDate: '2024-05-12',
        roomId: 7,
        react: [206, 207],
        hotelId: 4,
        parentId: 101,
        description: 'I had a wonderful stay, will definitely come back!',
        images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
      },
      {
        id: 104,
        userId: 204,
        createdAt: '2024-05-15T11:30:00.000Z',
        checkInDate: '2024-05-13',
        roomId: 8,
        react: [208, 209],
        hotelId: 4,
        parentId: 101,
        description:
          'The room was spacious and clean, but the breakfast could be improved.',
        images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
      },
    ],
  },
  {
    id: 102,
    userId: 202,
    createdAt: '2024-05-13T09:30:00.000Z',
    checkInDate: '2024-05-11',
    roomId: 8,
    react: [204, 205],
    hotelId: 5,
    parentId: 101,
    description: 'The food was not up to the mark, expected better quality.',
    images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    children: [],
  },
];
const ListReview = ({hotel, reviews = reviewBookingMock, style = {}}) => {
  const [visible, setChildrenVisible] = useState(false);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          flexDirection: 'row',
          ...style,
        }}>
        <Avatar.Image size={40} source={{uri: 'https://picsum.photos/200'}} />
        <View style={{flex: 1, paddingLeft: 12}}>
          <View style={row}>
            <Text
              style={{
                ...textStyle.h[4],
                fontSize: 18,
                flex: 1,
                color: generalColor.primary,
              }}>
              Savanah Nguyen
            </Text>
            <AntDesign
              name="star"
              color={generalColor.other.star}
              size={20}></AntDesign>
          </View>

          <Text style={{marginBottom: 4, fontSize: 12}}>
            {new Date().toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={styles.content}>{item.description}</Text>
          <View style={rowCenter}>
            <AntDesign
              name="like2"
              color={generalColor.primary}
              size={18}></AntDesign>
            <Text style={{fontSize: 13, color: generalColor.primary}}>
              {' '}
              Hữu ích (12)
            </Text>
          </View>
          {item.children && item.children.length > 0 && (
            <View style={{marginTop: 4}}>
              <Pressable
                onPress={() => {
                  setChildrenVisible(!visible);
                  LayoutAnimation.configureNext(expandAnimation);
                }}>
                <Text style={{fontSize: 15, color: generalColor.primary}}>
                  {' '}
                  Xem bình luận phản hồi
                </Text>
              </Pressable>
              {visible && (
                <View>
                  {item.children.map(i => {
                    return <ChildrenReview item={i}></ChildrenReview>;
                  })}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.flatList}
        data={reviews}
        nestedScrollEnabled
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ListReview;
const ChildrenReview = ({item}) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        flexDirection: 'row',
      }}>
      <Avatar.Image size={40} source={{uri: 'https://picsum.photos/200'}} />
      <View style={{flex: 1, paddingLeft: 12}}>
        <View style={row}>
          <Text
            style={{
              ...textStyle.h[4],
              fontSize: 18,
              flex: 1,
              color: generalColor.primary,
            }}>
            Savanah Nguyen
          </Text>
        </View>

        <Text style={{marginBottom: 4, fontSize: 12}}>
          {new Date().toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.content}>{item.description}</Text>
        <View style={rowCenter}>
          <AntDesign
            name="like2"
            color={generalColor.primary}
            size={18}></AntDesign>
          <Text style={{fontSize: 13, color: generalColor.primary}}>
            {' '}
            Hữu ích (12)
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  flatList: {
    height: '20%',
  },
  content: {
    color: 'black',
    fontSize: 15,
    marginBottom: 8,
  },
  separator: {
    marginVertical: 4,
  },
});
