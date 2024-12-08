let socket: WebSocket;
// eslint-disable-next-line
let onNewMessages: any;

function connect() {
  const userString = localStorage.getItem('user')!;
  const user = JSON.parse(userString)
  socket = new WebSocket(`ws://localhost:10000/socket?userId=${user.id}&username=${user.username}`);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    console.log('Received message via websockets:', data);
    const message = data.message;
    const channelId = data.channelId;
    if (window.location.href.includes(`/channel/${channelId}`)) {
      console.log('Appending message to chat');
      onNewMessages!({
        id: channelId,
        text: [message],
        createdByUsername: data.username,
        createdById: data.userId
      });
    }
  };
}

// eslint-disable-next-line
function setOnNewMessages(callback: any) {
  onNewMessages = callback;
}


function send(message: string) {
  const url = window.location.href;
  const channelId = url.split('/channel/')[1];
  const data = { message, channelId };
  console.log('Sending message via websockets: ', data);
  socket.send(JSON.stringify(data));
}


function close() {
  socket.close();
}

export { send, close, connect, setOnNewMessages };
