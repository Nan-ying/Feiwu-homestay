import { defineStore } from "pinia";
import { getHotSuggests } from "@/services";
import { getCategories } from "@/services";
import { getHouseList } from "@/services";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: [],
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res = await getHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategories() {
      const res = await getCategories();
      this.categories = res.data;
    },
    async fetchHouseList() {
      const res = await getHouseList(this.currentPage);
      this.houselist.push(...res.data);

      this.currentPage++;
    },
  },
});

export default useHomeStore;
