import ResultTable from "../resultTable/ResultTable";

export const emptyFunction = (...params)=>{};

/* Returns a function, that, as long as it continues to be invoked, will not
 be triggered. The function will be called after it stops being called for
 duration milliseconds.*/
export function debounce (method, context,duration = 250) {
    let timeoutId;

    function debounceWrapper (...args) {
        debounceWrapper.clear();

        timeoutId = setTimeout(() => {
            timeoutId = null;
            method.call(context, ...args)
        }, duration)
    }

    debounceWrapper.clear = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null
        }
    };
    return debounceWrapper
}

export function mapResultTableTableColumns(columnsDefinition,sortable) {
    let newColumnDefinition=[];
    if(columnsDefinition && columnsDefinition.length>0){
        newColumnDefinition=columnsDefinition.map(item =>({
            key:item.nameEn,
            title:item.nameFa ? item.nameFa :'',
            dataAddress:item.nameEn,
            hiddenColumn:item.hidden,
            sortable: typeof item.sortable === 'undefined' ?  true : item.sortable ,
            width: item.width,
            cssClass:item.cssClass,
            maxColContent:item.maxColContent && item.maxColContent,
            link: item.link,
            //necessary for SelectColumns module
            hiddenColumnsFake:item.hidden,
        }));
    }

    return newColumnDefinition
}


/*
* export function revertMapResultTableColumns(columnsDefinition,sortable) {
    let newColumnDefinition=[];
    if(columnsDefinition && columnsDefinition.length>0){
        newColumnDefinition=columnsDefinition.map(item =>({
            ...item,
            nameEn:item.key,
            nameFa:item.title ? item.title :'',
            hidden:item.hiddenColumn,
            sortable: typeof item.sortable === 'undefined' ?  true : item.sortable ,
            width: item.width,
            cssClass:item.cssClass,
            maxColContent:item.maxColContent && item.maxColContent,
            link: item.link
        }));
    }

    return newColumnDefinition
}*/