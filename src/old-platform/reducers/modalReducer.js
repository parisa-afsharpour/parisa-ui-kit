import { MODAL_ACTION_TYPE } from "../actions/modalActions";
export const initialModalState = {
    component: undefined,
    title: "",
    closeModal:undefined,
    submit:undefined
};


 export default function modal(state = initialModalState, action) {
    switch (action.type) {
        case MODAL_ACTION_TYPE.SHOW:
            if (!action.payload || !action.payload.component) {
                throw new Error("Please provide `Payload` containing a `message`");
            }
            return {
                ...state,
                component: action.payload.component,
                title: action.payload.title,
                closeModal: action.payload.closeModal,
                submit: action.payload.submit,
            };
        case MODAL_ACTION_TYPE.CLOSE:
            return {
                ...state,
                component: undefined,
            };
        default:
            return state;
    }
}