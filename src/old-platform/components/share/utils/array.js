export function arrayIsEmpty (array) {
    return !Array.isArray(array) || array.length === 0
}

function sortNumberArr(value1,value2){
    return value1 - value2;
}
export function arrayEqual(array1, array2) {
    if(!Array.isArray(array1) || !Array.isArray(array2)){
        throw new Error(`arraysAreEqual received a non-array parameter`);
    }
    if(array1.length !== array2.length){
        return false;
    }
    array1.sort(sortNumberArr);
    array2.sort(sortNumberArr);
    // check every value of array1 and array2 and return true if all of them were equal
    return array1.every((value, index)=> value === array2[index]);
}

export function isArray(value) {
    return Array.isArray(value);
}

export function contactTwoObjectArrayWithoutRepeat(arr1, arr2, index) {
    let result=[];
    if(index){
        const rowsIndex = new Set(arr1.map(d => d[index]));
         result = [...arr1, ...arr2.filter(d => !rowsIndex.has(d[index]))];
    }else{
        const rowsIndex = new Set(arr1.map(d => d));
        result = [...arr1, ...arr2.filter(d => !rowsIndex.has(d))];
    }
    return result
}

export function removeByIndex(array, index) {
    let newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}

export function objectsAreSame(x, y) {
    return (x.join('') == y.join(''));
}


