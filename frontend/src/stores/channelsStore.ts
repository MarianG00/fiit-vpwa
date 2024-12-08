import { reactive } from 'vue';

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
    const index = this.channels.findIndex((channel) => channel.id === id);
    if (index !== -1) {
      this.channels.splice(index, 1);
    }
  }
});
