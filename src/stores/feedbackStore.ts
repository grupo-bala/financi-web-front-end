import { defineStore } from "pinia";

export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      text: "",
      currentColor: "#49AD5A",
      defaultColor: "#49AD5A",
    };
  },
  actions: {
    notify(text: string, color?: string) {
      this.text = text;
      this.currentColor = color ?? this.defaultColor;
    },
  },
});