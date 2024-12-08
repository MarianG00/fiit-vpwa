<template>
  <router-view />
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { close } from './ws';

defineOptions({
  name: 'App'
});

onUnmounted(() => {
  close();
});
</script>
