export const MODAL_ACTION_TYPE ={
    SHOW : 'MODAL_SHOW',
    CLOSE : 'MODAL_CLOSE',
};


export function show(component,title,closeModal,submit) {
    return {
        type: MODAL_ACTION_TYPE.SHOW,
        payload: {
            title:title,
            component: component,
            closeModal:closeModal,
            submit:submit
        },
    }
}

export function hide(){
    return {
        type: MODAL_ACTION_TYPE.CLOSE,
    }
}
