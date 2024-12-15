import { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => openImageModal(image)}
          style={styles.imageWrapper}
        >
          <Image 
            source={{ uri: image }} 
            style={[
              styles.image, 
              { width: screenWidth * 0.33, height: screenWidth * 0.4 }
            ]} 
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}

      {/* Detailed Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={closeImageModal}
          >
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.fullImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  imageWrapper: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
});

export default ImageGallery;

// Usage example
// <ImageGallery 
//   images={[
//     'https://example.com/image1.jpg', 
//     'https://example.com/image2.jpg', 
//     'https://example.com/image3.jpg'
//   ]} 
// />