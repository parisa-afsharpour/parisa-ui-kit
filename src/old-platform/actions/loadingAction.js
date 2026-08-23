export const LOADING_ACTION_TYPE ={
    SHOW_LOADING: 'LOADING_SHOW_LOADING',
    HIDE_LOADING: 'LOADING_HIDE_LOADING',
}


export function showLoading() {
    return {
        type: LOADING_ACTION_TYPE.SHOW_LOADING,
    }
}

export function hideLoading() {
    return {
        type: LOADING_ACTION_TYPE.HIDE_LOADING,
    }
}
