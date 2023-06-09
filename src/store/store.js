import { defineStore } from 'pinia';
import { ApiClass } from '@/api';

export const useStore = defineStore('store', {
  state: () => ({
    isLoading: false,
    api: new ApiClass(),
    dicts: [],
  }),
  actions: {
    // IDEA 1 - Save dicts in localStorage and update them period of time
    async getFromApi(whichField, whichRequest, parameters) {
      const storageValue = JSON.parse(localStorage.getItem(whichField) || 'null');
      const currentHour = new Date().getHours();

      const getDataCondition = () => {
        if (!storageValue) return true;
        const hasHourKey = 'hour' in storageValue;
        const hasValueKey = 'value' in storageValue;
        if (storageValue && (hasHourKey === false || hasValueKey === false)) return true;
        if (storageValue && (storageValue.hour !== currentHour || storageValue.value.length === 0)) return true;
      };

      if (getDataCondition()) {
        this[whichField] = [];
        try {
          const response = await this.api[whichRequest](parameters);
          if (response) {
            this[whichField] = Object.values(response);
            localStorage.setItem(whichField, JSON.stringify({ value: response, hour: currentHour }));
            console.log(whichField + '\n' + this[whichField]);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this[whichField] = storageValue.value;
      }

      return this[whichField];
    },
    async getAllDicts() {
      const storageValue = JSON.parse(localStorage.getItem('dictsInLocalStorage'));
      const currentHour = new Date().getHours();

      const getDataCondition = () => {
        if (!storageValue) return true;
        const hasHourKey = 'hour' in storageValue;
        const hasValueKey = 'value' in storageValue;
        if (storageValue && (hasHourKey === false || hasValueKey === false)) return true;
        if (storageValue && (storageValue.hour !== currentHour || storageValue.value.length === 0)) return true;
      };
      if (getDataCondition()) {
        try {
          this.isLoading = true;
          const allDicts = await this.api.getAllDicts();
          if (allDicts) {
            this.dicts = Object.values(allDicts);
            localStorage.setItem('dictsInLocalStorage', JSON.stringify({ value: this.dicts, hour: currentHour }));
          } else {
            throw new Error('Нету значения');
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.isLoading = false;
        }
      } else {
        this.dicts = storageValue.value;
      }
    },
    // TASK 1 - Function to get each Dict
    async getDict(dict) {
      if (!dict) return;
      this.isLoading = true;
      try {
        const dictValue = await this.api.getDict(dict);
        if (dictValue) {
          return dictValue;
        } else {
          throw new Error('Нету значения');
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
