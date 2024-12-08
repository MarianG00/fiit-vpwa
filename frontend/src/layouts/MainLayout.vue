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
            <q-btn icon="add" label="New Channel" flat @click="showDialog=true" />
          </q-item-section>
        </q-item>>
        <q-item>
          <div class="text-h6">Channels</div>
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
                    userStore.current_user.options.status == 'Online'
                      ? 'circle'
                      : userStore.current_user.options.status == 'Offline'
                      ? 'mode_night'
                      : 'do_not_disturb_on'
                  "
                  :color="
                    userStore.current_user.options.status == 'Online'
                      ? 'green'
                      : userStore.current_user.options.status == 'Offline'
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
                          userStore.current_user.options.status == 'Online'
                            ? 'circle'
                            : userStore.current_user.options.status == 'Offline'
                            ? 'mode_night'
                            : 'do_not_disturb_on'
                        "
                        :color="
                          userStore.current_user.options.status == 'Online'
                            ? 'green'
                            : userStore.current_user.options.status == 'Offline'
                            ? 'yellow'
                            : 'red'
                        "
                      />
                    </q-item-section>

                    <q-item-section
                      style="min-width: 100px; max-width: none; flex-grow: 1"
                      >{{ userStore.current_user.options.status }}</q-item-section
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
                              v-model="userStore.current_user.options.status"
                              val="Online"
                              label="Online"
                            />
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section>
                            <q-radio
                              v-model="userStore.current_user.options.status"
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
                              v-model="userStore.current_user.options.status"
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
                            val="Off"
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
                            val="On"
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
                            val="Me Only"
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
import { useQuasar } from 'quasar';
import { userStore } from 'stores/userStore';
import { watch } from 'vue';
import { channelsStore } from 'stores/channelsStore';
import axios from 'axios';


export default {
  setup() {

    const router = useRouter();
    const $q = useQuasar();

    if (!userStore.current_user.isAuthenticated) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        userStore.login(user, null);
      } catch (e) {
        console.error(e);
        router.push('/login');
      }
    }
    watch(
      () => userStore.current_user.options.status,async (newStatus, oldStatus) => {
        const response = await axios.put(`http://localhost:3333/api/v1/user_options/update/${userStore.current_user.id}`, {
            status: newStatus,
          })
        if(response.status != 200) {
          $q.notify({
            type: 'error',
            message: 'Status update failed',
          })
          userStore.current_user.options.status = oldStatus;
        }
      }
    )
    watch(
      () => userStore.current_user.options.notifications,async (newStatus, oldStatus) => {
        const response = await axios.put(`http://localhost:3333/api/v1/user_options/update/${userStore.current_user.id}`, {
          notifications: newStatus,
        })
        if(response.status != 200) {
          $q.notify({
            type: 'error',
            message: 'Status update failed',
          })
          userStore.current_user.options.notifications = oldStatus;
        }
      }
    )
    const logout = async () => {
      const response = await axios.put('http://localhost:3333/api/v1/users/logout', {userToken: userStore.token});
      console.log('Logged out: ', response);
      if (response.status === 200) {
        router.push('/login');
      }else{
        $q.notify({
          type: 'error',
          message: response.message,
          timeout: 5000,
        })
      }
    }
    const onLogOut = () => {
      console.log('logout');
      logout();
    };

    return {
      onLogOut,
      userStore,
      showDialog: false,
    };
  },

  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    sortedChannels() {
      // todo sort also by other criteria
      return channelsStore.channels.toSorted(
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
        const data = {
          'name': newChannel
        }
        console.log(data)
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
.custom-backdrop {
  backdrop-filter: blur(4px) saturate(150%);
  -webkit-backdrop-filter: blur(4px) saturate(150%);
}
</style>
