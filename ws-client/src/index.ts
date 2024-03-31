import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  console.log('Socket just connected', socket.id);
});

socket.on('socket:user_login', (payload) => {
  const parse = JSON.parse(payload);
  console.log('ws-client', parse.userId);
});
