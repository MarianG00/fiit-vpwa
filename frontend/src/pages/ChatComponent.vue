<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-center" v-if="endOfChat">End of chat</div>
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
          :name="msg.createdByUsername"
          :sent="msg.createdById === userStore.current_user.id"
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
import { channelsStore } from 'stores/channelsStore';
import { userStore } from 'stores/userStore';
import UserTyping from 'src/components/UserTyping.vue';
import axios from 'axios';
import { send, setOnNewMessages } from  '../ws';

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
      currentChannel: this.$route.params.id,
      endOfChat: false,
      members: [],
    };
  },
  mounted() {
    setOnNewMessages((message) => {
      this.messages.push(message);
      this.sendNotif(`New Message in ${this.currentChannel}`, {}, true);
    });
  },
  methods: {
    sendMessage() {
      send(this.newMessage);
      switch (true) {
        case this.newMessage === '/list':
          this.listMembers();
          break;
        case this.newMessage === '/quit':
          this.quitChannel();
          break;
        case this.newMessage === '/cancel':
          this.cancelChannel();
          break;
        case this.newMessage.startsWith('/join '):
          this.joinChannel(this.newMessage.substring(this.newMessage.indexOf(' ') + 1));
          break;
        case this.newMessage.startsWith('/invite '):
          this.inviteUser(this.newMessage.substring(this.newMessage.indexOf(' ') + 1));
          break;
        case this.newMessage.startsWith('/revoke '):
          this.revokeInvite(this.newMessage.substring(this.newMessage.indexOf(' ') + 1));
          break;
        case this.newMessage.startsWith('/kick '):
          this.kickUser(this.newMessage.substring(this.newMessage.indexOf(' ') + 1));
          break;
      }
      this.newMessage = '';
    },
    listMembers() {
      // axios.get(`http://localhost:3333/api/v1/channels/${this.currentChannel}/members/`)
      //   .then((resp) => {
      //     this.members = resp.data.map((a) => a.username);
      //   });
      this.messages.push({
        id: Date.now(),
        user: 'Server',
        text: [this.members.join(', ')],
      });
    },
    quitChannel() {
      console.log(this.currentChannel);
      if (this.currentChannel === 1) {
        this.$q.notify({
          type: 'info',
          message: 'You cannot quit the general channel',
          timeout: 2500,
        });
        return;
      }
      channelsStore.quitChannel(this.currentChannel);
      this.$router.push('/');
    },
    joinChannel(channelName) {
      channelsStore.joinChannel(channelName);
    },
    inviteUser(user) {
      this.members.push(user);
      this.sendNotif(`user '${user}' has been invited to the channel`, {}, true);
    },
    revokeInvite() {

    },
    kickUser(user) {
      const index = this.members.indexOf(user);
      if (index === -1) {
        this.sendNotif(`user '${user}' is not in the channel`, {}, true);
        return;
      }
      if (index === 0) {
        this.sendNotif('You cannot kick yourself', {}, true);
        return;
      }
      this.members.splice(index, 1);
      this.sendNotif(`user '${user}' has been kicked from the channel`, {}, true);
    },
    cancelChannel() {
      this.quitChannel();
    },
    sendNotif(title, options, forceBoth) {
      if (userStore.current_user.options.status === 'Offline' || userStore.current_user.options.status === 'Do Not Disturb' || this.$q.appVisible) return;
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
    async onLoad (index, done) {
      try {
        console.log(index);
        const resp = await axios.get(`http://localhost:3333/api/v1/messages/chatlist/${this.currentChannel}/${index - 1}`);
        if (resp.data.length < 10)
          this.endOfChat = true;
        const parsed = resp.data.map(a => ({
          id: a.id,
          text: [a.body],
          createdByUsername: a.createdBy.username,
          createdById: a.createdBy.id
        }))
        parsed.reverse();
        this.messages.unshift(...parsed);
        done()
      }catch(err) {
        this.endOfChat = true;
        console.log('no messages');
      }
    },
  },
};
</script>
