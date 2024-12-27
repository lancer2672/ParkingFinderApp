import { serverURL } from '@src/api/axiosClient';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log('Trying to connect socket......');
    const newSocket = io(`${serverURL}/socketio`, {
      transports: ['websocket'],
      //   forceNew: true,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [serverURL]);

  const emit = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  // Lắng nghe event
  const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };
  const off = useCallback((event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  }, [socket]);
  return {socket, emit, on,off};
};

export default useSocket;
