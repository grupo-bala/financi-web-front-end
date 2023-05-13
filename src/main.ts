import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { IoSettingsSharp, MdVisibilityRound } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import axios from "axios";

axios.defaults.withCredentials = true;

addIcons(IoSettingsSharp, MdVisibilityRound);

createApp(App).component("v-icon", OhVueIcon).use(router).mount("#app");