import React, {createElement} from 'react';
import PropTypes from 'prop-types';
import {
    Badge, Table, Button, Checkbox as BasicCheckbox, Tooltip, Select, Menu
} from 'antd';
const {Option} = Select;
import Actions from '../actions/Actions';
import RowIdentifier from './RowIdentifier';
import {getValue} from '../utils/object';
import {emptyFunction} from '../utils/function';
import {arrayIsEmpty, contactTwoObjectArrayWithoutRepeat, objectsAreSame,isArray} from '../utils/array';
import {exist, isPrimitive, isBoolean} from '../utils/utils';
import {
    isColumnGroup,
    isAction,
    addRowIndex,
    generateActionsCol,
    calculateColumnsWidth
} from './index';
import FontAwesome from "react-fontawesome";
import FilterColumns from "./FilterColumns";
import TextField from "../textField/TextField";
import {findByStringAddress} from "../utils/parser";
const {Column, ColumnGroup} = Table;
let tableRefWidth;

const FixedWidth = {
    ROW_INDEX_WIDTH: 60,
    FIXED_COLS_WIDTH: 110,
    SELECTION_COL_WIDTH: 60,
};
const Positions = {
    RIGHT: 'right',
    LEFT: 'left'
};
const Directions = {
    RTL: 'rtl',
    LTR: 'ltr'
};
const MAX_COL_CONTENT = 120;
const inlineStyles = {
    colContent: {
        whiteSpace: 'nowrap'
    },
    link:{
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
};

const captions = {
    emptyText: 'داده ای موجود نیست!'
};

class ResultTable extends React.Component {
    settingActions = [];

    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        const {rowSelection} = this.props;
        const {defaultSelectedRows, onChange, key} = rowSelection;

        this.state = {
            selectedRows: {
                keys: (defaultSelectedRows && defaultSelectedRows.length > 0) ? defaultSelectedRows.map(item => item[rowSelection.key]) : [],
                rows: (defaultSelectedRows && defaultSelectedRows.length > 0) ? defaultSelectedRows : []
            },
        };
        if (this.props.rowSelection && this.props.rowSelection.defaultSelectedRows) {

            onChange(this.props.rowSelection.defaultSelectedRows)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.rowSelection && props.rowSelection.resetAllSelected) {

            if (props.rowSelection.resetAllSelected && state.selectedRows.keys.length > 0) {
                if (props.rowSelection.onChange) {
                    props.rowSelection.onChange([])
                }
                return {
                    selectedRows: {
                        keys: [],
                        rows: []
                    },
                };
            }
        }
        return null;
    }


    setScrollInRight(){
        if (this.tableRef && this.tableRef.current) {
            const tableBody = this.tableRef.current.querySelector('.ant-table-body');
            tableBody.scrollLeft = tableBody.scrollWidth;
        }
    }

    componentDidMount() {
        this.setScrollInRight();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const {columnsDefinition}=this.props;
        if (columnsDefinition.length>0 && !objectsAreSame(prevProps.columnsDefinition,columnsDefinition) ){
            const {filter}=this.props;

            if (this.props.filter && this.props.filter.onFilter){
                const filterColumns= <FilterColumns columns={filter.columns}
                                                    filterColumns={filter.filterColumns}
                                                    onFilter={(data)=>{
                                                        this.props.filter.onFilter(data)}
                                                    }
                                     />;
                this.props.hasFilter(filterColumns)
            }
        }
    }

    tableIsSelectable = () => {
        const {rowSelection} = this.props;
        return Boolean(rowSelection.selectable);
    };

    tableIsMultiSelectable = () => {
        const {rowSelection} = this.props;
        return Boolean(rowSelection.multiSelectable);
    };

    selectAllRowsIsDisable = () => {
        const {rowSelection, data} = this.props;
        if (arrayIsEmpty(data) || !this.tableIsMultiSelectable() || rowSelection.disableSelectable) {
            return true;
        }
        return false;
    };

    getSelectCheckboxProps = (record) => {
        const {rowSelection} = this.props;
        return {
            disabled: Boolean(getValue(record, rowSelection.disableSelectable)),
        };
    };

    callOnRowSelectionCallback = () => {
        const {selectedRows} = this.state;
        const {rowSelection} = this.props;
        const {restRowSelection} = rowSelection;
        rowSelection.onChange(selectedRows.rows);
    };

    getRowSelectionConf = () => {
        let defaultSelect = this.state.selectedRows.defaultSelected;
        const {selectedRows} = this.state;
        let selectionConf = null;
        if (this.tableIsSelectable()) {
            let columnTitle = null;
            if (this.selectAllRowsIsDisable()) {
                columnTitle = <BasicCheckbox disabled/>;
            }
            selectionConf = {
                onSelect: this.handleRowSelect, //  executed when select/deselect one row
                onSelectAll: this.handleAllSelect,
                getCheckboxProps: this.getSelectCheckboxProps,
                selectedRowKeys: selectedRows.keys,
                columnTitle,
                columnWidth: FixedWidth.SELECTION_COL_WIDTH,
                sorter: false,
            };
        }
        return selectionConf;
    };

    IsMultiAndGroupSelection = () => this.tableIsMultiSelectable();

    getFirstRowIndex = () => {
        const {pagination} = this.props;
        let index = 1;
        if (pagination) {
            index = (pagination.current - 1) * (pagination.pageSize) + 1;
        }
        return index;
    };

    handleGroupSelect = (record) => {
        const {data, rowSelection} = this.props;
        const {key} = rowSelection;
        let keys = [], rows = [];
        const startIndex = this.getFirstRowIndex();
        // make array of previous rows index and data
        for (let index = startIndex; index <= record[key]; index++) {
            const rowData = data.find(item => item[key] == index);
            keys.push(index);
            rows.push(rowData);
        }
        return {keys, rows};
    };

    handleGroupDeselect = (record, changeRows) => {
        const {selectedRows} = this.state;
        const {rowSelection} = this.props;
        const {key} = rowSelection;
        const selectedRowIndex = record[key];
        const maxKey = Math.max(...selectedRows.keys);

        if (selectedRowIndex != maxKey) {
            rowSelection.groupSelection.onError(record);
            return selectedRows;
        }
        return {
            keys: changeRows.map(item => item[key]),
            rows: changeRows,
        };
    };

    handleGroupSelection = (record, selected, changeRows) => {
        const {rowSelection} = this.props;
        const {key} = rowSelection;
        let selectedRecord = this.state.selectedRows;

        if (selected) {
            selectedRecord = {
                rows: contactTwoObjectArrayWithoutRepeat(selectedRecord.rows, changeRows, key),
                keys: contactTwoObjectArrayWithoutRepeat(selectedRecord.keys, changeRows.map(item => item[key]))
            }
        } else {
            selectedRecord = {
                rows: selectedRecord.rows.filter(item => record[key] !== item[key]),
                keys: selectedRecord.keys.filter(item => record[key] !== item),
            }
        }

        return selectedRecord
    };

    handleNormalSelection = (record, changeRows) => {
        const {rowSelection} = this.props;
        const {key} = rowSelection;
        const newSelectedRows = {keys: [], rows: []};
        const multiSelectable = this.tableIsMultiSelectable();
        newSelectedRows.keys = multiSelectable ? changeRows.map(item => item[key]) : [record[key]];
        newSelectedRows.rows = multiSelectable ? changeRows : [record];
        return newSelectedRows;
    };

    handleRowSelect = (record, selected, changeRows) => {
        let selectedRecord = this.state.selectedRows;

        if (this.IsMultiAndGroupSelection()) {
            selectedRecord = this.handleGroupSelection(record, selected, changeRows)
        } else {
            selectedRecord = this.handleNormalSelection(record, changeRows);
        }
        this.updateSelectedRows(selectedRecord);
    };

    handleAllSelect = (selected, selectedRows, changeRows) => {
        const {rowSelection} = this.props;
        const {key} = rowSelection;
        let newSelectedRows = this.state.selectedRows;
        if (selected) {
            newSelectedRows = {
                rows: [...newSelectedRows.rows, ...changeRows],
                keys: (newSelectedRows.keys).concat(changeRows.map(item => item[key])),
            }
        } else {
            changeRows.forEach(function (val, index) {
                newSelectedRows = {
                    rows: newSelectedRows.rows.filter(item => val[key] !== item[key]),
                    keys: newSelectedRows.keys.filter(item => val[key] !== item),
                }
            })
        }
        this.updateSelectedRows(newSelectedRows);
    };

    updateSelectedRows = (newSelectedRows) => {
        this.setState(prevState => ({
            ...prevState,
            selectedRows: {
                ...prevState.selectedRows,
                keys: newSelectedRows.keys,
                rows: newSelectedRows.rows,
            },
        }), () => {
            this.callOnRowSelectionCallback();
        });
    };
    existRowIdentifier = () => {
        const {rowIdentifier} = this.props;
        return exist(rowIdentifier);
    };

    getRowIdentifier = (record) => {
        const {rowIdentifier, appearance, rowSelection} = this.props;
        let identifierElem = null;

        rowIdentifier.forEach((identifier) => {
            const columnValue = getValue(record, identifier.dataAddress);
            // if (columnValue === identifier.dataValue) {
            if (identifier.operator) {
                if (identifier.operator(record)) {
                    identifierElem = (
                        <RowIdentifier
                            identifier={identifier}
                            placement={appearance && appearance.orientation === Directions.RTL ? Positions.LEFT : Positions.RIGHT}
                            selectableTable={rowSelection}
                        />
                    );
                }
            }else{
                if (columnValue === identifier.dataValue) {
                    identifierElem = (
                        <RowIdentifier
                            identifier={identifier}
                            placement={appearance && appearance.orientation === Directions.RTL ? Positions.LEFT : Positions.RIGHT}
                            selectableTable={rowSelection}
                        />
                    );
                }
            }
        });

        return identifierElem;
    };

    getPaginationConf = () => {
        const {pagination} = this.props;
        if (exist(pagination)) {
            if (pagination.client){
                return {
                    pageSize: pagination.countPerPage,
                    showLessItems: true,
                    showTotal: (total, range) => {
                        return `تعداد ${range[0]} تا ${range[1]} از  ${total} رکورد یافت شده`
                    }
                }
            }else{
                if (pagination.onChange) {
                    const cb = pagination.onChange;
                    const changePageHandler = (current, pageSize) => {
                        cb(current, pageSize);
                    };
                    pagination.onChange = changePageHandler;
                }
                return {
                    ...pagination,
                    onChange: (current, pageSize) => {
                        this.setScrollInRight();
                        const fromIndex = (current - 1) * pageSize + 1;
                        pagination.onChangePage(fromIndex, pageSize, current);
                    },
                    pageSizeOptions: ["10", "20", "50"],//TODO: remove hard code
                    showSizeChanger: true,
                    onShowSizeChange: pagination.onShowSizeChange,
                    locale: {items_per_page: ""},
                    pageSize: pagination.countPerPage,
                    total: pagination.totalCount,
                    current: pagination.currentPage,
                    showLessItems: true,
                    hideOnSinglePage: pagination.totalCount<10,//TODO: remove hard code
                    showTotal: pagination.showDetails == false ? '':(total, range) => {
                        return `تعداد ${range[0]} تا ${range[1]} از  ${total} رکورد یافت شده`
                    }
                };
            }
        }

        return false;
    };
    getLink = (linksConfiguration,record,column,content)=>{
        let links=null;
        if (!linksConfiguration || Object.keys(linksConfiguration).length ==0){
            return (
                <div>
                    {content}
                </div>
            );
        }
        links= linksConfiguration.map((identifier) => {
            if (identifier.actionParameterAddress){
                if (column.dataAddress === identifier.actionParameterAddress){

                    const columnValue = getValue(record, column.dataAddress);
                    if (identifier.permissionField === undefined || getValue(record, identifier.permissionField)) {
                        return (
                            <Tooltip title={identifier.tooltip} placement="bottom">
                                <a style={inlineStyles.link}
                                   onClick={identifier.onClick.bind(null,record)}>
                                    {columnValue}
                                </a>
                            </Tooltip>
                        );
                    } else {
                        return (
                            <div>
                                {columnValue}
                            </div>
                        );
                    }
                }
            }else if(column.link === true){

                const columnValue = getValue(record, column.dataAddress);
                if (identifier.permissionField === undefined || getValue(record, identifier.permissionField)) {
                    return (
                        <Tooltip title={identifier.tooltip} placement="bottom">
                            <a style={inlineStyles.link}
                               onClick={identifier.onClick.bind(null,record)}>
                                {columnValue}
                            </a>
                        </Tooltip>
                    );
                } else {
                    return (
                        <div>
                            {columnValue}
                        </div>
                    );
                }

            }



        });
        return links;
    };

    getBadges = (badgeConfiguration,record,column,content)=>{
        let badges=null;
        badges= badgeConfiguration.map((identifier) => {
            if (column.dataAddress === identifier.dataAddress) {

                const columnValue = getValue(record, identifier.relatedDataAddress);
                if (identifier.status && identifier.status =='danger'){
                    if (columnValue === identifier.dataValue) {
                        return (
                            <Tooltip title={identifier.tooltip} placement="bottom">
                                {/*<FontAwesome*/}
                                {/*    style={{color: 'orange'}}*/}
                                {/*    size='2x'*/}
                                {/*    name='icon-warning-sign'*/}
                                {/*/>*/}
                                <div style={{display:'inline-block'}}><i className="fa fa-exclamation-triangle" style={{color: identifier.color,display:'inline-block',fontSize:'18px'}}></i>
                                </div>
                            </Tooltip>
                        );
                    }
                }
                else if (columnValue === identifier.dataValue || identifier.relatedDataAddress === undefined) {
                    return (
                        <Tooltip title={identifier.tooltip} placement="bottom">
                            {/*<Tag color={identifier.color}>{content}</Tag>*/}
                            <Badge count={content} overflowCount={99} style={{backgroundColor:identifier.color,paddingRight:'8px',paddingLeft:'8px',marginLeft:'2px',direction:'rtl'}} />
                        </Tooltip>
                    ) ;


                }
            }
        });
        return badges;
    };

    getCellContent = (content, record, column) => {
        const cellContent = {
            children: [],
            props: {className:column.cssClass},
        };
        if (isPrimitive(content)) {
            cellContent.children = this.getContentFromPrimitive(content, record, column);
            const {badgeConfiguration} = this.props;
            const {links} = this.props;
            if (exist(badgeConfiguration) && badgeConfiguration.find(item=> item.dataAddress == column.dataAddress)) {
                cellContent.children = (<div style={{display:'inline-block'}}>
                    {this.getBadges(badgeConfiguration, record, column, content)}
                </div>);

            }
            if (column.link == true){
                cellContent.children = (<div style={{display:'inline-block'}}>
                    {this.getLink(links, record, column, content)}
                </div>);
            }

        } else if (isAction(content)) {
            cellContent.children = <Actions actions={content}/>;
        } else if (React.isValidElement(content)) {
            cellContent.children = content;
        }else{
            // cellContent.children = this.getContentFromPrimitive(content, record, column);
        }
        return cellContent;
    };

    getContentFromPrimitive(content, record, column) {
        const {index, maxColContent} = column;
        let cellContent = '';
        if (isBoolean(content)) {
            cellContent = this.getBooleanContent(content); // TODO:later change boolean content by icon or ...
        } else {
            cellContent = this.getStringContent(content, maxColContent);
            if (this.colIsRowIndex(index)) {
                const rowIdentifier = this.getIdentifier(record);
                cellContent = (
                    <React.Fragment>
                        {cellContent}
                        {rowIdentifier}
                    </React.Fragment>
                );
            }
        }
        return cellContent;
    }

    getIdentifier(record) {
        let identifier = '';
        if (this.existRowIdentifier()) {
            const rowIdentifier = this.getRowIdentifier(record);
            identifier = <span>{rowIdentifier}</span>;
        }
        return identifier;
    }

    getStringContent(content, maxColContent) {
        const colContent = maxColContent ? maxColContent : MAX_COL_CONTENT;
        if (content.toString().length > colContent) {
            return (
                <Tooltip title={content} placement="bottom">
            <span style={inlineStyles.colContent}>
              {content.substring(0, colContent)}
                ...
            </span>
                </Tooltip>
            );
        }
        return <span style={inlineStyles.colContent}>{content}</span>;
    }

    getBooleanContent(content) {
        if (content) {
            return <FontAwesome style={{padding: '5px', color: 'rgba(0,0,0,0.82)'}} name={'fas fa-check'}/>
        }
        return <FontAwesome style={{padding: '5px', color: '#9C9898'}} name={'fas  fa-close'}/>
    }

    // TODO: this method is Temporary, impelement better way instead of index == 0
    colIsRowIndex = index => index == 0 // implement any condition for index, here


    renderCols = (columnsDefinition, tableWidth) => {
        const {rowSelection, rowIndex} = this.props;
        const {key} = rowSelection;
        /*================ add rowIndex as a dataItem ==============*/
        if (rowIndex) {
            addRowIndex(columnsDefinition, this.props.data, this.props.pagination);
        }
        /*=============== actions ====================*/
        if (this.props.actions && this.props.actions.length>0 && !arrayIsEmpty( this.props.data)) {
            generateActionsCol(this.props.actions, this.props.data, columnsDefinition, this.props.handleAction);
        }

        return columnsDefinition.map((column, index) => {
            if (isColumnGroup(column)) {
                return (
                    <ColumnGroup title={column.title} key={column.key}>
                        {this.renderCols(column.columns, column.key)}
                    </ColumnGroup>
                );
            }
            return (
                <Column
                    className={column.cssClass}
                    width={column.width}
                    title={column.title}
                    dataIndex={column.dataAddress}
                    key={column.key}
                    sorter={!arrayIsEmpty(this.props.data) && this.props.onColumnSorted && column.sortable}
                    render={(content, record) => this.getCellContent(content, record, {...column, index})}
                    fixed={this.props.rowSelection.key ? false : column.fixed}//TODO:improve this code
                />
            );
        });
    };

    getColumnsLength = () => {
        const {columnsDefinition} = this.props;
        let {length} = columnsDefinition;
        columnsDefinition.forEach((col) => {
            if (col.hiddenColumn) {
                length -= 1;
            }
        });
        return length;
    };
    tableOnChange = (pagination, filters, sorter) => {
        const paginationConfig=this.props.pagination;
        if ((!pagination && !filters) || (pagination.current == paginationConfig.currentPage && pagination.pageSize == paginationConfig.countPerPage)){
            if (this.props.onColumnSorted && sorter && sorter.field && sorter.order) {
                this.props.onColumnSorted(sorter.field, sorter.order)
            }
        }
    };

    getFinalTableWidth = (width) => {
        let tableWidth;
        if (width > 0) {
            if (width  < tableRefWidth) {
                // tableWidth = "max-content";
                tableWidth = tableRefWidth-200;
            } else {
                tableWidth = width ;
            }
        } else {
            tableWidth = true;
        }
        return tableWidth;
    };

    render() {
        const {
            appearance,
            columnsDefinition,
            data,
            title,
            rowSelection,
            scroll
        } = this.props;

        /*============ selection config=======-========== */
        const selectionConf = this.getRowSelectionConf();
        /*=========== change pagination onChange for reset selected rows ============== */
        const paginationConf = this.getPaginationConf();

        let totalWidth = 0;
        let tableDataPack =[];
        if (data) {
            tableDataPack = calculateColumnsWidth(columnsDefinition, data, 500);
            totalWidth = tableDataPack ? tableDataPack.tableWidth : 0;
        }
        tableRefWidth = this.tableRef.current ? this.tableRef.current.offsetWidth : 0;
        let tableWidth = this.getFinalTableWidth(totalWidth);

        let scrollable =  typeof scroll === 'object' ? true : scroll ;
        const TableScroll=!arrayIsEmpty(data)  ? {  y: scrollable ?  scroll.y : null, x: scrollable ? tableWidth : true} :  {x:true}
        let table = (
            <div ref={this.tableRef}>
                <Table
                    onChange={this.tableOnChange.bind(this)}
                    dataSource={!arrayIsEmpty(data) ? data : []}
                    pagination={paginationConf}
                    bordered
                    indentSize={0}
                    scroll={TableScroll}
                    size="small"
                    rowKey={(rowSelection && rowSelection.key) ? rowSelection.key : "rowIndex"}
                    rowSelection={selectionConf}
                    title={title && (() => title)}
                    locale={{emptyText: captions.emptyText}}
                >
                    {/*{this.renderCols(totalWidth < tableRefWidth ? columnsDefinition.filter(column => !column.hiddenColumn) : tableDataPack.columns.filter(column => !column.hiddenColumn), tableWidth)}*/}
                    {tableDataPack.columns && this.renderCols(tableDataPack.columns.filter(column => !column.hiddenColumn), tableWidth)}
                </Table>
            </div>
        );
        return table;
    }
}
// that.state.keySelected

