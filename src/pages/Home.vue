<template>
  <section>
    <v-card v-if="store.dicts.length">
      <v-list>
        <v-list-subheader>All dictionaries</v-list-subheader>
        <v-list-item v-for="(dict, index) of store.dicts" :key="index" :value="dict" @click="selectDict(dict)">
          <v-list-item-title>{{ dict }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script>
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectDict = async dict => {
      await router.push({
        name: 'Dict',
        params: {
          dict: dict,
        },
      });
    };

    onMounted(async () => {
      await store.getAllDicts();
    });

    return {
      store,
      selectDict,
    };
  },
};
</script>
