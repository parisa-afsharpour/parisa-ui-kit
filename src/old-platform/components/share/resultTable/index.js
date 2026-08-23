import {emptyFunction} from "../utils/function";
import {exist} from "../utils/utils";
import {findByStringAddress} from "../utils/parser";
import ResultTable from "./ResultTable";


/*========== functions ===================== */

const getTextWidth = (text, font = "12px yekan , tahoma") => {
    if (typeof(window) == 'undefined') {return;}
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return Math.round(metrics.width );

};

export const calculateColumnsWidth = (
    columns,
    source,
    maxWidthPerCell = 500,
    minWidthPerCell = 50
) => {
    //const columnsParsed = JSON.parse(JSON.stringify(columns));//TODO:afsharpour if have bug change it
    const columnsParsed = columns;

    // First we calculate the width for each column
    // The column width is based on its string length

    const columnsWithWidth = columnsParsed.map(column =>
                Object.assign(column, {
                    width: getTextWidth(column.title)
                })

    );

    // Since we have a minimum width (column's width already calculated),
    // now we are going to verify if the cell value is bigger
    // than the column width which is already set
    // var foundIndex = columnsWithWidth.findIndex(x => x.dataAddress == 'rowid');
    // delete  columnsWithWidth[foundIndex].width;
    source.map(entry => {
        columnsWithWidth.map((column, indexColumn) => {
            // if (column.dataAddress != 'rowId') {
                const columnWidth = column.width;
                // const cellValue = Object.values(entry)[indexColumn];
                const cellValue = entry[column.dataAddress];

                // Get the string width based on chars length
                let cellWidth = getTextWidth(cellValue);

                // Verify if the cell value is smaller than column's width
                if (cellWidth < columnWidth) cellWidth = columnWidth;

                // Verify if the cell value width is bigger than our max width flag
                if (cellWidth > maxWidthPerCell) {
                    cellWidth = maxWidthPerCell;
                }else if(cellWidth < minWidthPerCell){
                    cellWidth = minWidthPerCell;
                }

                // Update the column width
                // if (column.dataAddress != 'rowId')
                    columnsWithWidth[indexColumn].width = cellWidth;
            // var foundIndex = columnsWithWidth.findIndex(x => x.dataAddress == 'rowid');
           // delete  columnsWithWidth[foundIndex].width;

            // }
        });
    });

    // Sum of all columns width to determine the table max width
    let tableWidth =0;
    if (columnsWithWidth) {
        if (columnsWithWidth.length >0) {
            if (columnsWithWidth[0]) {
                // tableWidth = columnsWithWidth.filter(column2 => column2.dataAddress != 'rowId')
                tableWidth = columnsWithWidth
                    .map(column => column.width)
                    .reduce((a, b) => {
                        return a + b;
                    }, 0) + (columnsWithWidth.length * 30);
            }
        }
    }
    return {
        columns: columnsWithWidth,
        source,
        tableWidth,
    };
};
export function getScrollSize(scrollConf, colLength) {
    const defaultConf = {x: colLength * 110,y:200};
    if (typeof scrollConf === 'object') {
        const {width = 1200} = scrollConf;
        if (scrollConf.y){
            return {x: defaultConf , y:300};
        }
        return {x: width,y:200};
    }
    return defaultConf;
}

export function isAction(content = []) {
    if (Array.isArray(content) && content.length) {
        return content.every(isValidAction);
    }
    return false;
}

export function isValidAction(action) {
    return action && typeof action.onClick === 'function';
}

export const getActionsButton = (actions) => {//TODO
    let actionsArray = [];
    if (Array.isArray(actions) && actions.length) {
        actionsArray = actions.map(action => ({
            icon: action.actionDefinition.icon,
            tooltip: action.actionDefinition.tooltip,
            onClick: action.action,
        }));
    }
    return actionsArray;
};
/*____________________________________*/
const RowIndexDetail={//TODO: use enum
    DATA_ADDRESS :'rowIndex',
    TITLE : 'ردیف',
    KEY : 'rowIndexNumber',
}

