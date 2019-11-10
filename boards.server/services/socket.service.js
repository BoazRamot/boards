const socketIo = require('socket.io');

const io = socketIo();
io.on('connection', socket => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

module.exports = io;
