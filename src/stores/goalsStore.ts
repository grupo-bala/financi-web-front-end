import { defineStore } from "pinia";
import { Goal } from "../types/Goal";

export const useGoalsStore = defineStore("goals", {
  state: () => {
    return {
      data: [] as Goal[],
      page: 1,
      search: "",
      total: 0,
    };
  },
  actions: {
    add(goal: Goal) {
      this.data.unshift(goal);
      this.data = this.data.sort((g1, g2) => {
        return new Date(g1.deadline)
          .getTime() - new Date(g2.deadline).getTime();
      });
    },
    concat(goals: Goal[]) {
      this.data = this.data.concat(goals);
      this.data = this.data.sort((g1, g2) => {
        return new Date(g2.deadline)
          .getTime() - new Date(g1.deadline).getTime();
      });
    },
    remove(goalId: number) {
      this.data = this.data.filter((g) => {
        return g.id !== goalId;
      });
    },
    edit(goal: Goal) {
      const newGoal = this.data.find((t) => {
        return t.id === goal.id;
      });

      newGoal!.deadline = goal.deadline;
      newGoal!.currentValue = goal.currentValue;
      newGoal!.totalValue = goal.totalValue;
      newGoal!.title = goal.title;
    },
    clear() {
      this.data = [];
      this.page = 1;
      this.total = 0;
    },
    nextPage() {
      this.page++;
    },
    setTotalPages(total: number) {
      this.total = total;
    },
  },
  getters: {
    get: (state) => {
      const init = 0;
      return (qtd: number) => state.data.slice(init, qtd);
    },
  },
});