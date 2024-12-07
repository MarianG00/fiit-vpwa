import { reactive } from 'vue';

export const channelsStore = reactive({
  channels: [
    { id: 'general', name: 'General' },
    { id: 'random', name: 'Random' },
    { id: 'johns-channel', name: "John's Channel", invite: true },
    { id: 'development', name: 'Development' },
  ],
  joinChannel(name: string) {
    this.channels.push({ id: name.toLowerCase(), name });
  },
  quitChannel(id: string) {
    const index = this.channels.findIndex((channel) => channel.id === id);
    if (index !== -1) {
      this.channels.splice(index, 1);
    }
  }
});
