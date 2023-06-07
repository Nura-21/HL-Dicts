<template>
  <div>{{ dictName }}</div>
</template>

<script>
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const dictName = route.params.dict;
    
    onMounted(async () => {
      const dictValue = await store.getDict(dictName);
      console.log('From Dict page: ' + dictValue);
    });

    return {
      store,
      dictName,
    };
  },
};
</script>
