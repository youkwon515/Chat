const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  maxHttpBufferSize: 1e8
});

const PORT = 3000;
let connectedUsers = 0;
let userNumber = 1;

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

io.on('connection', (socket) => {
    const assignedNumber = userNumber++;
    connectedUsers++;

    socket.emit('user number', { number: assignedNumber });
    io.emit('user count', connectedUsers);

    console.log(`새로운 사용자가 연결되었습니다. 사용자 번호: ${assignedNumber}`);

    socket.on('disconnect', () => {
        connectedUsers--;
        console.log(`사용자 ${assignedNumber}가 연결을 끊었습니다.`);
        
        io.emit('user count', connectedUsers);
    });

    socket.on('chat message', (data) => {
      console.log(`${assignedNumber} : ${data.message}`);
      
      io.emit('chat message', { id: socket.id, message: data.message});
    });
  });