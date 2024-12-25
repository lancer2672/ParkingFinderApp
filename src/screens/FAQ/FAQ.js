import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Surface, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const generalColor = {
  primary: '#091E3D',
  strongprimary: '#040f1f',
};



const faqData= [
    {
      id: '1',
      question: 'Làm thế nào để đăng ký trở thành chủ bãi xe?',
      answer: 'Để trở thành thương nhân, hãy vào hồ sơ cá nhân của bạn và nhấn vào "Trở thành thương nhân". Bạn cần cung cấp: \n\n1. Giấy phép đăng ký kinh doanh\n2. Giấy tờ tùy thân hợp lệ\n3. Thông tin và hình ảnh bãi đỗ xe\n4. Thông tin tài khoản ngân hàng để nhận thanh toán\n\nĐội ngũ của chúng tôi sẽ xem xét đơn đăng ký của bạn trong vòng 2-3 ngày làm việc.',
      icon: 'store-check',
    },
    // {
    //   id: '2',
    //   question: 'Làm thế nào để đặt chỗ đỗ xe?',
    //   answer: 'Việc đặt chỗ đỗ xe rất đơn giản:\n\n1. Tìm kiếm vị trí mong muốn của bạn\n2. Chọn bãi đỗ xe\n3. Chọn thời gian đỗ xe\n4. Xác nhận và thanh toán\n\nBạn sẽ nhận được mã QR để vào bãi đỗ.',
    //   icon: 'car-parking-lights',
    // },
    {
      id: '3',
      question: 'Những phương thức thanh toán nào được chấp nhận?',
      answer: 'Chúng tôi chấp nhận các phương thức thanh toán sau:\n\n• Tiền mặt\n• Ví điện tử\n• Chuyển khoản ngân hàng',
      icon: 'credit-card-outline',
    },
    {
      id: '4',
      question: 'Làm thế nào để hủy đặt chỗ?',
      answer: 'Để hủy đặt chỗ:\n\n1. Vào "Đặt chỗ của tôi"\n2. Chọn đặt chỗ bạn muốn hủy\n3. Nhấn "Hủy đặt chỗ"\n\nLưu ý: Phí hủy có thể được áp dụng tùy thuộc vào chính sách của bãi đỗ xe',
      icon: 'calendar-remove',
    },
    {
      id: '5',
      question: 'Điều gì xảy ra nếu tôi đến muộn so với thời gian đã đặt?',
      answer: 'Nếu bạn đến muộn:\n\n• Vé đặt chỗ của bạn sẽ bị hủy \n• Bạn sẽ phải đặt lại chỗ đỗ xe này trên ứng dụng',
      icon: 'clock-alert-outline',
    },
    {
      id: '6',
      question: 'Làm thế nào để báo cáo sự cố?',
      answer: 'Để báo cáo sự cố:\n\n1. Vào "Trợ giúp & Hỗ trợ"\n2. Chọn "Báo cáo sự cố"\n3. Chọn danh mục\n4. Cung cấp chi tiết và hình ảnh liên quan nếu có\n5. Gửi báo cáo\n\nĐội ngũ hỗ trợ của chúng tôi sẽ phản hồi trong vòng 24 giờ.',
      icon: 'alert-circle-outline',
    }
  ];
  
  const FAQScreen = () => {
    const [expandedId, setExpandedId] = useState(null);
    const theme = useTheme();
  
    const handlePress = (id) => {
      setExpandedId(expandedId === id ? null : id);
    };
  
    return (
      <ScrollView style={styles.container}>
        <Surface style={styles.header}>
          <Icon name="frequently-asked-questions" size={30} color={generalColor.primary} />
          <Text variant="headlineSmall" style={styles.headerText}>
            Câu hỏi thường gặp
          </Text>
        </Surface>
  
        <View style={styles.faqContainer}>
          {faqData.map((item) => (
            <List.Accordion
              key={item.id}
              title={item.question}
              titleNumberOfLines={2}
              expanded={expandedId === item.id}
              onPress={() => handlePress(item.id)}
              left={props => (
                <Icon
                  name={item.icon}
                  size={24}
                  color={generalColor.primary}
                  style={styles.icon}
                />
              )}
              style={styles.accordion}
              titleStyle={styles.questionText}
            >
              <Surface style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </Surface>
            </List.Accordion>
          ))}
        </View>
  
        <Surface style={styles.contactSupport}>
          <Icon name="headset" size={24} color={generalColor.primary} />
          <Text style={styles.supportText}>
            Vẫn còn câu hỏi? Liên hệ với đội ngũ hỗ trợ của chúng tôi
          </Text>
        </Surface>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerText: {
    // marginLeft: 10,
    color: generalColor.primary,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  faqContainer: {
    paddingHorizontal: 10,
  },
  accordion: {
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  questionText: {
    color: generalColor.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  answerContainer: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#2c3e50',
  },
  contactSupport: {
    margin: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportText: {
    marginLeft: 10,
    color: generalColor.primary,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default FAQScreen;