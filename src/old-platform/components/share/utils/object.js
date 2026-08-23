export const getValue = (row, key) => {
    try {
        return key.split('.').reduce((acc, word) => {
            var segments = word.split('[');
            return segments.slice(1, segments.length).map((index) => {
                return +index.substr(0, index.length - 1);
            }).reduce((acc, index) => {
                return acc[index];
            }, acc[segments[0]]);
        }, row);
    } catch (e) {
        return '';
    }
};

export function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (
        typeof objA !== "object" ||
        objA === null ||
        typeof objB !== "object" ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    const bHasOwnProperty = objB.hasOwnProperty.bind(objB);

    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }
    return true;
}