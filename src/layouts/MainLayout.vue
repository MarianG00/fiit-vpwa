<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Slack Clone
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" bordered>
      <q-list>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section>
            <q-btn icon="add" label="New Channel" flat @click="createChannel" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple v-for="channel in channels" :key="channel.id" :to="`/channel/${channel.id}`">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            {{ channel.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      channels: [
        { id: 'general', name: 'General' },
        { id: 'random', name: 'Random' },
        { id: 'development', name: 'Development' }
      ]
    };
  },
  methods: {
    createChannel() {
      const newChannel = prompt('Enter new channel name:');
      if (newChannel) {
        this.channels.push({ id: newChannel.toLowerCase().replace(/\s+/g, '-'), name: newChannel });
      }
    }
  }
};
</script>
