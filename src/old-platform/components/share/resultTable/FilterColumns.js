import * as React from 'react';
import PropTypes from 'prop-types';
import {Checkbox as AntCheckbox, Dropdown, Menu, Tooltip} from 'antd';
import IconButton from "../iconButton/IconButton";
import { Popover, Button,Checkbox,Divider } from 'antd';
import {isArray} from "../utils/array";

const inlineStyles = {
    filterText : {padding: '0 20px'},
    filterItem: { margin:0,padding:0, height:34, lineHeight: '34px' },
    filterTitle: {fontSize:'12px', padding:'12px 0 12px 15px', cursor: 'pointer'},
    dropDownStyle: { boxShadow:'0 0 5px gray' }
};

class FilterColumns extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           visible: this.props.visible ? this.props.visible : false,
           checkedItems:this.props.filterColumns != undefined ? this.props.columns : this.props.filterColumns
       };

   }
    close = () => {
        this.setState({
            visible: false,
            checkedItems:this.props.filterColumns
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({
            visible: visible,
            checkedItems:this.props.filterColumns
        });
    };


    handleSelect=(checked,item)=>{
        const {columns}=this.props;
        const {selectedKeys}= item;
        let result = columns.filter(function (el) {
            return selectedKeys.includes(el.key);
        });
        this.setState({
            checkedItems:result
        });
    };

    handleFilter=()=>{
        if(this.props.onFilter){
            this.props.onFilter(this.state.checkedItems)
        };
        this.setState({visible:false});
    };

    render() {
        const { columns ,filterColumns} = this.props;
        const {checkedItems} = this.state;
        const hasSelectedFilter=isArray(filterColumns) && isArray(columns) && filterColumns.length === columns.length;

        return (
            <Popover
                className={'filter'}
                getPopupDomNode={() => document.getElementById('filterTableColsContainer')}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                placement="bottomRight"
                content={
                    <div>
                    <Menu style={{textAlign:'right'}}
                          onSelect={this.handleSelect.bind(this, true)}
                          onDeselect={this.handleSelect.bind(this, false)}
                          multiple={true}
                          selectedKeys={this.state.checkedItems && this.state.checkedItems.map(element => element.key)} >
                        {columns.filter(column => !column.hiddenColumn).map(column => (
                            <Menu.Item key={column.key} style={inlineStyles.filterItem} >

                                <Checkbox
                                    checked={this.state.checkedItems && this.state.checkedItems.find(element => element.key === column.key)}
                                >
                                    {column.title}
                                </Checkbox>
                            </Menu.Item>)
                        )}

                    </Menu>
                    <Divider style={{margin:0}}/>
                    <div style={{ display: 'flex'}}>
                        <Button type={'link'} onClick={this.handleFilter}>فیلتر</Button>
                        <Button type={'link'} style={{marginRight: 'auto'}} onClick={this.close}>بستن</Button>
                    </div>
                    </div>
                }
            >
                    <IconButton
                        id={'filterTableColsContainer'}
                        onClick={()=>{}}
                        icon={'filter'}
                        iconColor={hasSelectedFilter?  'gray' :'#33ab49'}
                        tooltip={'فیلتر ستون های جدول'}
                    />
            </Popover>
        );
    }
}

FilterColumns.PropTypes= {
    columns:PropTypes.array.isRequired,
    filterColumns:PropTypes.array.isRequired,
    onFilter:PropTypes.func.isRequired,


};

export default FilterColumns;