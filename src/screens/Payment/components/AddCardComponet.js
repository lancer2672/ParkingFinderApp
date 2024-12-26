import { goBack, navigate } from '@src/navigation/NavigationController';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

import { addItem } from '@src/screens/Notification/components/as';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { Card_Key } from '@src/utils/localStorage';
import { useState } from 'react';

const dayjs = require('dayjs');

const AddCardComonent = ({ navigation }) => {
        const user = useUserStore((state) => state.user);
        const setUser = useUserStore((state) => state.setUser);
        const [selectedCard, setSelectedCard] = useState({
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                cardHolder: '',
                type: 'visa',
        });
        const [isEnabled, setIsEnabled] = useState(user?.cardInfo?.id == selectedCard.id);
        const [modalVisible, setModalVisible] = useState(false);
 
        const formatExpiryDate = (text) => {
                if (text.length === 2 && !text.includes('/')) {
                        return text + '/';
                }
                return text;
        };

        const addNewCard = async () => {
                const newCard = {
                        id: Date.now(),
                        cardNumber: selectedCard.cardNumber,
                        cardHolder: selectedCard.cardHolder,
                        expiryDate: selectedCard.expiryDate,
                        type: selectedCard.type,
                };
                addItem(Card_Key + "-" + Date.now(), newCard);
                setModalVisible(true);
                setSelectedCard(newCard);
                console.log(newCard);
        };

        return (
                <View
                  style={{
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      // borderBottomWidth: 2,
                      borderBottomColor: generalColor.primary,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        goBack();
                      }}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                      }}>
                      <AntDesign name="arrowleft" size={24} color={generalColor.primary} />
                    </TouchableOpacity>
                    <Heading style={{ color: generalColor.primary }}>
                     Thêm thẻ
                    </Heading>
                  </View>
            
                  <View style={styles.container}>
                    <View style={styles.securityContainer}>
                      <Image source={require('@src/assets/imgs/protect.png')} style={styles.securityImage} />
                      <Text style={styles.securityText}>Thông tin quý khách sẽ được bảo mật {'\n'}Chúng tôi sẽ hợp tác với các đơn vị cung cấp dịch vụ thanh toán để đảm bảo thông tin của bạn sẽ được an toàn và bảo mật tuyệt đối. Chúng tôi sẽ không có quyền truy cập vào thông tin thẻ của bạn.</Text>
                    </View>
                  
                    <View style={styles.cardTypeContainer}>
                      <TouchableOpacity onPress={() => setSelectedCard({ ...selectedCard, type: 'visa' })} style={[styles.cardTypeWrapper, selectedCard.type === 'visa' && styles.selectedCard]}>
                        <Image source={require('@src/assets/imgs/visa1.png')} style={styles.cardTypeImage} />
                        {selectedCard.type === 'visa' && <AntDesign name="checkcircle" size={24} color="green" style={styles.checkIcon} />}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSelectedCard({ ...selectedCard, type: 'paypal' })} style={[styles.cardTypeWrapper, selectedCard.type === 'paypal' && styles.selectedCard]}>
                        <Image source={require('@src/assets/imgs/paypal.png')} style={styles.cardTypeImage} />
                        {selectedCard.type === 'paypal' && <AntDesign name="checkcircle" size={24} color="green" style={styles.checkIcon} />}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSelectedCard({ ...selectedCard, type: 'mastercard' })} style={[styles.cardTypeWrapper, selectedCard.type === 'mastercard' && styles.selectedCard]}>
                        <Image source={require('@src/assets/imgs/mastercard.png')} style={styles.cardTypeImage} />
                        {selectedCard.type === 'mastercard' && <AntDesign name="checkcircle" size={24} color="green" style={styles.checkIcon} />}
                      </TouchableOpacity>
                    </View>
                  </View>
            
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                    }}>
                    <View
                      style={{
                        borderRadius: 12,
                        display: 'flex',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 8px 20px 0px #7A7A7B52',
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingHorizontal: 32,
                        gap: 16,
                      }}>
                    
                      <View
                        style={{
                          height: 60,
                        }}>
                        <Text>Tên chủ thẻ</Text>
                        <TextInput
                          value={selectedCard.cardHolder}
                          onChangeText={(text) => setSelectedCard({ ...selectedCard, cardHolder: text })}
                          editable={true}
                          style={styles.textInput}
                          textTransform="uppercase"
                        />
                      </View>
                      <View
                        style={{
                          height: 60,
                        }}>
                        <Text>Mã thẻ</Text>
                        <TextInput
                          value={selectedCard.cardNumber}
                          onChangeText={(text) => {
                            if (/^\d{0,16}$/.test(text)) {
                              setSelectedCard({ ...selectedCard, cardNumber: text });
                            }
                          }}
                          editable={true}
                          keyboardType="numeric"
                          style={styles.textInput}
                        />
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                        }}>
                        <View
                          style={{
                            height: 60,
                            width: 100,
                          }}>
                          <Text>Ngày hết hạn</Text>
                          <TextInput
                            value={selectedCard.expiryDate}
                            onChangeText={(text) => setSelectedCard({ ...selectedCard, expiryDate: formatExpiryDate(text) })}
                            editable={true}
                            placeholder="MM/YY"
                            keyboardType="numeric"
                            style={styles.textInput}
                          />
                        </View>
                        <View
                          style={{
                            height: 60,
                            width: 100,
                          }}>
                          <Text>CVV</Text>
                          <TextInput
                            value={selectedCard.cvv}
                            onChangeText={(text) => {
                              if (/^\d{0,3}$/.test(text)) {
                                setSelectedCard({ ...selectedCard, cvv: text });
                              }
                            }}
                            editable={true}
                            keyboardType="numeric"
                            style={styles.textInput}
                          />
                        </View>
                      </View>
                     
                    </View>
            
                    <TouchableHighlight
                      onPress={addNewCard}
                      style={{
                        borderRadius: 6,
                        marginTop: 20,
                      }}
                      underlayColor={'#cf0023'}>
                      <View
                        style={{
                          backgroundColor: generalColor.other.bluepurple,

                          padding: 12,
                          borderRadius: 6,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            textAlign: 'center',
                          }}>
                          Thêm mới thẻ
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <AntDesign name="checkcircle" size={50} color="green" style={styles.modalIcon} />
                        <Text style={styles.modalText}>Thành công!{'\n'}  Bạn đã thêm thành công thẻ </Text>
                        <TouchableHighlight
                          style={{ ...styles.openButton, backgroundColor: "#008000" }}
                          onPress={() => {
                            navigate("Wallet")
                          }}>
                          <Text style={styles.textStyle}>OK</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </Modal>
                </View>
              );
            };  
