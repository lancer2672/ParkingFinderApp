import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER = 'http://20.167.125.213:9092';
const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log('Trying to connect socket......');
    const newSocket = io(SOCKET_SERVER, {
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
  }, [SOCKET_SERVER]);

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

  return {socket, emit, on};
};

export default useSocket;
