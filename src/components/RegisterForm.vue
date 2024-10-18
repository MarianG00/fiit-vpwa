<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <div class="q-pa-md">
      <q-btn color="primary" icon="arrow_back" @click="onBack" />
    </div>
    <div class="flex flex-grow full-width flex-center" style="flex-grow: 1">
      <q-form
        @reset="onReset"
        @submit="onRegister"
        class="q-pa-md"
        style="width: 440px; text-align: center; padding: 16px"
        ref="form"
      >
        <img src="../assets/slackerboylogo.jpg" />
        <div class="row" style="gap: 24px">
          <div class="col">
            <q-input
              filled
              v-model="firstName"
              label="First name"
              lazy-rules
              :rules="[(val) => !!val || 'First name is required']"
              class="full-width"
            />
          </div>
          <div class="col">
            <q-input
              filled
              type="text"
              v-model="lastName"
              label="Last name"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Last name is required',
              ]"
              class="full-width"
            />
          </div>
        </div>
        <q-input
          filled
          type="text"
          v-model="nickName"
          label="Nickname"
          lazy-rules
          :rules="[(val) => !!val || 'Nickname is required']"
        />
        <q-input
          filled
          type="text"
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

        <q-input
          filled
          type="password"
          v-model="passwordRepeat"
          label="Confirm Password"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please confirm your password',
            (val) => val == password || 'Passwords must match',
          ]"
        />

        <div>
          <q-btn
            label="Register"
            @click="onRegister"
            color="primary"
            style="width: 100%; padding: 16px"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref(null);
    const password = ref(null);
    const passwordRepeat = ref(null);
    const firstName = ref(null);
    const lastName = ref(null);
    const router = useRouter();
    const form = ref(null);
    const nickName = ref(null);

    const onReset = () => {
      email.value = null;
      password.value = null;
      firstName.value = null;
      lastName.value = null;
      passwordRepeat.value = null;
      nickName.value = null;
    };

    const onRegister = () => {
      form.value.validate().then((isValid) => {
        if (isValid) {
          router.push('/login');
        } else {
          console.log('Form is invalid');
          console.log(password.value);
          console.log(passwordRepeat.value);
        }
      });
    };

    const onBack = () => {
      onReset();
      router.back();
    };

    return {
      email,
      password,
      passwordRepeat,
      firstName,
      lastName,
      form,
      nickName,
      onRegister,
      onReset,
      onBack,
    };
  },
};
</script>
