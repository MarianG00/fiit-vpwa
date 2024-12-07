<template>
  <div class="">
    <div class="q-mt-sm" style="display: inline-flex; flex-direction: column">
      <span> {{ user.current_user.nick }}</span>
      <div
        style="
          padding: 4px 12px;
          border-radius: 50px 50px 50px 15px;
          background-color: #3584db;
          display: inline-block;
          margin-right: 8px;
          cursor: pointer;
        "
      >
        <q-spinner-dots color="white"></q-spinner-dots>
      </div>
      <q-tooltip v-if="message.length > 0">
        {{ message }}
      </q-tooltip>
    </div>
  </div>
</template>

<script>
import { userStore } from 'src/stores/userStore';

export default {
  name: 'UserTyping',
  data() {
    return {
      showTooltip: false,
      tooltipText: '',
    };
  },
  props: {
    message: {
      type: String,
      default: 'User is typing...',
    },
    user: {
      type: userStore,
      default: null,
    },
  },
};
</script>

<style scoped>
.q-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 150px;
  margin: auto;
  flex-grow: 0;
}
</style>
