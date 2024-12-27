import paymentAPI from '@src/api/payment.api';
import reservationAPI from '@src/api/reservation.api';
import useNotification from '@src/hooks/useNotification';
import useSocket from '@src/hooks/useSocket';
import Root from '@src/navigation/Root';
import { addItem, getNotiKey } from '@src/screens/Notification/components/as';
import CreateReviewModal from '@src/screens/Review/components/CreateReview';
import VNPayModal from '@src/screens/VNPayModal/VNPayModal';
import useUserStore from '@src/store/userStore';
import ThemeProviderComponent from '@src/theme/context';
import { PAY_METHOD, RES_STATUS } from '@src/utils/constant';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';

function App() {
  const {displayNotification} = useNotification();
  const {on, off} = useSocket();
  const [paymentUrl, setPaymentUrl] = useState('');
  const user = useUserStore(s => s.user);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [parkingLotId, setParkingLotId] = useState(null);
  const [msg,setMsg] = useState(null);
  const handlePayment = useCallback(async (message) => {
    console.log("handle payment", message);
    if (!user || user.id != message.userId) return;
    if (message.status === RES_STATUS.CHECKED_OUT) {
      try {
        const pi = {
          reservation_id: message.reservationId,
          amount: message.amount,
          userId: user.id,
          payment_method: PAY_METHOD.BANK_TRANSFER,
        };

        const cardInfo = user?.cardInfo;
        if (cardInfo) {
          const data = await reservationAPI.createPayment(pi);
          displayNotification({
            title: 'Thông báo check out',
            body: `Bạn đã check out thành công, số tiền: ${message.amount}đ`
          });
          
          setParkingLotId(message.parkinglotId);
        } else {
          const data = await reservationAPI.createPayment(pi);
          const res = await paymentAPI.vnPay({
            amount: message.amount,
          });
          setPaymentUrl(res.paymentUrl);
          setMsg(message);
        }
      } catch (err) {
        console.log('ERROR PAYMENT', err);
        showMessage({
          message: 'Đã có lỗi xảy ra',
          type: 'error',
        });
      }
    }
  }, [user, displayNotification]);

  const handleReservationUpdate = useCallback(async (message) => {
    console.log(">>>>>>>>>>>>>>>>>>> MESG", message, user?.id != message.userId);
    if (!user || user.id != message.userId) return;
    switch (message.status) {
      case RES_STATUS.CHECKED_IN:
        displayNotification({
          title: 'Thông báo check in',
          body: 'Bạn đã check in thành công'
        });
        await addItem(getNotiKey(Date.now()), {
          title: 'Thông báo',
          description: 'Bạn vừa check in thành công, mã đặt chỗ: ' + message.reservationId,
          createdAt: Date.now(),
          isSeen: false,
        });
        break;

      case RES_STATUS.CHECKED_OUT:
        await handlePayment(message);
        break;

      case RES_STATUS.CANCELLED:
        displayNotification({
          title: 'Thông báo hủy đặt chỗ',
          body: 'Bạn đã hủy đặt chỗ thành công'
        });
        await addItem(getNotiKey(Date.now()), {
          title: 'Thông báo',
          description: 'Bạn đã hủy đặt chỗ thành công, mã đặt chỗ: ' + message.reservationId,
          createdAt: Date.now(),
          isSeen: false,
        });
        break;
    }
  }, [user, displayNotification, handlePayment]);

  const handleReservationCancel = useCallback(async (message) => {
    if (!user || user.id !== message.userId) return;
    
    displayNotification({
      title: 'Thông báo hủy đặt chỗ',
      body: 'Bạn đã bị hủy đặt chỗ do quá thời gian check in'
    });

    await addItem(getNotiKey(Date.now()), {
      title: 'Đặt chỗ',
      description: 'Chỗ của bạn đã bị hủy, mã đặt chỗ: ' + message.reservationId,
      createdAt: Date.now(),
      isSeen: false,
    });
  }, [user, displayNotification]);

  useEffect(() => {
    // deleteAllMatchingPattern('noti').then(() => {})
    // Set up event listeners
    on('update-reservation', handleReservationUpdate);
    on('cancel-reservation', handleReservationCancel);

    // Clean up event listeners
    return () => {
      off('update-reservation', handleReservationUpdate);
      off('cancel-reservation', handleReservationCancel);
    };
  }, [handleReservationUpdate, handleReservationCancel]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider>
        <ThemeProviderComponent>
          <SafeAreaView style={{flex: 1}}>
            <Root />
            <CreateReviewModal parkingLotId={parkingLotId} onClose={()=>{
              setParkingLotId(null);
            }} isVisible={parkingLotId != null}></CreateReviewModal>
            <VNPayModal
              visible={!!paymentUrl}
              paymentUrl={paymentUrl}
              onPaymentFailure={() => {}}
              onPaymentSuccess={async () => {
                if (msg){
                    setParkingLotId(msg.parkinglotId);
                }
                try {
                  showMessage({
                    message: 'Thanh toán thành công',
                    type: 'success',
                  });
                } catch (err) {
                  console.log("err", err);
                  showMessage({
                    message: 'Đã có lỗi xảy ra',
                    type: 'error',
                  });
                }
              }}
              onClose={() => {
                setPaymentUrl("");
              }}
            />
            <FlashMessage position="top" />
          </SafeAreaView>
        </ThemeProviderComponent>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;