<template>
  <q-card class="user-card">
    <q-card-section class="q-pa-sm">
      <div class="user-info">
        <q-avatar size="56px">
          <img :src="user.avatar" alt="User Avatar" />
        </q-avatar>
        <div class="user-details">
          <span class="nickname">{{ user.current_user.nick }}</span>
          <span class="full-name">{{ user.current_user.fullName }}</span>
          <span class="email">{{ user.current_user.email }}</span>
          <span class="status">{{ user.current_user.status }}</span>
        </div>
        <q-btn icon="more_vert" class="options-btn" flat></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { userStore } from 'src/stores/userStore';

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      userStore,
    };
  },
};
</script>

<style scoped>
.user-card {
  width: 250px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.user-details {
  flex-grow: 1;
  padding-left: 12px;
}

.nickname {
  font-weight: bold;
}

.full-name {
  font-size: 0.9em;
  color: gray;
}

.email {
  font-size: 0.8em;
  color: darkgray;
}

.status {
  font-size: 0.8em;
  color: #3584db;
}

.options-btn {
  color: gray;
}
</style>
