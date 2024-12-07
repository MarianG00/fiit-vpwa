<template>
  <q-input v-model="text" type="text" label="Email" />
</template>

<script lang="ts">
export default {
  data() {
    return {
      text: '',
    };
  },
};
</script>
