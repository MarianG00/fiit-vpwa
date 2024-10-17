<template>
  <div class="full-height full-width flex flex-center">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      style="width: 440px; text-align: center"
      ref="form"
    >
      <img src="../assets/slackerboylogo.jpg" />

      <q-input
        filled
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[
          (val) => !!val || 'Email is required',
          (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Password is required',
        ]"
      />

      <div>
        <q-btn
          label="Log in"
          type="submit"
          color="primary"
          style="width: 100%; padding: 16px; margin-bottom: 16px"
        />
        <q-btn
          label="Register"
          @click="onRegister"
          color="secondary"
          style="width: 100%; padding: 16px"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { userStore } from '../stores/userStore';

export default {
  setup() {
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    const form = ref(null);
    const $q = useQuasar();

    return {
      email,
      password,
      form,
      userStore,

      onSubmit() {
        if (form.value && form.value.validate()) {
          const notifAccess = () => {
            if (Notification.permission !== 'granted') {
              Notification.requestPermission();
            }
          };
          notifAccess();
          if (userStore.login(email.value, password.value)) {
            $q.notify({
              type: 'positive',
              message: `Logged in as ${
                userStore.current_user.name +
                ' ' +
                userStore.current_user.lastName
              }`,
              timeout: 2500,
            });
          }
          router.push('/');
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },

      onRegister() {
        router.push('/register');
      },
    };
  },
};
</script>
