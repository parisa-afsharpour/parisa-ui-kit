import fetch from "isomorphic-fetch";
import {HttpError} from "found";

export const getAllNotification = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                dispatch(receiveAllNotifications(data));
                return data;
            });
    }
}

export const getAllNotificationDetails = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                dispatch(receiveAllNotificationsDetails(data));
                return data;
            });
    }
}

export const setNotificationParam = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                if (params.notifID) {
                    dispatch(receiveSetNotificationParamUpdate(data));
                }else {
                    dispatch(receiveSetNotificationParamInsert(data));
                }
                return data;
            });
    }
}

export const setNotificationParamGL = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                  await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })

            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                if (params.notifID) {
                    dispatch(receiveSetNotificationParamGLUpdate(data));
                }else {
                    dispatch(receiveSetNotificationParamGLInsert(data));
                }
                return data;
            });
    }
}


export const getNotificationParam = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                dispatch(receiveGetNotificationParam(data));
                return data;
            });
    }
}
export const getNotificationParamGL = (params) => {


    return (dispatch) => {


        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {

                //console.log('dispatchhhhhhhhhhhh ; ', data);
                //if (params.layer != null && params.layer == 'first')
                //    dispatch(receiveReportData1L(data));
                //else
                //    dispatch(receiveReportData2L(data));
                dispatch(receiveGetNotificationParamGL(data));
                return data;
            });
    }
}



export const getNotificationStart = (params) => {
    return (dispatch) => {
        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    // return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {
                dispatch(receiveNotificationStart(data));
                return data;
            });
    }
};

export const getNotificationStop = (params) => {
    return (dispatch) => {
        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    // return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {
                dispatch(receiveNotificationStop(data));
                return data;
            });
    }
};


export const getReportMetaData = (params) => {
    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {
                dispatch(receiveReportMetaData(data));
                return data;
            });
    }
}

export const getDetailsReportMetaData = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receiveDetailsReportMetaData(data));
                return data;
            });
    }
}

export const getNotificationsCount = (params) => {
    return (dispatch) => {
        return fetch(params.url, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {
                dispatch(receiveNotifUnReadCount(data));
                return data;
            });
    }
}


export const getNotificationParamReportMetaData = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receivenotificationParamsReportMetaData(data));
                return data;
            });
    }
}

export const getNotificationParamGLReportMetaData = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receivenotificationParamsGLReportMetaData(data));
                return data;
            });
    }
}


export const deleteNotif = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    // return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receiveDeletenotificationParams(params.notifID));
                return data;
            });
    }
}


export const deleteNotifGL = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(async function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    await  response.text().then(text => {
                        console.log(text);
                        throw new HttpError(response.status, text);
                    })

                }else {

                    // return response.json();
                }

            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receiveDeletenotificationParamsGL(params.notifID));
                return data;
            });
    }
}



export const getNotifUnReadCount = (params) => {


    return (dispatch) => {

        return fetch(params.url, {
            credentials: 'include', //pass cookies, for authentication
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(function (response) {
                if (response.status == 200) {

                    let currentUrl = window.location.pathname;
                    //that.props.router.push(currentUrl);

                }

                if (response.status != 200) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.json();
            }, (error) => {
                console.log('error : ', error);
            })
            .then(function (data) {


                dispatch(receiveNotifUnReadCount(data));
                return data;
            });
    }
}



export const receiveDeletenotificationParams = (data) =>( {

    type: 'receiveDeletenotificationParams',
    source : 'notificationParams',
    data: data,

} );

export const receiveDeletenotificationParamsGL = (data) =>( {

    type: 'receiveDeletenotificationParamsGL',
    source : 'notificationParams',
    data: data,

} );

export const receiveAllNotifications = (data) =>( {

    type: 'receiveAllNotifications',
    source : 'notificationParams',
    data: data,

} );

export const receiveAllNotificationsDetails = (data) =>( {

    type: 'receiveAllNotificationsDetails',
    source : 'notificationParams',
    data: data,

} );

export const receiveSetNotificationParamInsert = (data) =>( {

    type: 'receiveSetNotificationParamInsert',
    source : 'notificationParams',
    data: data,

} );
export const receiveSetNotificationParamUpdate = (data) =>( {

    type: 'receiveSetNotificationParamUpdate',
    source : 'notificationParams',
    data: data,

} );

export const receiveSetNotificationParamGLInsert = (data) =>( {

    type: 'receiveSetNotificationParamGLInsert',
    source : 'notificationParams',
    data: data,

} );
export const receiveSetNotificationParamGLUpdate = (data) =>( {

    type: 'receiveSetNotificationParamGLUpdate',
    source : 'notificationParams',
    data: data,

} );
export const receiveGetNotificationParam = (data) =>( {

    type: 'receiveGetNotificationParam',
    source : 'notificationParams',
    data: data,

} );

export const receiveGetNotificationParamGL = (data) =>( {

    type: 'receiveGetNotificationParamGL',
    source : 'notificationParams',
    data: data,

} );
export const receiveReportMetaData = (data) =>( {
    type: 'receiveReportMetaData',
    source : 'notificationMessages',
    data: data,

} );

export const receiveDetailsReportMetaData = (data) =>( {

    type: 'receiveDetailsReportMetaData',
    source : 'notificationMessages',
    data: data,

} );

export const receivenotificationParamsReportMetaData = (data) =>( {

    type: 'receiveNotificationParamMetaData',
    source : 'notificationParams',
    data: data,

} );

export const receivenotificationParamsGLReportMetaData = (data) =>( {

    type: 'receiveNotificationParamGLMetaData',
    source : 'notificationParams',
    data: data,

} );
export const receiveNotifUnReadCount = (data) =>( {

    type: 'receiveNotifUnReadCount',
    source : 'notificationParams',
    data: data,

} );

export const receiveNotificationStart = (data) =>( {
    type: 'receiveNotificationStart',
    data: true,

} );

export const receiveNotificationStop = (data) =>( {
    type: 'receiveNotificationStop',
    data: false,

} );