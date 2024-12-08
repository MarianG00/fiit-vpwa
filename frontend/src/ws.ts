let socket: WebSocket;

function connect() {
  const userString = localStorage.getItem('user')!;
  const userId = JSON.parse(userString).id
  socket = new WebSocket(`ws://localhost:8080/socket?userId=${userId}`);

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
    const data = JSON.parse(await event.data.text());
    console.log('Received message via websockets:', data);
    const message = data.message;
    const channelId = data.channelId;
    console.log('Message:', message);
    console.log('Channel ID:', channelId);
    if (window.location.href.includes(`/channel/${channelId}`)) {
      console.log('Appending message to chat');
      // const chat = document.getElementById('chat')!;
      // const messageElement = document.createElement('div');
      // messageElement.innerText = message;
      // chat.appendChild(messageElement);
    }
  };
}


function send(message: string) {
  // const url = window.location.href;
  // const channelId = url.split('/channel/')[1]; // todo
  const channelId = 1;
  const data = { message, channelId };
  console.log('Sending message via websockets: ', data);
  socket.send(JSON.stringify(data));
}


function close() {
  socket.close();
}

export { send, close, connect };
