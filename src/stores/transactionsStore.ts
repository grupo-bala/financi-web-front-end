import { defineStore } from "pinia";
import { Transaction } from "../types/Transaction";

export const useTransactionsStore = defineStore("transactions", {
  state: () => {
    return {
      data: [] as Transaction[],
      search: "",
      page: 1,
      total: 0,
    };
  },
  actions: {
    add(transaction: Transaction) {
      this.data.unshift(transaction);
      this.data = this.data.sort((t1, t2) => {
        return new Date(t2.date).getTime() - new Date(t1.date).getTime();
      });
    },
    concat(transactions: Transaction[]) {
      this.data = this.data.concat(transactions);
      this.data = this.data.sort((t1, t2) => {
        return new Date(t2.date).getTime() - new Date(t1.date).getTime();
      });
    },
    remove(transaction: Transaction) {
      this.data = this.data.filter((t) => {
        return t !== transaction;
      });
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