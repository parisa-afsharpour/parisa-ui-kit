
import {numPatterns, alphabetPatterns} from '../pattern/Pattern'

export const messages ={
    mandatory: {
        id: 'validation.messages.mandatory',
        defaultMessage: 'مقدار این فیلد الزامی است',
    },
    lengthIsLow: {
        id: 'validation.messages.lengthIsLow',
        defaultMessage: 'حداقل طول فیلد {number} است',
    },
    lengthIsHigh: {
        id: 'validation.messages.lengthIsHigh',
        defaultMessage: 'حداکثر طول فیلد {number} است',
    },
    lengthIsInvalid: {
        id: 'validation.messages.lengthIsInvalid',
        defaultMessage: 'طول این فیلد باید برابر {number} باشد.',
    },
    valueIsLow: {
        id: 'validation.messages.valueIsLow',
        defaultMessage: 'حداقل مقدار برابر {number} است',
    },
    valueIsHigh: {
        id: 'validation.messages.valueIsHigh',
        defaultMessage: 'حداکثر مقدار برابر {number} است',
    },
    positiveNumber: {
        id: 'validation.messages.positiveNumber',
        defaultMessage: 'فقط عدد مثبت قابل قبول است',
    },
    number: {
        id: 'validation.messages.number',
        defaultMessage: 'فقط عدد قابل قبول است',
    },
    en_alphabet: {
        id: 'validation.messages.en_alphabet',
        defaultMessage: 'فقط حروف انگلیسی قابل قبول است',
    },
    fa_alphabet: {
        id: 'validation.messages.fa_alphabet',
        defaultMessage: 'فقط حروف فارسی قابل قبول است',
    },
    alphabet_and_number: {
        id: 'validation.messages.alphabet_and_number',
        defaultMessage: 'فقط حروف و اعداد قابل قبول است',
    },
    invalidFormat: {
        id: 'validation.messages.invalidFormat',
        defaultMessage: 'فرمت ورودی اشتباه است',
    },
    emailFormat: {
        id: 'validation.messages.emailFormat',
        defaultMessage: 'فرمت ایمیل اشتباه است',
    },
    mobileFormat: {
        id: 'validation.messages.emailFormat',
        defaultMessage: 'فرمت تلفن همراه اشتباه است',
    },

};

export function validate(value, validation, path) {
    if (validation) {
        if (validation.mandatory) {
            if (typeof value === "string") {
                if (value == null || value === 'undefined' || value == '' || value.trim() == '') {
                    return {
                        isValid: false,
                        errorText: messages.mandatory.defaultMessage
                    };
                }
            } else if (typeof value === "number") {
                if (value == null || value == undefined) {
                    return {
                        isValid: false,
                        errorText: messages.mandatory.defaultMessage
                    };
                }
            } else {
                if (value == null || value === "undefined") {
                    return {
                        isValid: false,
                        errorText: messages.mandatory.defaultMessage
                    };
                } else {
                    let val= path ? value[path] : value['value'];
                    if (val == null || val === 'undefined' || val == '') {
                        return {
                            isValid: false,
                            errorText:messages.mandatory.defaultMessage
                        };
                    }
                }
            }
        }

        if (validation.length) {
            let val = 0;
            if(value){
                val = (typeof value === 'string') || (typeof value === 'string') ? value.length :
                    path ? value[path].length : value['value'].length;
            }
            if (validation.length.fixed) {
                if (val != validation.length.fixed) {
                    return {
                        isValid: false,
                        errorText: messages.mandatory.defaultMessage
                    };
                }
            } else {
                if (validation.length.min) {
                    if (val < validation.length.min) {
                        return {
                            isValid: false,
                            errorText:` حداقل طول فیلد${validation.length.min}کاراکتر است `
                        };
                    }
                }
                if (validation.length.max) {
                    if (val > validation.length.max) {
                        return {
                            isValid: false,
                            errorText: ` حداکثر طول فیلد${validation.length.max}کاراکتر است `
                        };
                    }
                }
            }
        }

        if (validation.range) {
            let val = (typeof value === 'string') || (typeof value === 'string') ? value :
                path ? value[path] : value['value'];
            if (validation.range.min) {
                if (val < validation.range.min) {
                    return {
                        isValid: false,
                        errorText:messages.valueIsLow.defaultMessage
                    };
                }
            }
            if (validation.range.max) {
                if (val > validation.range.max) {
                    return {
                        isValid: false,
                        errorText:messages.valueIsHigh.defaultMessage
                    };
                }
            }
        }

        if (validation.charset) {
            let val = (typeof value === 'string') || (typeof value === 'string') ? value :
                path ? value[path] : value['value'];
            switch (validation.charset) {
                case "any_char":
                    break;
                case "pos_int_number":
                    if (!val.match(numPatterns.pos_int_number)) {
                        return {
                            isValid: false,
                            errorText:messages.positiveNumber.defaultMessage
                        };
                    }
                    break;
                case "int_number":
                    if (!val.match(numPatterns.int_number)) {
                        return {
                            isValid: false,
                            errorText:messages.number.defaultMessage
                        };
                    }
                    break;
                case "float_number":
                    if (!val.match(numPatterns.float_number)) {
                        return {
                            isValid: false,
                            errorText:messages.number.defaultMessage
                        };
                    }
                    break;
                case "pos_float_number":
                    if (!val.match(numPatterns.pos_float_number)) {
                        return {
                            isValid: false,
                            errorText:messages.positiveNumber.defaultMessage
                        };
                    }
                    break;
                case "alphabet":
                    if (!val.match(alphabetPatterns.alphabet)) {
                        return {
                            isValid: false,
                            errorText:messages.positiveNumber.defaultMessage
                        };
                    }
                    break;
                case "en_alphabet":
                    if (!val.match(alphabetPatterns.en_alphabet)) {
                        return {
                            isValid: false,
                            errorText: messages.en_alphabet.defaultMessage
                        };
                    }
                    break;
                case "fa_alphabet":
                    if (!val.match(alphabetPatterns.fa_alphabet)) {
                        return {
                            isValid: false,
                            errorText:messages.fa_alphabet.defaultMessage
                        };
                    }
                    break;
                case "alphabet_and_number":
                    if (!val.match(alphabetPatterns.alphabet_and_number)) {
                        return {
                            isValid: false,
                            errorText:messages.alphabet_and_number
                        };
                    }
                    break;
            }
        }

        if (value && validation.format && validation.format.regex ) {
            let val = (typeof value === 'string') || (typeof value === 'number') ? value :
                path ? value[path] : value['value'];
            if (!val.match(validation.format.regex)) {
                return {
                    isValid: false,
                    errorText:validation.format.errorText ? validation.format.errorText : messages.invalidFormat.defaultMessage
                };
            }
        }

        if (validation.other) {
            let val = (typeof value === 'string') || (typeof value === 'number') ? value :
                path ? value[path] : value['value'];
            return validation.other(val);
        }
    }

    return {
        isValid: true
    }
}