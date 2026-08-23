
export const POPUP_ACTION_TYPE ={
    OPEN : 'POPUP_OPEN',
    CLOSE : 'POPUP_CLOSE',
    CLOSE_ALL : 'POPUP_CLOSE_ALL',
    CLOSE_TO_BACK : 'POPUP_CLOSE_TO_BACK',
};

export function open(component, popupOwnProps){
    return {
        type: POPUP_ACTION_TYPE.OPEN,
        payload: {
            component: component,
            popupProps: popupOwnProps
        },
    }
}

export function close(component){
    return {
        type: POPUP_ACTION_TYPE.CLOSE,
        payload: {
            component: component,
            popupProps: {}
        },
    }
}

export function closeAll(){
    return {
        type: POPUP_ACTION_TYPE.CLOSE_ALL,
    }
}

export function closeToBack(count) {
    return {
        type: POPUP_ACTION_TYPE.CLOSE_TO_BACK,
        payload: {
            closeToBackStep: count,
        },
    }
}
