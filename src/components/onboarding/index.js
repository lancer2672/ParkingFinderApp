import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const slides = [
  {
    key: 'slide1',
    title: 'Chào mừng đến với ParkingFinder',
    text: 'Tìm chỗ đỗ xe một cách dễ dàng và nhanh chóng.',
    image: require('../../assets/icons/iconapp2.png'),
  },
  {
    key: 'slide2',
    title: 'Cập nhật theo thời gian thực',
    text: 'Nhận thông tin cập nhật theo thời gian thực về tình trạng đỗ xe.',
    image: require('../../assets/icons/iconapp3.png'),
  },
  {
    key: 'slide3',
    title: 'Điều hướng dễ dàng',
    text: 'Đi đến chỗ đỗ xe của bạn một cách thuận tiện.',
    image: require('../../assets/icons/iconapp4.png'),
  }  
];

const Onboarding = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.navigate('SignIn');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlide === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={slides[currentSlide].image} style={styles.image} />
      <Text style={styles.title}>{slides[currentSlide].title}</Text>
      <Text style={styles.text}>{slides[currentSlide].text}</Text>
      {renderDots()}
      <View style={styles.buttonContainer}>
        {currentSlide === 0 && (
          <TouchableOpacity onPress={skipToSignIn}>
            <Text style={styles.buttonText}>Bỏ qua</Text>
          </TouchableOpacity>
        )}
        {currentSlide > 0 && currentSlide < slides.length - 1 && (
          <TouchableOpacity onPress={prevSlide}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
        )}
        {currentSlide < slides.length - 1 && (
          <TouchableOpacity onPress={nextSlide}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        )}
       
      </View>
      <View style={styles.buttonContainer2}>
      {currentSlide === slides.length - 1 && (
          <TouchableOpacity onPress={nextSlide} style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Bắt đầu</Text>
          </TouchableOpacity>
        )}
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -15,
    marginVertical: 10, 
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 50, 
  },
  buttonText: {
    color: '#091E3D',
    fontSize: 18,
  },
  getStartedButton: {
    backgroundColor: '#091E3D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  
    marginTop: 150,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#091E3D',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});

export default Onboarding;