const Heading = styled.Text`
  font-weight: bold;
  font-size: 24;
  color: black;
`;
export default AddCardComonent;
const styles = StyleSheet.create({
        container: {
                height: 300,
                paddingHorizontal: 20,
        },
        securityContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E0F7FA',
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
        },
        securityImage: {
                width: 30,
                height: 30,
                marginRight: 10,
        },
        securityText: {
                fontSize: 16,
                flexWrap: 'wrap',
                width: '90%',
                color: '#00796B',
                lineHeight: 20,
        },
        securityDescription: {
                fontSize: 16,
                color: '#00796B',
                marginBottom: 20,
        },
        cardTypeContainer: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 20,
        },
        cardTypeWrapper: {
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                borderRadius: 10,
        },
        selectedCard: {
                borderWidth: 2,
                // borderColor: 'green',
                elevation: 5,
                shadowColor: '#ffff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
        },
        cardTypeImage: {
                width: 70,
                height: 50,
        },
        checkIcon: {
                position: 'absolute',
                top: -10,
                right: -10,
        },
        textInput: {
                flex: 1,
                fontSize: 20,
                letterSpacing: 2,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 10,
        },
        centeredView: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
        },
        modalView: {
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                        width: 0,
                        height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
        },
        openButton: {
                backgroundColor: "#77DD77",
                width: 200,
                borderRadius:10,
                padding: 10,
                elevation: 2,
        },
        textStyle: {
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
        },
        modalText: {
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 15,
                textAlign: "center",
        },
});