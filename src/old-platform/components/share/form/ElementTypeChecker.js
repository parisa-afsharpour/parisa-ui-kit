export class elementTypes {
    static input = "input";
    static option = "option";
    static button = "button";
    static checkBox = "checkBox";
    static business = "business";
}
export function isFlatBusiness(element) {
    if (isBusiness(element) && (element.business.type == "flat"))
        return true;
    return false;
}

export function isInput(element) {
    if (typeCheck(element, elementTypes.input))
        return true;
    return false;
}
export function isSelectOption(element){
    if (typeCheck(element, elementTypes.option))
        return true;
    return false;
}

export function isButton(element){
    if (typeCheck(element, elementTypes.button))
        return true;
    return false;
}
export function isCheckBox(element){
    if (typeCheck(element, elementTypes.checkBox))
        return true;
    return false;
}

export function isBusiness(element){
    if (typeCheck(element, elementTypes.business))
        return true;
    return false;
}
function typeCheck(element, modifier) {
    let result = true;
    if (!element[modifier])
        result = false;
    else {
        for (let item in elementTypes) {
            if (!(item == modifier) && element[item])
                result = false;
        }
        if (!result)
            throw new Error("element type is not correct!, element schema is:" + JSON.stringify(element));
    }
    return result;

}