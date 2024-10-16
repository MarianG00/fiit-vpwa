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
        v-model="name"
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
        v-model="age"
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

export default {
  setup() {
    const name = ref(null);
    const age = ref(null);
    const router = useRouter();
    const form = ref(null);

    return {
      name,
      age,
      form,

      onSubmit() {
        if (form.value && form.value.validate()) {
          const notifAccess = () => {
            if (Notification.permission !== 'granted') {
              Notification.requestPermission();
            }
          };
          notifAccess();
          router.push('/');
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
      },

      onRegister() {
        router.push('/register');
      },
    };
  },
};
</script>
