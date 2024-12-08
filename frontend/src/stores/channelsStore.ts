import { reactive } from 'vue';
import axios from 'axios';

interface Channel {
  id: number;
  name: string;
  private: boolean;
  administrator: number;
}

export const channelsStore = reactive({
  channels: [] as Channel[],
  joinChannel(name: string) {
    this.channels.push({ id: 0, name: name, private: true, administrator: 0 });
  },
  quitChannel(id: number) {
    axios.delete(`http://localhost:3333/api/v1/chats/delete/${id}`).then(() => {
      this.channels.splice(
        this.channels.findIndex(channel => channel.id === id),
        1
      );
    })
  },
  sendMessage(message: string, channelId: string) {
    console.log('Sending message:', message, 'to channel:', channelId);
  },
  receiveMessage(message: string, channelId: string) {
    console.log('Received message:', message, 'from channel:', channelId);
  }
});
