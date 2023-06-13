import { defineStore } from "pinia";
import { Goal } from "../types/Goal";

export const useGoalsStore = defineStore("goals", {
  state: () => {
    return {
      data: [] as Goal[],
      page: 0,
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
        return new Date(g1.deadline)
          .getTime() - new Date(g2.deadline).getTime();
      });
    },
    remove(goal: Goal) {
      this.data = this.data.filter((g) => {
        return g !== goal;
      });
    },
    nextPage() {
      this.page++;
    },
    edit(goal: Goal) {
      const newGoal = this.data.find((g) => {
        return g.id === goal.id;
      });
      newGoal!.deadline = goal.deadline;
      newGoal!.totalValue = goal.totalValue;
      newGoal!.title = goal.title;
    },
  },
  getters: {
    get: (state) => {
      const init = 0;
      return (qtd: number) => state.data.slice(init, qtd);
    },
  },
});