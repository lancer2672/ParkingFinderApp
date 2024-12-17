import ButtonComponent from '@src/components/Button';
import TextInputComponent from '@src/components/TextInputComponent';
import { generalColor } from '@src/theme/color';
import { rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { REVIEW_TEXT, SCREEN_HEIGHT } from '@src/utils/constant';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';

import fileAPI from '@src/api/file.api';
import useUserStore from '@src/store/userStore';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CreateReviewModal = ({parkingLotId, isVisible, onClose}) => {
  const [images, setImages] = useState([]);
  const user = useUserStore(state => state.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const selectImages = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
      maxSelection: 4,
      multiple: true,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setImages(response.assets.map(asset => asset.uri));
      }
    });
  };
  const handleCreateReview = async () => {
    if (!rating) {
      showMessage({
        message: 'Vui lòng chọn số sao',
        type: 'danger',
      });
      return;
    }
    if (!content) {
      showMessage({
        message: 'Vui lòng nhập nội dung đánh giá',
        type: 'danger',
      });
      return;
    }
    if (parkingLotId == null) {
      showMessage({
        message: 'Vui lòng chọn bãi đỗ xe',
        type: 'danger',
      });
      return;
    }
    try {
      const uploadPromises = images.map((image, index) => {
        const formData = new FormData();
        formData.append('file', {
          uri: image,
          type: 'image/jpeg', 
          name: `image${index}.jpg`
        });
        return fileAPI.upload(formData);
      });
      const res = await Promise.all(uploadPromises);
      const imageUrls = res.join(',');
      console.log('upload res', imageUrls);
      const createReviewRes  = await reviewAPI.create({
        parkingLotId,
        rating,
        userId: user.id,
        comment: content,
        imageId:imageUrls,
      })
      console.log('createReviewRes', createReviewRes);
      showMessage({
        message: 'Đánh giá của bạn đã được tạo',
        type: 'success',
      });
      onClose();
    }
    catch(er){

    }
  };
  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={{...rowCenter}}>
          <Text
            style={{
              textTransform: 'uppercase',
              color: generalColor.primary,
              ...textStyle.h[2],
              flex: 1,
              textAlign: 'center',
              margiLeft: 24,
            }}>
            Đánh giá
          </Text>
          <Pressable onPress={onClose}>
            <AntDesign
              name="close"
              size={24}
              color={generalColor.other.gray}></AntDesign>
          </Pressable>
        </View>

        <View style={rowCenter}></View>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
              <Avatar.Image
                size={80}
                source={{uri: 'https://picsum.photos/200'}}
              />
            </View>
            <View style={styles.row}>
              <Text style={[textStyle.h[2], {color: generalColor.primary}]}>
                "Parking name"
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[textStyle.content.medium, {textAlign: 'center'}]}>
                "Address"
              </Text>
            </View>
            <View style={styles.row}>
              <StarRating
                disabled={false}
                starStyle = {{color:generalColor.primary}}
                maxStars={5}
                rating={rating}
                
                selectedStar={value => setRating(value)}
                starSize={30}
              />
            </View>
            {rating != 0 && (
              <View style={styles.row}>
                <Text style={textStyle.content.medium}>
                  {REVIEW_TEXT[rating]}
                </Text>
              </View>
            )}

            <TextInputComponent
              placeholder="Viết đánh giá"
              placeholderColor="white"
              multiline 
              value = {content}
              onChangeText={text => {
               setContent(text);
              }}
              styleTextInput={{color: 'white'}}
            />
            {images.length != 0 && (
              <View style={{height: 120, paddingVertical: 12, width: '100%'}}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={images}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                      <Image
                        source={{uri: item}}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Modal
                  visible={!!selectedImage}
                  onRequestClose={() => setSelectedImage(null)}>
                  <Image
                    source={{uri: selectedImage}}
                    // source={{uri: selectedImage}}
                    resizeMode="contain"
                    style={styles.fullImage}
                  />
                </Modal>
              </View>
            )}
          </ScrollView>
            <ButtonComponent
              text="Thêm ảnh"
              onPress={selectImages}
              style={{
                backgroundColor: undefined,
                borderColor: generalColor.primary,
                borderWidth: 2
              }}
              txtStyle={{color: generalColor.primary}}
            />
          <ButtonComponent
            style={{marginTop: 12, backgroundColor: generalColor.primary}}
            text="Gửi"
            onPress={handleCreateReview}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateReviewModal;

const styles = StyleSheet.create({
  container: {
    height: (SCREEN_HEIGHT * 2) / 3,
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  fullImage: {
    width: '100%',

    height: '100%',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: generalColor.primary,
  },
  image: {
    width: 80,
    borderRadius: 8,
    height: '100%',
  },
  row: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
