import {exist} from "./utils";

export function findByStringAddress(data, path) {
    if (path === ".") {
        return data;
    }

    let newData = data;
    let newPath = path.replace(/\[(\w+)\]/g, ".$1");
    newPath = newPath.replace(/^\./, "");
    let a = newPath.split(".");

    for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (typeof newData === "object" && newData != null && k in newData) {
            newData = newData[k];
        } else {
            return;
        }
    }

    return newData;
}

export function makeFlatArray(arrayList, dataAddress) {
    let list = [];

    if (arrayList.length > 0) {
        arrayList.map((item) => {
            list.push(findByStringAddress(item, dataAddress));
        });
        return list;
    }

    return undefined;
}

export function buildValuesForOption(
    rootData,
    valuePath,
    textPath
) {
    const source = rootData;

    if (source && source.length > 0) {
        return source.map((element) => {
            const text = findByStringAddress(element, textPath);
            const value = findByStringAddress(element, valuePath);

            return { text: text, value: exist(value) ? value.toString() : "" };
        });
    } else {
        return [];
    }
}

export function buildValuesForCompositeOption(
    rootData,
    sourcePath,
    valuePath,
    textPath
) {
    const source =
        sourcePath == "" ? rootData : findByStringAddress(rootData, sourcePath);
    let dataMap = {};

    if (source && source.length > 0) {
        source.forEach((element) => {
            const text = findByStringAddress(element, textPath);
            const value = findByStringAddress(element, valuePath);
            dataMap[value] = { text: text, value: value };
        });

        return dataMap;
    } else {
        return {};
    }
}