/*============ type check ======================== */
ResultTable.propTypes = {
    onColumnSorted: PropTypes.func,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
    columnsDefinition: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node,
            key: PropTypes.string,
            dataAddress: PropTypes.string,
            hiddenColumn: PropTypes.bool,
            sortable: PropTypes.bool,
            maxColContent: PropTypes.number,
        }),
    ).isRequired,
    rowIdentifier: PropTypes.arrayOf(PropTypes.shape({
        dataAddress: PropTypes.string.isRequired,
        dataValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
        color: PropTypes.string.isRequired,
        tooltip: PropTypes.string,
    })),
    badgeConfiguration: PropTypes.arrayOf(PropTypes.shape({
        dataAddress: PropTypes.string.isRequired,
        relatedDataAddress: PropTypes.string.isRequired,
        dataValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
        color: PropTypes.string.isRequired,
        tooltip: PropTypes.string,
    })),
    actions: PropTypes.arrayOf({
        actionDefinition: {
            icon: PropTypes.string.isRequired,
            tooltip: PropTypes.string,
            color: PropTypes.string
        }.isRequired,
        permissionField: PropTypes.string,//  داشته اگر permissionField و validPermissionField -----> مقدار باید با validPermissionField برابر باشه
        contraryPermissionField: PropTypes.string,
        actionParameterAddress: PropTypes.string,
        validPermissionField: PropTypes.string,
        onClick: PropTypes.func,
    }),
    links: PropTypes.arrayOf({
        tooltip: PropTypes.string,
        permissionField: PropTypes.string,
        contraryPermissionField: PropTypes.string,
        actionParameterAddress: PropTypes.string,
        onClick: PropTypes.func,
    }),
    onChange: PropTypes.func,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number,
        onChangePage: PropTypes.func,
        countPerPage: PropTypes.number,
        totalCount: PropTypes.oneOf[PropTypes.string, PropTypes.number],
        showDetails: PropTypes.bool,
    }),
    rowSelection: PropTypes.shape({
        key: PropTypes.string.isRequired,
        selectable: PropTypes.bool,
        multiSelectable: PropTypes.bool,
        onChange: PropTypes.func,
        defaultSelected: PropTypes.arrayOf(PropTypes.shape),
        resetAllSelected: PropTypes.bool
    }),
    rowIndex: PropTypes.bool,
    scroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({y: PropTypes.number, x: PropTypes.number})])

};

ResultTable.defaultProps = {
    title: null,
    onChange: emptyFunction,
    rowSelection: {},
    showSelectColumn :true,
    settingFlag:true
};

export default ResultTable;