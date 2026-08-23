import { isValidElement } from 'react';
import {uppercaseFirst} from './string';


export function onEvent(element, event, callback) {
    if(Array.isArray(element) && Array.isArray(event)){
        throw new Error(`both of element and event can't be an array`);
    }else if (Array.isArray(element)) {
        const unbinds = element.map((element) => onEvent(element, event, callback));
        return function unbind() {
            unbinds.forEach((unbind) => unbind());
        }
    } else if (Array.isArray(event)) {
        const unbinds = event.map((event) => onEvent(element, event, callback));
        return function unbind() {
            unbinds.forEach((unbind) => unbind());
        }
    } else {
        callback = (function (callback) {
            return (event) => {
                if (!event.target) {
                    event.target = event.srcElement;
                }
                callback(event);
            }
        })(callback);

        if (element.addEventListener) {
            element.addEventListener(event, callback);
        } else if (element.attachEvent) {
            element.attachEvent(`on${uppercaseFirst(event)}`, callback);
        }

        return function unbind() {
            if (element.removeEventListener) {
                element.removeEventListener(event, callback);
            } else if (element.detachEvent) {
                element.detachEvent(`on${uppercaseFirst(event)}`, callback);
            }
        }
    }
}
