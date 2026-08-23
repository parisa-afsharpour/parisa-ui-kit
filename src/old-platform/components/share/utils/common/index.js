import store from '../../../../client';
import * as modalActions from "../../../../actions/modalActions";
import * as popupActions from "../../../../actions/popupActions";
import * as loadingActions from "../../../../actions/loadingAction";
import { Modal } from 'antd';
import { notification as antNotification  } from 'antd';

const modalTypes={
    success:Modal.success,
    info:Modal.info,
    error:Modal.error,
    warning:Modal.warning
};
const notificationTypes={
    success:antNotification.success,
    info:antNotification.info,
    error:antNotification.error,
    warning:antNotification.warning
};
const notificationColor={
    success:{
        background:'#f6ffed',
        border:'#b7eb8f'
    },
    info:{
        background:'#e6f7ff',
        border:'#91d5ff'
    },
    error:{
        background:'#fff1f0',
        border:'#ffa39e'
    },
    warning:{
        background:'#fffbe6',
        border:'#ffe58f'
    }
};

export function showLoader (){
    store.dispatch(loadingActions.showLoading())
}
export function hideLoader (){
    store.dispatch(loadingActions.hideLoading())
}

export function openModal(title,component,width=850,closeModal) {
    store.dispatch(modalActions.show(component, title,closeModal));
}

export function closeModal() {
    store.dispatch(modalActions.hide());
}

export function openPopup(
    component,
    title,
    onBeforeClose,
    onAfterClose
) {
    store.dispatch(
        popupActions.open(component, {
            title: title,
            onBeforeClose: onBeforeClose,
            onAfterClose: onAfterClose
        })
    );
}

export function closePopup(component) {
   store.dispatch(popupActions.close(component));
}

export function closeAllPopup() {
    store.dispatch(popupActions.closeAll());
}

export function closePopupToBack(count) {//count:number
    store.dispatch(popupActions.closeToBack(count));
}

export function alert(type,message='') {
    let secondsToGo = 5;
    if (modalTypes[type]){
        const modal =  modalTypes[type]({
            content: message,
            okText:'بستن',
            closable:true
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000)
    }
    else{
        console.error('plz send correct type')
    }
}

export function toast(type, message='') {
    const placement='topLeft';

    if (modalTypes[type]){
        notificationTypes[type]({
            message: message,
            duration:5,
            placement:placement,
            style:{backgroundColor: `${notificationColor[type].background}`, border: `1px solid ${notificationColor[type].border}`},
            top: 60,
        });
    }
    else{
        console.error('plz send correct type')
    }
}


