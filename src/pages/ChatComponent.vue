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

      <q-input v-model="newMessage" placeholder="Type your message" @keyup.enter="sendMessage">
        <template v-slot:append>
          <q-btn icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      newMessage: '',
      messages: [],
      currentChannel: ''
    }
  },
  watch: {
    // Re-fetch messages when the channel ID changes
    '$route.params.id': 'fetchMessages'
  },
  methods: {
    sendMessage () {
      if (this.newMessage) {
        this.newMessage = ''
      }
    },
    fetchMessages () {
      this.currentChannel = this.$route.params.id || 'general'
    }
  },
  mounted () {
    this.fetchMessages()  // Fetch initial messages on page load
  }
}
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
