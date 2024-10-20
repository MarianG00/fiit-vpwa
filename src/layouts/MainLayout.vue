<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          v-if="$q.screen.lt.md"
        />
        <div style="flex-grow: 1">
          <img
            src="../assets/slackerboylogo.jpg"
            style="width: 100px; height: auto"
            alt="logo"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      side="left"
      bordered
      :behavior="drawerBehavior"
      style="display: flex; flex-direction: column"
    >
      <q-list style="flex-grow: 1">
        <q-item clickable v-ripple to="/" exact>
          <q-item-section>
            <q-btn icon="add" label="New Channel" flat @click="createChannel" />
          </q-item-section>
        </q-item>

        <!--todo highlighted channels-->
        <q-item
          clickable
          v-ripple
          v-for="channel in sortedChannels"
          :key="channel.id"
          :to="`/channel/${channel.id}`"
          :class="{
            highlight: channel.id === 'random',
            invite: channel.invite,
          }"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            {{ channel.name }}
          </q-item-section>
        </q-item>
      </q-list>
      <div class="user-card">
        <q-separator />

        <div class="q-pa-sm">
          <div class="user-info" style="display: flex; align-items: center">
            <q-avatar size="56px">
              <img :src="userStore.current_user.avatar" alt="User Avatar" />
            </q-avatar>
            <div
              class="user-details"
              style="
                margin-left: 12px;
                flex-grow: 1;
                flex-direction: column;
                display: flex;
              "
            >
              <div
                style="
                  gap: 8px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                "
              >
                <q-icon
                  :name="
                    userStore.current_user.status == 'Online'
                      ? 'circle'
                      : userStore.current_user.status == 'Offline'
                      ? 'mode_night'
                      : 'do_not_disturb_on'
                  "
                  :color="
                    userStore.current_user.status == 'Online'
                      ? 'green'
                      : userStore.current_user.status == 'Offline'
                      ? 'yellow'
                      : 'red'
                  "
                ></q-icon>
                <span class="nickname">{{ userStore.current_user.nick }}</span>
              </div>
              <span class="email">{{ userStore.current_user.email }}</span>
            </div>
            <div>
              <q-btn flat color="grey-9" icon="settings"> </q-btn>
              <q-menu
                transition-show="rotate"
                transition-hide="rotate"
                style="min-width: auto; max-width: none; min-height: auto"
              >
                <q-list style="min-width: auto; max-width: none">
                  <q-item
                    clickable
                    style="padding: 16px; display: flex; align-items: center"
                  >
                    <q-item-section side>
                      <q-icon
                        :name="
                          userStore.current_user.status == 'Online'
                            ? 'circle'
                            : userStore.current_user.status == 'Offline'
                            ? 'mode_night'
                            : 'do_not_disturb_on'
                        "
                        :color="
                          userStore.current_user.status == 'Online'
                            ? 'green'
                            : userStore.current_user.status == 'Offline'
                            ? 'yellow'
                            : 'red'
                        "
                      />
                    </q-item-section>

                    <q-item-section
                      style="min-width: 100px; max-width: none; flex-grow: 1"
                      >{{ userStore.current_user.status }}</q-item-section
                    >
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>

                    <q-menu
                      anchor="top end"
                      self="top start"
                      style="min-width: auto; max-width: none"
                    >
                      <q-list>
                        <q-item>
                          <q-item-section>
                            <q-radio
                              v-model="userStore.current_user.status"
                              val="Online"
                              label="Online"
                            />
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section>
                            <q-radio
                              v-model="userStore.current_user.status"
                              val="Offline"
                              label="Offline"
                            />
                          </q-item-section>
                        </q-item>

                        <q-item style="min-width: 100px">
                          <q-item-section
                            style="min-width: 100px; max-width: none"
                          >
                            <q-radio
                              v-model="userStore.current_user.status"
                              val="Do Not Disturb"
                              label="Do Not Disturb"
                              style="min-width: auto"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                  <q-separator />
                </q-list>
                <q-item
                  clickable
                  style="padding: 16px; display: flex; align-items: center"
                  ><q-item-section
                    style="min-width: 100px; max-width: none; flex-grow: 1"
                    >Notifications</q-item-section
                  >
                  <q-item-section side>
                    <q-icon name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-menu
                    anchor="top end"
                    self="top start"
                    style="min-width: auto; max-width: none"
                  >
                    <q-list>
                      <q-item>
                        <q-item-section>
                          <q-radio
                            v-model="
                              userStore.current_user.options.notifications
                            "
                            val="0"
                            label="Off"
                          />
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section>
                          <q-radio
                            v-model="
                              userStore.current_user.options.notifications
                            "
                            val="1"
                            label="On"
                          />
                        </q-item-section>
                      </q-item>

                      <q-item style="min-width: 100px">
                        <q-item-section
                          style="min-width: 100px; max-width: none"
                        >
                          <q-radio
                            v-model="
                              userStore.current_user.options.notifications
                            "
                            val="2"
                            label="Me Only"
                            style="min-width: auto"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item>
                <q-item clickable v-close-popup style="padding: 16px">
                  <q-item-section @click="onLogOut" style="color: red"
                    >Log Out</q-item-section
                  >
                </q-item>
              </q-menu>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router';
//import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { userStore } from '../stores/userStore';
export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    if (!userStore.current_user.isAuthenticated) {
      router.push('/login');
    }
    const onLogOut = () => {
      $q.notify({
        type: 'info',
        message: 'Logged out',
        timeout: 2500,
      });
      console.log('logout');
      router.push('/login');
    };

    return {
      onLogOut,
      userStore,
    };
  },

  data() {
    return {
      drawer: true,
      // todo fetch channels
      channels: [
        { id: 'general', name: 'General' },
        { id: 'random', name: 'Random' },
        { id: 'johns-channel', name: "John's Channel", invite: true },
        { id: 'development', name: 'Development' },
      ],
    };
  },
  computed: {
    sortedChannels() {
      // todo sort also by other criteria
      return this.channels.toSorted(
        (a, b) => (b.invite || 0) - (a.invite || 0)
      );
    },
    drawerBehavior() {
      return this.$q.screen.lt.md ? 'mobile' : 'default';
    },
  },
  methods: {
    createChannel() {
      const newChannel = prompt('Enter new channel name:');
      if (newChannel) {
        this.channels.push({
          id: newChannel.toLowerCase().replace(/\s+/g, '-'),
          name: newChannel,
        });
      }
    },
  },
};
</script>

<style scoped>
.highlight {
  background-color: #e0f7fa;
}
.invite {
  background-color: #f3e5f5;
}
</style>
