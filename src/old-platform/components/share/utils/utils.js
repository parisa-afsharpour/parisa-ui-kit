export const DataTypes ={
    'Boolean' : 'boolean',
    'Function' : 'function',
    'Number' : 'number',
    'Object' : 'object',
    'String' : 'string',
    'Undefined' : 'undefined'
};

export function isPrimitive(value){
    return /^[sbn]/.test(typeof value); // [sbn] ==> string,boolean,number
}

export function exist (value) {
    if (typeof value == 'undefined') {
        return false
    }
    if (value == null || value === '') {
        return false
    }
    return true
}

export function isBoolean(value){
    return typeof value === 'boolean';
}

export function isObject(value) {
    return typeof value === DataTypes.Object && !Array.isArray(value) && value != null;
}

export function isFunction(callback) {
    return callback && typeof callback === DataTypes.Function;
}

export function uniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}