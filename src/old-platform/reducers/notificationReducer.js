const initState = {
    notifUnReadCount:0,
    notificationStatus:false
}

const search = (state = initState, action) => {
    switch (action.type) {
        case 'receiveNotifUnReadCount':
             return {notifUnReadCount: action.data}
        case 'receiveNotificationStart':
            return {notificationStatus: action.data};
        case 'receiveNotificationStop':
            return {notificationStatus: action.data};
        default:
            return state;

    }
}

export default search;