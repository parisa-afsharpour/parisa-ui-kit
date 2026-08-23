import { LOADING_ACTION_TYPE } from "../actions/loadingAction";


export const initialLoadingState = {
    showLoader: false,
};

export default function loading(state = initialLoadingState, action) {
    switch (action.type) {
        case LOADING_ACTION_TYPE.SHOW_LOADING:
            return {
                ...state,
                showLoader: true,
            };
        case LOADING_ACTION_TYPE.HIDE_LOADING:
            return {
                ...state,
                showLoader: false,
            };
        default:
            return state;
    }
}