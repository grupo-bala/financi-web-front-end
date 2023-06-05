import { defineStore } from "pinia";
import { Course } from "../types/Course";

export const useCourseStore = defineStore("course", {
  state: () => {
    return {
      data: [] as Course[],
      page: 0,
    };
  },
  getters: {
    get: (state) => {
      const init = 0;
      return (qtd: number) => state.data.slice(init, qtd);
    },
  },
});