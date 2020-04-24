const socketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`A user has connected! SocketId: ${socket.id}`);

    socket.on('newMessage', (msg) => {
      socket.emit('newMessage', msg);
    });
    
    socket.on('disconnect', () => {
      console.log(`SocketId: ${socket.id} has disconnected!`);
    });
  });
};

module.exports = socketEvents;

