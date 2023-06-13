import { defineStore } from "pinia";
import { Transaction } from "../types/Transaction";

export const useProfileStore = defineStore("profile", {
  state: () => {
    return {
      balance: 0,
      entries: 0,
      outs: 0,
    };
  },
  actions: {
    addTransaction(transaction: Transaction) {
      const transactionValue = Number(transaction.value);
      this.balance += transactionValue;
      transaction.isEntry ?
        this.entries += transactionValue : this.outs += -transactionValue;
    },
    removeTransaction(transaction: Transaction) {
      const transactionValue = Number(transaction.value);
      this.balance -= transactionValue;
      transaction.isEntry ?
        this.entries -= transactionValue : this.outs += -transactionValue;
    },
  },
});