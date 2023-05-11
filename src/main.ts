import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaHome,
  FaChartBar,
  FaPlayCircle,
  FaExchangeAlt,
} from "oh-vue-icons/icons";

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};

addIcons(FaHome, FaChartBar, FaPlayCircle, FaExchangeAlt);

createApp(App).component("v-icon", OhVueIcon).use(router).mount("#app");