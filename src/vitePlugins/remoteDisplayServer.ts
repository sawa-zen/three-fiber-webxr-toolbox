import { Server } from 'socket.io';
import { PluginOption } from 'vite'
import { senderHTML } from './const'

export const remoteDisplayServer = (): PluginOption => {
  return {
    name: 'remote-display-server',
    configureServer(server) {
      const startServer = async () => {

        server.middlewares.use('/remote_display', (req, res, next) => {
          res.end(senderHTML)
        });

        const io = new Server(server.httpServer!, {
          cors: {
            origin: '*',
            methods: ['GET', 'POST'],
          },
        });

        io.on('connect', (socket) => {
          console.log('connected');
          socket.on('disconnect', () => {
            console.log('disconnected');
            socket.broadcast.emit('RECEIVE_DISCONNECT');
          });

          socket.on('SEND_CALL', function () {
            console.log('call');
            socket.broadcast.emit('RECEIVE_CALL');
          });

          socket.on('SEND_OFFER', function (data) {
            console.log('offer');
            socket.broadcast.emit('RECEIVE_OFFER', data.sdp);
          });

          socket.on('SEND_ANSWER', function (data) {
            console.log('answer');
            socket.broadcast.emit('RECEIVE_ANSWER', data.sdp);
          });

          socket.on('SEND_CANDIDATE', function (data) {
            console.log('candidate');
            socket.broadcast.emit('RECEIVE_CANDIDATE', data.ice);
          });
        });
      };

      startServer();
    },
  }
}
