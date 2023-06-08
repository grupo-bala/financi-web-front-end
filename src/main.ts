import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import axios, { AxiosError } from "axios";
import { useStorage } from "@vueuse/core";
import {
  FaHome,
  FaChartBar,
  FaPlayCircle,
  FaExchangeAlt,
  IoFilter,
  IoSettingsSharp,
  MdVisibilityRound,
  MdVisibilityoffRound,
  OiTriangleDown,
  OiTriangleUp,
  BiPlusCircle,
  BiDashCircle,
  CoCheckCircle,
  FaBriefcaseMedical,
  MdSchoolRound,
  MdErroroutlineRound,
  MdPaymentsRound,
  MdFoodbankRound,
  FaGifts,
  GiPopcorn,
  GiClothes,
  GiComb,
  MdOndemandvideoRound,
  MdAccesstimeRound,
  IoClose,
  PrSpinner,
  FaTrash,
  BiChevronDown,
  BiChevronUp,
} from "oh-vue-icons/icons";
import { createPinia } from "pinia";

export default {
  components: {
    "v-icon": OhVueIcon,
  },
};

addIcons(
  FaHome,
  FaChartBar,
  FaPlayCircle,
  FaExchangeAlt,
  IoFilter,
  IoSettingsSharp,
  MdVisibilityRound,
  MdVisibilityoffRound,
  OiTriangleDown,
  OiTriangleUp,
  BiPlusCircle,
  BiDashCircle,
  CoCheckCircle,
  FaBriefcaseMedical,
  MdSchoolRound,
  MdErroroutlineRound,
  MdPaymentsRound,
  MdFoodbankRound,
  FaGifts,
  GiPopcorn,
  GiClothes,
  GiComb,
  MdOndemandvideoRound,
  MdAccesstimeRound,
  IoClose,
  PrSpinner,
  FaTrash,
  BiChevronDown,
  BiChevronUp,
);

axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  const axiosError = error as AxiosError;
  const unauthorized = 401;
  if (axiosError.status === unauthorized) {
    useStorage("isLogged", false).value = false;
    router.replace("/login");
  } else {
    throw error;
  }
});

const pinia = createPinia();

createApp(App)
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(pinia)
  .mount("#app");