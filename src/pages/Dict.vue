<template>
  <section>
    <v-card v-if="dictValue">
      <v-list>
        <v-btn @click="updateDict()" rounded="xl" class="ml-5">Update dict</v-btn>
        <v-list-subheader>Dictionary name: {{ dictName }}</v-list-subheader>
        <v-list-item v-for="(dict, index) of dictValue" :key="index" :value="dict">
          <v-list-item-title>{{ dict.nameRu }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const dictName = route.params.dict;
    const dictValue = ref([]);

    const updateDict = async () => {
      dictValue.value = await store.getDict(dictName, true);
      // console.log('This dict is updated by new values: ' + dictValue.value);
    };

    onMounted(async () => {
      dictValue.value = await store.getDict(dictName);
    });

    return {
      store,
      dictName,
      dictValue,
      updateDict,
    };
  },
};
</script>
