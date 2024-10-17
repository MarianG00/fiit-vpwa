<template>
  <q-page padding>
    <div class="chat-window">
      <div class="messages">
        <q-chat-message
          v-for="msg in messages"
          :key="msg.id"
          :text="msg.text"
          :name="msg.user"
        />
      </div>

      <q-input
        v-model="newMessage"
        placeholder="Type your message"
        @keyup.enter="sendMessage"
      >
        <template v-slot:append>
          <q-btn icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { userStore } from '../stores/userStore';

export default {
  setup() {
    const $q = useQuasar();
    const current_user = userStore;

    return {
      $q,
      current_user,
    };
  },
  data() {
    return {
      newMessage: '',
      messages: [],
      currentChannel: 'General',
    };
  },
  watch: {
    // Re-fetch messages when the channel ID changes
    '$route.params.id': 'fetchMessages',
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        this.newMessage = '';
        // Example notification, set forceBoth to true to show both browser & toasty notification
        this.sendNotif(`New Message in ${this.currentChannel}`, {}, true);
      }
    },
    fetchMessages() {
      this.currentChannel = this.$route.params.id || 'general';
    },
    sendNotif(title, options, forceBoth) {
      if (Notification.permission === 'granted') {
        if (this.$q.appVisible || forceBoth) {
          this.$q.notify({
            type: 'info',
            message: title,
            timeout: 2500,
          });
        }
        if (!this.$q.appVisible || forceBoth) {
          new Notification(title, options);
        }
      }
    },
  },
  mounted() {
    this.fetchMessages(); // Fetch initial messages on page load
  },
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
