import paymentAPI from '@src/api/payment.api';
import reservationAPI from '@src/api/reservation.api';
import useNotification from '@src/hooks/useNotification';
import useSocket from '@src/hooks/useSocket';
import Root from '@src/navigation/Root';
import { addItem, getNotiKey } from '@src/screens/Notification/components/as';
import VNPayModal from '@src/screens/VNPayModal/VNPayModal';
import useUserStore from '@src/store/userStore';
import ThemeProviderComponent from '@src/theme/context';
import { PAY_METHOD, RES_STATUS } from '@src/utils/constant';
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
  let price = 0;
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    on('payment',async message => {
      // if (user && user.id == message.userId) {
      //   if(message.paymentStatus == PAYMENT_STAT.PENDING){
      //     try{
      //       const cardInfo  =  user?.cardInfo;
      //       if (cardInfo) {
      //           const res = await reservationAPI.createPayment({
      //             reservation_id: message.reservationId,
      //             amount: message.amount,
      //             userId: user.id,
      //             payment_method: PAY_METHOD.BANK_TRANSFER,
      //           })
                
      //       } else {
      //         const res = await paymentAPI.vnPay({
      //           amount: message.amount,
      //         })
      //         console.log("CALL API")
      //         setPaymentUrl(res.paymentUrl);
      //       }
      //     }
      //     catch(er){
      //       console.log('ERROR PAYMENT', er);
      //        showMessage({
      //         message: 'Đã có lỗi xảy ra',
      //         type: 'error',
      //       });
      //     }
      //   }
      //   //TODO:
      //   if(message.paymentStatus == PAYMENT_STAT.CANCELLED){
      //     displayNotification({title: 'Thanh toán đã bị hủy', body: ''});

      //     await addItem(getNotiKey(Date.now()), {
      //       title: 'Thanh toán',
      //       description: `Thanh toán đã bị hủy, mã đặt chỗ: ${message.reservationId}`,
      //       createdAt: Date.now(),
      //       isSeen: false,
      //     });
      //   }
      //   //TODO:
      //   if(message.paymentStatus == PAYMENT_STAT.COMPLETED){
      //     await addItem(getNotiKey(Date.now()), {
      //       title: 'Thanh toán',
      //       description: `Bạn đã thanh toán thành công ${message.amount} VNĐ, mã đặt chỗ: ${message.reservationId}`,
      //       createdAt: Date.now(),
      //       isSeen: false,
      //     });
      //     displayNotification({title: 'Thanh toán thành công', body: 'TEST'});
      //   }
      //   //TODO:
      //   if(message.paymentStatus == PAYMENT_STAT.FAILED){
      //     displayNotification({title: 'Thanh toán thất bại', body: 'TEST'});
      //   }

      // }

      console.log('_>>>> SERVER PAYMENT MESSAGE', message);
    });
    on('update-reservation', async (message) => {
      if (user && user.id == message.userId) {
          if(message.status == RES_STATUS.CHECKED_IN){
            displayNotification({title: 'Thông báo check in', body: 'Bạn đã check in thành công'});
                (async () => {
              await addItem(getNotiKey(Date.now()), {
                title: 'Thông báo',
                description: 'Bạn vừa check in thành công, mã đặt chỗ: ' + message.reservationId,
                createdAt: Date.now(),
                isSeen: false,
              });
            })();
          }
          if(message.status == RES_STATUS.CHECKED_OUT){
            try{
              price = message.amount;
              pi = {
                reservation_id: message.reservationId,
                amount: message.amount,
                userId: user.id,
                payment_method: PAY_METHOD.BANK_TRANSFER,
              };
              const cardInfo  =  user?.cardInfo;
              if (cardInfo) {
                const data = await reservationAPI.createPayment(pi)
                displayNotification({title: 'Thông báo check out', body: 'Bạn đã check out thành công, số tiền: ' + message.amount + 'đ'});
              } else {
                setPaymentInfo(pi);
                const res = await paymentAPI.vnPay({
                  amount: message.amount,
                })
                console.log("CALL API", res.paymentUrl)
                setPaymentUrl(res.paymentUrl);


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
          if(message.status == RES_STATUS.CANCELLED){
            displayNotification({title: 'Thông báo hủy đặt chỗ', body: 'Bạn đã hủy đặt chỗ thành công'});
            (async () => {
              await addItem(getNotiKey(Date.now()), {
                title: 'Thông báo',
                description: 'Bạn đã hủy đặt chỗ thành công, mã đặt chỗ: ' + message.reservationId,
                createdAt: Date.now(),
                isSeen: false,
              });
            })();
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
                  onPaymentSuccess={async () => {
                    console.log(">>>>>>>>>>>>>>>>>>>>paymentInfo",paymentInfo);
                    try{
                      const data = await reservationAPI.createPayment(paymentInfo)
  
                      showMessage({
                        message: 'Thanh toán thành công',
                        type: 'success',
                      })

                    } 
                    catch(er){
                      console.log("err",er);
                      showMessage({
                        message: 'Đã có lỗi xảy ra',
                        type: 'error',
                      })
                    }
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
