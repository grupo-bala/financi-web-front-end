import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import axios from "axios";
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
} from "oh-vue-icons/icons";

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
);

axios.defaults.withCredentials = true;

createApp(App)
  .component("v-icon", OhVueIcon)
  .use(router)
  .mount("#app");