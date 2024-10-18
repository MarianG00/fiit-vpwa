<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-center" v-if="endOfChat">
        End of chat
      </div>
      <q-infinite-scroll @load="onLoad" reverse>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>

        <q-chat-message
          v-for="msg in messages"
          :key="msg.id"
          :text="msg.text"
          :name="msg.user"
          :sent="msg.user === 'Me'"
        />
      </q-infinite-scroll>
    </div>
    <UserTyping
      :user="userStore"
      :message="newMessage"
      v-if="newMessage.length > 0"
    />

    <q-input
      v-model="newMessage"
      placeholder="Type your message"
      @keyup.enter="sendMessage"
    >
      <template v-slot:append>
        <q-btn icon="send" @click="sendMessage" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { userStore } from 'stores/userStore';
import UserTyping from 'src/components/UserTyping.vue';

export default {
  setup() {
    const $q = useQuasar();

    return {
      $q,
      userStore,
    };
  },
  components: {
    UserTyping,
  },
  data() {
    return {
      newMessage: '',
      messages: [],
      currentChannel: 'General',
      endOfChat: false,
    };
  },
  watch: {
    '$route.params.id': 'onChannelChanged',
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        this.messages.push({
          id: Date.now(),
          user: 'Me', // todo set the user
          text: [this.newMessage],
        });
        this.newMessage = '';
        // Example notification, set forceBoth to true to show both browser & toasty notification
        this.sendNotif(`New Message in ${this.currentChannel}`, {}, true);
      }
    },
    // todo fetch messages
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
    onLoad (index, done) {
      if (index > 5) {
        this.endOfChat = true;
        return done()
      }
      setTimeout(() => {
        const newData = [
          { id: 1, user: 'Me', text: ['Hello!'] },
          { id: 2, user: 'User 2', text: ['Hi, how are you?'] },
          { id: 3, user: 'Me', text: ['I am fine, thank you!'] },
          { id: 4, user: 'User 2', text: ['Great!'] },
          { id: 5, user: 'Me', text: ['How can I help you?'] },
          { id: 6, user: 'User 2', text: ['I need help with my homework.'] },
          { id: 7, user: 'Me', text: ['Sure, I can help you with that.'] },
          { id: 8, user: 'User 2', text: ['Thank you!'] },
          { id: 9, user: 'Me', text: ['You are welcome!'] },
          { id: 10, user: 'User 2', text: ['Goodbye!'] },
          { id: 11, user: 'Me', text: ['Goodbye!'] },
          { id: 12, user: 'User 2', text: ['What is the best programming language?'] },
          { id: 13, user: 'Me', text: ['It depends on what you want to do.'] },
          { id: 14, user: 'User 2', text: ['I want to build a website.'] },
          { id: 15, user: 'Me', text: ['You can use JavaScript.'] },
          { id: 16, user: 'User 2', text: ['Thanks but no thanks'] },
          { id: 17, user: 'Me', text: ['You are welcome!'] },
        ];
        this.messages = newData.concat(this.messages);
        done()
      }, 1000)
    },
    onChannelChanged() {
      this.messages = [];
      this.endOfChat = false;
      this.currentChannel = this.$route.params.id || 'general';
    }
  },
};
</script>
