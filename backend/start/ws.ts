import { WebSocketServer, WebSocket } from 'ws';
import axios from 'axios';

console.log('Starting WebSocket server...');

const wss = new WebSocketServer({ port: 8080 });

type UserWS = { ws: WebSocket, userId: string };
let users: UserWS[] = [];

wss.on('connection', (ws, req) => {
  const userId = new URL(req.url!, `http://${req.headers.host}`).searchParams.get('userId')!;

  users.push({ ws, userId });

  ws.on('error', console.error);

  ws.on('message', data => {
    type Data = {
      message: string,
      channelId: number
    }

    const parsedData: Data = JSON.parse(data.toString());
    console.log('received', parsedData);

    axios.post('http://localhost:3333/api/v1/messages/create', {
      body: parsedData.message,
      created_by: userId,
      chat: parsedData.channelId
    });

    users.forEach(user => {
      if (user.userId !== userId) {
        user.ws.send(data);
      }
    });
  });

  ws.on('close', () => {
    users = users.filter(user => user.ws !== ws);
  })
});
