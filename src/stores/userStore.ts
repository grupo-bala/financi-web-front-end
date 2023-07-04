import { defineStore } from "pinia";
import { Transaction } from "../types/Transaction";

export const useProfileStore = defineStore("profile", {
  state: () => {
    return {
      balance: 0,
      entries: 0,
      outs: 0,
      isAdmin: false,
      isLogged: false,
    };
  },
  persist: true,
  actions: {
    addTransaction(transaction: Transaction) {
      const transactionValue = Number(transaction.value);

      if (transaction.isEntry) {
        this.balance += transactionValue;
        this.entries += transactionValue;
      } else {
        this.balance -= transactionValue;
        this.outs -= transactionValue;
      }
    },
    removeTransaction(transaction: Transaction) {
      const transactionValue = Number(transaction.value);

      if (transaction.isEntry) {
        this.balance -= transactionValue;
        this.entries -= transactionValue;
      } else {
        this.balance += transactionValue;
        this.outs += transactionValue;
      }
    },
    clear() {
      this.balance = 0;
      this.entries = 0;
      this.outs = 0;
      this.isAdmin = false;
      this.isLogged = false;
    },
  },
});