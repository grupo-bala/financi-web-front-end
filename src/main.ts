import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import axios, { AxiosError } from "axios";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useProfileStore } from "./stores/userStore";
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
  MdEditnote,
  MdCalendarmonthOutlined,
  MdInsertchartoutlined,
  MdNewspaperOutlined,
  MdPlaycircleoutline,
  BiCamera,
  BiCloudArrowUpFill,
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
  MdEditnote,
  MdCalendarmonthOutlined,
  MdInsertchartoutlined,
  MdNewspaperOutlined,
  MdPlaycircleoutline,
  BiCamera,
  BiCloudArrowUpFill,
);

axios.defaults.withCredentials = true;
axios.interceptors.response.use((res) => {
  return res;
}, (error) => {
  const axiosError = error as AxiosError<{msg: string}>;
  const unauthorized = 401;

  if(axiosError.response?.data.msg === "Nome de usuário ou senha inválidos") {
    throw error;
  } else if (axiosError.response?.status === unauthorized) {
    const user = useProfileStore();
    user.isLogged = false;
    user.isAdmin = false;
    router.replace("/login");
  } else {
    throw error;
  }
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App)
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(pinia)
  .mount("#app");