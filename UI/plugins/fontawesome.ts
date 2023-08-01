import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  fas,
  faBell,
  faDashboard,
  faHistory,
  faDonate,
  faMoneyBillTransfer,
  faFolderBlank,
  faHandHoldingDollar,
  faMoneyCheckDollar,
  faHandshake,
  faBarsProgress,
  faStar,
  faRightFromBracket,
  faAddressCard,
  faUser,
  faArrowLeft,
  faGear,
  faCheck,
  faRotateLeft,
  faXmark,
  faGamepad,
  faArrowsRotate,
  faPlus,
  faRectangleXmark,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fas,
  faBell,
  faDashboard,
  faHistory,
  faDonate,
  faMoneyBillTransfer,
  faFolderBlank,
  faHandHoldingDollar,
  faMoneyCheckDollar,
  faHandshake,
  faBarsProgress,
  faStar,
  faRightFromBracket,
  faAddressCard,
  faUser,
  faArrowLeft,
  faGear,
  faCheck,
  faRotateLeft,
  faXmark,
  faGamepad,
  faArrowsRotate,
  faPlus,
  faRectangleXmark,
  faFileExcel
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
