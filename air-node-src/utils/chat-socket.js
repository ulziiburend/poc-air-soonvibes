module.exports.handler = function (io) {
    // handle events for chat namespaces
    io.of('chat').on('connect', (chatSocket) => {
        console.log('user connected to chat',chatSocket.id);
        io.emit('RECEIVE_MESSAGE', {author:'system',message:'hi'});
        chatSocket.on('SEND_MESSAGE', function(data){
            console.log('message received ',data);
            chatSocket.emit('RECEIVE_MESSAGE', data);
            chatSocket.broadcast.emit('RECEIVE_MESSAGE', data);
        })
    });
};
