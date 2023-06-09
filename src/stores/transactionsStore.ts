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
      const initIndex = 0;
      const endIndex = 10;

      transaction.date = transaction.date.slice(initIndex, endIndex);
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
    remove(transactionId: number) {
      this.data = this.data.filter((t) => {
        return t.id !== transactionId;
      });
    },
    edit(transaction: Transaction) {
      const newTransaction = this.data.find((t) => {
        return t.id === transaction.id;
      });

      newTransaction!.categoryId = transaction.categoryId;
      newTransaction!.date = transaction.date;
      newTransaction!.isEntry = transaction.isEntry;
      newTransaction!.value = transaction.value;
      newTransaction!.title = transaction.title;
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