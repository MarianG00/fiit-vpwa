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
        label="Email or nickname"
        lazy-rules
        :rules="[(val) => !!val || 'Email or nickname is required']"
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
import axios from 'axios';

export default {
  setup() {
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    const form = ref(null);
    const $q = useQuasar();

    const login = async () => {

      try {
        const response = await axios.post('http://localhost:3333/api/v1/users/login', {
          email: email.value,
          password: password.value,
        });
        console.log('Logged in:', response.data);
        const notifAccess = () => {
          if (Notification.permission !== 'granted') {
            Notification.requestPermission();
          }
        };
      notifAccess();
      if (userStore.login(response.data['user'], response.data['userToken'])) {
        localStorage.setItem('user', JSON.stringify(response.data['user']));
        $q.notify({
          type: 'positive',
          message: `Logged in as ${userStore.current_user.nick}`,
          timeout: 2500,
        });
      }
      router.push('/');
        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        $q.notify({
          type: 'error',
          message: 'An error occurred',
          timeout: 2500,
        });
      }
    };

    const onSubmit = () => {
      form.value.validate().then((isValid) => {
        if (isValid) {
          login();
        } else {
          console.log('Form is invalid');
        }
      });
    };

    return {
      email,
      password,
      form,
      userStore,
      onSubmit,
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
