import { WebSocketServer, WebSocket } from 'ws';
import axios from 'axios';

console.log('Starting WebSocket server...');

const wss = new WebSocketServer({ port: 8080 });

type UserWS = { ws: WebSocket, userId: number };
let users: UserWS[] = [];

wss.on('connection', (ws, req) => {
  const params = new URL(req.url!, `http://${req.headers.host}`).searchParams;
  const userId = +params.get('userId')!;
  const username = params.get('username')!;

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

    const response = {
      message: parsedData.message,
      channelId: parsedData.channelId,
      userId: userId,
      username: username
    }
    console.log('sending', response);
    console.log('users', users);
    users.forEach(user => {
      user.ws.send(JSON.stringify(response), { binary: false });
    });
  });

  ws.on('close', () => {
    users = users.filter(user => user.ws !== ws);
  })
});