function addIndexToData(data = [], paginationConfig = {}, fromIndex = 0) {
    let startIndex = fromIndex;
    if (startIndex == 0) {
        // getStartIndexFromPagination return correct index when fromIndex not sanded as a prop to the ResultTable
        startIndex = getStartIndexFromPagination(paginationConfig);
    }
    data.forEach((rowItem, index) => {
        if(!rowItem.rowIndex){
            const rowIndex = index + startIndex;
            Object.assign(rowItem, {[RowIndexDetail.DATA_ADDRESS]: rowIndex, dataIndex: index});
        }

    });
}

function getStartIndexFromPagination(paginationConfig) {
    let startIndex = 1;
    const {currentPage = 1, countPerPage = 0} = paginationConfig;
    startIndex += (currentPage - 1) * countPerPage;
    if (startIndex <0){
        startIndex=1
    }

    return startIndex;
}


export function addRowIndex(columns, tableData, pagination) {
    const fromIndex=(pagination && pagination.fromIndex) ? pagination.fromIndex : 0
    addIndexToData(tableData, pagination, fromIndex);
    // add rowIndex as a firstColumn to columnDefinition
    columns.splice(0, 0, {
        dataAddress: RowIndexDetail.DATA_ADDRESS,
        title: RowIndexDetail.TITLE,
        key: RowIndexDetail.KEY,
        width:70,
    });
}
/*____________________________ actions_______________*/
export function generateActionsCol(actions, tableData, columns, handleAction,width ) {
   let title=findByStringAddress(actions[0], 'titleCol')

    columns.push({
        dataAddress: 'actions',
        title:title?title:'رویدادها',
        key: 'actions',
        width:80,
        //fixed:'left' //TODO: rtl and ltr
    });

    tableData.forEach((dataItem) => Object.assign(dataItem, {actions: getActionsButtons(dataItem, actions, handleAction)}));
}
/*=================== generate actions ====================*/
function getActionsButtons(record, actions, handleAction) {
    const actionsButtons = [];
    actions.forEach((action) => {
        let showAction= true;
        if (action.permissionField) {
            const validPermissionField=action.validPermissionField ? action.validPermissionField :null;
            showAction = detectPermission(record, action.permissionField,validPermissionField);
        } else if (action.contraryPermissionField) {
            showAction = detectContraryPermission(record, action.contraryPermissionField);
        }

        if (showAction) {
            const callback = getAction(record, action, handleAction);
            actionsButtons.push({
                icon: action.actionDefinition.icon,
                tooltip: action.actionDefinition.tooltip,
                color: action.actionDefinition.color,
                onClick: callback,
            });
        }
    });

    return actionsButtons;
}

function detectContraryPermission(record, dataAddress) {
    const permission = findByStringAddress(record, dataAddress);
    if (permission == true || permission == 'true' || Boolean(permission)) {
        return false;
    }
    return true;
}

function detectPermission(record, dataAddress,value) {
    let permission =true;
    if(value){//permissionField + validPermissionField
        permission = findByStringAddress(record, dataAddress) === value;
    }else{ //permissionField
        // permissionField must be an boolean or null
         permission = Boolean(findByStringAddress(record, dataAddress));
    }
    return permission;
}

function getAction(record, action, handleAction) {
    let params = getActionParameter(record, action.actionParameterAddress);
    if (action.rowParams) {
        params = extractRowParams(record, action.rowParams);
    }

    let callback = () => {};

    if (typeof action.onClick == 'function') {
        callback = action.onClick;
    } else if (handleAction) {
        callback = handleAction;
    }
    if (handleAction) {
        callback = callback.bind(callback, action);
    }
    if (params != null || action != undefined) {
        callback = callback.bind(null, params);
    }

    return callback;
}


function getActionParameter(record, dataAddress) {
    if (dataAddress) {
        return findByStringAddress(record, dataAddress);
    }
    return null;
}
/*__________ column group ________________*/
export function isColumnGroup(column) {
    return exist(column.columns);
}