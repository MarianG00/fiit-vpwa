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
    const form = ref(null); // Reference to the form

    return {
      name,
      age,
      form,

      onSubmit() {
        // Check if the register button was pressed
        if (form.value && form.value.validate()) {
          // If the validation is successful, proceed to log in
          router.push('/');
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
      },

      onRegister() {
        // Skip validation for registration
        // You can handle registration logic here if needed
        router.push('/register');
      },
    };
  },
};
</script>
