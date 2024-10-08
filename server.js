const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

app.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

io.on('connection', (socket) => {
    console.log('새로운 사용자가 연결되었습니다.');
  
    socket.on('chat message', (data) => {
      console.log(`${data.nickname}: ${data.message}`);
      // socket.id를 함께 전송해 누가 보낸 메시지인지 클라이언트에서 구분할 수 있게 함
      io.emit('chat message', { nickname: data.nickname, message: data.message, id: socket.id });
    });
  });