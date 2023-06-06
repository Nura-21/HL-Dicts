<template>
  <div>{{ $route.params.dict }}</div>
</template>

<script>
export default {
  setup() {
    const store = useStore();

    onMounted(async () => {
      // get Dict values
    });

    return {
      store,
    };
  },
};
</script>
