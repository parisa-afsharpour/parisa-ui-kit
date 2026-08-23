import userInfo from "../user-management/reducers/userInfoReducer";
import {error} from "../user-management/store/counterStore";
import modal from "./reducers/modalReducer";
import popup from "./reducers/popupReducer";
import loading from "./reducers/loadingReduser";
import toggleMenu from '../sina/reducers/toggleMenuReducer';
import notification from "../sina/reducers/notificationReducer";

export default {
    userInfo : userInfo,
    modal:modal,
    popup:popup,
    loading: loading,
    toggleMenu: toggleMenu,
    notification:notification
}