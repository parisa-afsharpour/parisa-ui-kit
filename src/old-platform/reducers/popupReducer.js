import { POPUP_ACTION_TYPE } from "../actions/popupActions";
import {isFunction, isObject} from '../components/share/utils/utils';
import {removeByIndex} from '../components/share/utils/array';


export const initialPopupState = {
    popupObjects: [],
    popupOwnProps: []
};

export default function popup(state = initialPopupState, action) {
    switch (action.type) {
        case POPUP_ACTION_TYPE.OPEN: {
            if (!action.payload || !action.payload.component) {
                throw new Error('Please Provide `Payload` containing an `component`');
            }
            let clonedPopupObjects = state.popupObjects.slice();
            let clonedPopupOwnProps = state.popupOwnProps.slice();

            return {
                ...state,
                popupObjects: clonedPopupObjects.concat(action.payload.component),
                popupOwnProps: clonedPopupOwnProps.concat(action.payload.popupProps),
            }
        }
        case POPUP_ACTION_TYPE.CLOSE: {
            if (!action.payload || !action.payload.component) {
                throw new Error('Please Provide `Payload` containing an `component`');
            }
            let correspondingIndex = -2;
            state.popupObjects.forEach((popupObject, index) => {
                if (action.payload && isFunction(action.payload.component) && popupObject.type == action.payload.component) {
                    correspondingIndex = index
                } else if (action.payload && isObject(action.payload.component)) {
                    correspondingIndex = -1
                }
            });
            let popupObjects = [];
            let popupOwnProps = [];

            if (correspondingIndex != -2) {
                popupObjects = removeByIndex([...state.popupObjects], correspondingIndex);
                popupOwnProps = removeByIndex([...state.popupOwnProps], correspondingIndex);
            }

            return {
                ...state,
                popupObjects: [...popupObjects],
                popupOwnProps: [...popupOwnProps],
            }
        }
        case POPUP_ACTION_TYPE.CLOSE_ALL: {
            return {
                ...state,
                popupObjects: [],
                popupOwnProps: [],
            }
        }
        case POPUP_ACTION_TYPE.CLOSE_TO_BACK: {
            if (!action.payload || !action.payload.closeToBackStep) {
                throw new Error('Please Provide `Payload` containing an `count`');
            }
            let clonedPopupObjects = state.popupObjects.slice();
            let clonedPopupOwnProps = state.popupOwnProps.slice();

            clonedPopupObjects = removeByIndex(clonedPopupObjects, clonedPopupObjects.length - action.payload.closeToBackStep);
            clonedPopupOwnProps = removeByIndex(clonedPopupOwnProps, clonedPopupOwnProps.length - action.payload.closeToBackStep);

            return {
                ...state,
                popupObjects: clonedPopupObjects,
                popupOwnProps: clonedPopupOwnProps,
            }

        }
    }
    return state;
}
