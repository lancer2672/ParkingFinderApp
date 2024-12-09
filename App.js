import reservationAPI from '@src/api/reservation.api';
import useNotification from '@src/hooks/useNotification';
import useSocket from '@src/hooks/useSocket';
import { navigate } from '@src/navigation/NavigationController';
import Root from '@src/navigation/Root';
import { addItem, getItem, getNotiKey } from '@src/screens/Notification/components/as';
import VNPayModal from '@src/screens/VNPayModal/VNPayModal';
import useUserStore from '@src/store/userStore';
import ThemeProviderComponent from '@src/theme/context';
import { PAY_METHOD, PAYMENT_STAT, RES_STATUS } from '@src/utils/constant';
import { Card_Key } from '@src/utils/localStorage';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';

function App() {
  const {displayNotification} = useNotification();
  const {on} = useSocket();
  const [paymentUrl, setPaymentUrl] = useState('');
  const user = useUserStore(s => s.user);
  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    on('payment',async message => {
      if (user && user.id == message.userId) {
        if(message.paymentStatus == PAYMENT_STAT.PENDING){
          try{

            const cardInfo  =  getItem(Card_Key);
            if (cardInfo) {
                const res = await reservationAPI.createPayment({
                  reservation_id: message.reservationId,
                  amount: message.amount,
                  userId: user.id,
                  payment_method: PAY_METHOD.BANK_TRANSFER,
                })
                
            } else {
              
            }
          }
          catch(er){
            console.log('ERROR PAYMENT', er);
             showMessage({
              message: 'Đã có lỗi xảy ra',
              type: 'error',
            });
          }
        }
        //TODO:
        if(message.paymentStatus == PAYMENT_STAT.CANCELLED){
          // displayNotification({title: 'Thanh toán đã bị hủy', body: 'TEST'});
        }
        //TODO:
        if(message.paymentStatus == PAYMENT_STAT.COMPLETED){
          await addItem(getNotiKey(Date.now()), {
            title: 'Thanh toán',
            description: `Bạn đã thanh toán thành công ${message.amount} VNĐ, mã đặt chỗ: ${message.reservationId}`,
            createdAt: Date.now(),
            isSeen: false,
          });
          displayNotification({title: 'Thanh toán thành công', body: 'TEST'});
        }
        //TODO:
        if(message.paymentStatus == PAYMENT_STAT.FAILED){
          displayNotification({title: 'Thanh toán thất bại', body: 'TEST'});
        }

      }

      console.log('_>>>> SERVER MESSAGE', message);
    });
    on('update-reservation', message => {
      if (user && user.id == message.userId) {
          if(message.status == RES_STATUS.CHECKED_IN){
            displayNotification({title: 'Thông báo check in', body: 'Bạn đã check in thành công'});
          }
          if(message.status == RES_STATUS.CHECKED_OUT){
              navigate('')
          }
      } 
      //show payment if checkout
      console.log('_>>>> SERVER MESSAGE UPDATE RES STATUS', message);
    });
    on('cancel-reservation', async message => {
      
      if (user && user.id == message.userId) {
        displayNotification({title: 'Thông báo hủy đặt chỗ', body: 'Bạn đã bị hủy đặt chỗ do quá thời gian check in'});

        await addItem(getNotiKey(Date.now()), {
          title: 'Đặt chỗ',
          description:
            'Chỗ của bạn đã bị hủy, mã đặt chỗ: ' + message.reservationId,
          createdAt: Date.now(),
          isSeen: false,
        });
      }
      console.log('_>>>> SERVER CANCEL TICKET MESSAGE', message);
    });




 
    // deleteAllMatchingPattern('noti').then(() => {
    //   console.log('Deleted all noti');
    // });
    // (async () => {
    //   await addItem(getNotiKey(Date.now()), {
    //     title: 'Đặt chỗ',
    //     description: 'Bạn đã đặt chỗ thành công',
    //     createdAt: Date.now(),
    //     isSeen: false,
    //   });
    // })();
    (async () => {
     
      const mockCard =  {
        id: 1,
        cardNumber: '1234 5678 9012 8104',
        cardHolder: 'NGUYEN DUC PHUONG',
        expiryDate: '08/21',
        type: 'visa'
      }
      addItem(Card_Key, mockCard);
    })();
  }, [on, user]);
  useEffect(() => {
    
    // displayNotification({title: 'Thanh toán thành công', body: 'TEST'});
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider>
        <ThemeProviderComponent>
          <SafeAreaView style={{flex: 1}}>
            <Root></Root>
              <VNPayModal
                  visible={!!paymentUrl}
                  paymentUrl={paymentUrl}
                  onPaymentFailure={() => {}}
                  onPaymentSuccess={() => {
                    Alert.alert('Thành công', 'Thanh toán thành công');
                  }}
                  onClose={() => {
                    console.log(':D');
                    setPaymentUrl("");
                  }}></VNPayModal>
            <FlashMessage position="top" />
          </SafeAreaView>
        </ThemeProviderComponent>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
