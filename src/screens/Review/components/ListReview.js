import { expandAnimation } from '@src/animation';
import replyAPI from '@src/api/reply.api';
import ImageGallery from '@src/components/ImageGallery';
import { generalColor } from '@src/theme/color';
import { row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import fileAPI from '@src/api/file.api';
import useUserStore from '@src/store/userStore';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';

const ReplyInput = ({ 
  onSendReply, 
  reviewId 
}) => {
  const [replyText, setReplyText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const inputRef = useRef(null);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 3 - selectedImages.length, // Limit to 3 images total
    });

    if (result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages(prev => 
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSendReply = () => {
    if (replyText.trim() || selectedImages.length > 0) {
      onSendReply({
        reviewId,
        text: replyText,
        images: selectedImages
      });
      
      // Reset input
      setReplyText('');
      setSelectedImages([]);
    }
  };

  return (
    <View style={styles.replyContainer}>
      {/* Image preview */}
      {selectedImages.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.imagePreviewWrapper}>
              <Image 
                source={{ uri: image }} 
                style={styles.imagePreview} 
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => handleRemoveImage(index)}
              >
                <AntDesign name="closecircle" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.inputContainer}>
        {/* Image Pick Button */}
        <TouchableOpacity 
          onPress={handleImagePick}
          style={styles.imagePickButton}
        >
          <AntDesign 
            name="picture" 
            size={24} 
            color={generalColor.primary} 
          />
        </TouchableOpacity>

        {/* Reply Input */}
        <TextInput
          ref={inputRef}
          style={styles.replyInput}
          placeholder="Nhập trả lời..."
          multiline
          value={replyText}
          onChangeText={setReplyText}
        />

        {/* Send Button */}
        <TouchableOpacity 
          onPress={handleSendReply}
          style={styles.sendButton}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={replyText.trim() || selectedImages.length > 0 ? generalColor.primary : 'gray'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error('Giá trị min phải nhỏ hơn hoặc bằng max.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const maxStars = 5;
const ListReview = ({hotel, reviews, style = {}}) => {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [triggerRef, setTriggerRef] = useState(false);
  const user = useUserStore(state => state.user);
  const handleReply = (review) => {
    // Toggle reply input for the specific review
    setActiveReplyId(activeReplyId === review.id ? null : review.id);
  };

  // useEffect(()=>{
  //   LayoutAnimation.configureNext(expandAnimation);
  // },[activeReplyId])
  const handleSendReply = async (replyData) => {
    try{
      // Implement your reply submission logic here
      console.log('Reply submitted:', replyData);

      const imageUploads = replyData.images.map(async image => {
        const formData = new FormData();
        console.log(">>>>>>image",image);
        formData.append('file', {
          uri: image,                     // File URI (e.g., from React Native)
          name: 'upload.jpg',  // File name (default to 'upload.jpg')
          type:  'image/jpg',  // MIME type (adjust as necessary)
        });
        return await fileAPI.mupload(formData);
      });

      const imageUrls = await Promise.all(imageUploads);
      replyData.imagesUrls = imageUrls.join(',');
      const payload = {
        imageUrls : replyData.imagesUrls,
        userId: user.id,
        reviewId : replyData.reviewId,
        comment: replyData.text,
      }
      const res = await replyAPI.create(payload);
      console.log('reply res', res);
      // Hide reply input after sending
      setActiveReplyId(null);
      setTriggerRef(!triggerRef);
    }
    catch(er){
      console.error('err',er);
      showMessage({
        message: 'Có lỗi xảy ra khi gửi trả lời',
        type: 'error',
      });
    }
  };
 
  console.log('reviews', reviews);
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
              {item?.user?.name}
            </Text>
            {[...Array(item.rating)].map((_, index) => (
              <AntDesign
                key={index}
                name="star"
                color={generalColor.primary}
                size={20}
              />
            ))}
          </View>

          <Text style={{marginBottom: 4, fontSize: 12}}>
            {new Date().toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={styles.content}>{item.comment}</Text>
           <ImageGallery 
          images={item?.imagesUrls?.split(",") || []} 
        />
          <View style={rowCenter}>
            <AntDesign
              name="like2"
              color={generalColor.primary}
              size={18}></AntDesign>
            <Text style={{fontSize: 13, color: generalColor.primary}}>
              {' '}
              Hữu ích ({item.id})
            </Text>

            <TouchableOpacity onPress={()=>handleReply(item)}>
              
            <Text style={{fontSize: 13, marginLeft:12, color: generalColor.primary}}>
              Trả lời 
            </Text>
            </TouchableOpacity>
          </View>

          <ResponseReview triggerRef={triggerRef} reviewId={item.id}></ResponseReview>

          {activeReplyId === item.id && (
          <ReplyInput 
            reviewId={item.id} 
            onSendReply={handleSendReply} 
          />
        )}
          {/* //input herre */}
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
            {item?.user?.name}
          </Text>
        </View>

        <Text style={{marginBottom: 4, fontSize: 12}}>
          {new Date().toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.content}>{item.comment}</Text>
        <ImageGallery 
          images={item?.imageUrls?.split(",") || []} 
        />
        {/* <View style={rowCenter}>
          <AntDesign
            name="like2"
            color={generalColor.primary}
            size={18}></AntDesign>
          <Text style={{fontSize: 13, color: generalColor.primary}}>
            {' '}
            Hữu ích ({getRandomNumber(1, 17)})
          </Text>
        </View> */}
      </View>
    </View>
  );
};

const ResponseReview = ({reviewId, triggerRef}) => {
  const [visible, setChildrenVisible] = useState(false);
  const [replies, setReplies] = useState([]);

  const handleFetchReplies = async reviewId => {
    try {
      const res = await replyAPI.getByReviewId(reviewId);
      console.log('reply', res);
      setReplies(res);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    handleFetchReplies(reviewId);
    LayoutAnimation.configureNext(expandAnimation);
  }, [reviewId,triggerRef]);
  return (
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
          {replies.map(i => {
            return (
              <ChildrenReview key={`hello+${i.id}`} item={i}></ChildrenReview>
            );
          })}
        </View>
      )}
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
  replyContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  replyInput: {
    flex: 1,
    maxHeight: 100,
    marginHorizontal: 10,
  },
  imagePickButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePreviewWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
