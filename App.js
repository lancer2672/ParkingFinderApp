import useNotification from '@src/hooks/useNotification';
import useSocket from '@src/hooks/useSocket';
import Root from '@src/navigation/Root';
import {addItem, getNotiKey} from '@src/screens/Notification/components/as';
import useUserStore from '@src/store/userStore';
import ThemeProviderComponent from '@src/theme/context';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-native-paper';

function App() {
  const {displayNotification} = useNotification();
  const {on} = useSocket();
  const user = useUserStore(s => s.user);
  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    on('payment', message => {
      if (user && user.id == message.userId) {
        //TODO:
      }

      console.log('_>>>> SERVER MESSAGE', message);
    });
    on('update-reservation', message => {
      if (user && user.id == message.userId) {
      }
      //show payment if checkout
      console.log('_>>>> SERVER MESSAGE UPDATE RES STATUS', message);
    });
    on('cancel-reservation', async message => {
      if (user && user.id == message.userId) {
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
    on('reservation-status', message => {
      console.log('_>>>> SERVER RESERVATION MESSAGE', message);
      if (message.status == RES) {
      }
    });
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
    displayNotification({title: 'Thanh toán thành công', body: 'TEST'});
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider>
        <ThemeProviderComponent>
          <SafeAreaView style={{flex: 1}}>
            <Root></Root>
            <FlashMessage position="top" />
          </SafeAreaView>
        </ThemeProviderComponent>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
