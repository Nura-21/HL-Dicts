<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <v-progress-circular
        v-if="store.isLoading"
        class="absolute m-auto"
        color="#009c23"
        :size="100"
        :width="10"
        indeterminate
      ></v-progress-circular>
      <component v-else :is="Component" />
    </router-view>
  </v-app>
</template>

<script>
export default {
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
