import * as React from 'react';
import CircularProgress from '../circularProgress/CircularProgress';
import { buildValuesForCompositeOption } from '../utils/parser';
import Select2 from '../select/Select2';
import { isObject } from '../utils/utils';
import { Select as AntSelect } from 'antd';
const { Option } = AntSelect;


class SelectOption extends React.Component {
    constructor(props) {
        super(props);
        const {dataItems, menuItems, mapDataItems} = this.getOptionData();
        this.state = {
            prevValues: props.values,
            dataItems: dataItems,
            mapDataItems: mapDataItems,
            menuItems: menuItems,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.values || props.values == state.prevValues) {
            return null;
        }

        return getOptionDataDetail(props);
    }

    getOptionData = () => {
        return getOptionDataDetail(this.props);
    };

    handleChange = (value, option) => {
        if (this.props.isComposite) {
            const dataItems = this.state.mapDataItems;
            if (this.props.multiple) {
                let values = [];
                if (Array.isArray(value))
                    value.map((item) => {
                        values.push(dataItems[item]);
                    });

                if (this.props.onChange) {
                    this.props.onChange(option, values);
                }
            } else {
                if (this.props.onChange) {
                    this.props.onChange(option, dataItems[value]);
                }
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(option, value);
            }
        }
    };

    render() {
        let value = this.props.value;
        if (this.props.isComposite) {
            if (this.props.multiple) {
                let list = [];
                if (Array.isArray(value) && value.length > 0)
                    value.map((item) => {
                        list.push(item.value.toString());
                    });
                value = list;
            } else {
                if (isObject(this.props.value) && this.props.value.hasOwnProperty('value')) {
                    value = this.props.value.value.toString();
                } else {
                    value = '';
                }
            }
        } else {
            if (this.props.multiple) {
                let list = [];
                if (Array.isArray(value) && value.length > 0)
                    value.map((item) => {
                        if(item != null)
                        list.push(item.toString());
                    });
                value = list;
            } else {
                value = this.props.value && this.props.value.toString();
            }
        }

        return (
            <Select2
                id={this.props.id}
                label={this.props.label}
                onChange={this.handleChange}
                value={value}
                disabled={this.props.disabled}
                multiple={this.props.multiple}
                fullWidth={this.props.fullWidth}
                errorText={this.props.errorText}
                onBlur={this.props.onBlur}
                mandatoryPresentational={this.props.mandatoryPresentational}
                style={this.props.style}
                autoFocus={this.props.autoFocus}
            >
                {this.state.menuItems ? this.state.menuItems : <CircularProgress/>}
            </Select2>
        );
    }
}

function setMenuItems(dataItems) {
    let menuItems = [];
    if (dataItems) {
        dataItems.forEach((option, index) => {
            if (option) {
                menuItems.push(
                    <Option value={option.value} key={index}>
                        {option.text}
                    </Option>,
                );
            }
        });
    }

    return menuItems;
}

function setCompositeMenuItems(dataItems) {
    let menuItems = [];

    if (dataItems) {
        Object.keys(dataItems).map((id) => {
            if (dataItems[id]) {
                menuItems.push(
                    <Option value={dataItems[id].value} key={dataItems[id].value}>
                        {dataItems[id].text}
                    </Option>,
                );
            }
        });
    }

    return menuItems;
}

function getOptionDataDetail(props) {
    let dataItems = [];

    if (props.headValue) {
        dataItems[0] = props.headValue;
    }
    let counter = 1;
    props.values.forEach((item) => (dataItems[counter++] = item));
    if (props.isComposite) {
        let _dataItems = buildValuesForCompositeOption(dataItems, '', 'value', 'text');
        let menuItems = setCompositeMenuItems(_dataItems);

        return {dataItems: [], menuItems: menuItems, mapDataItems: _dataItems, prevValues: props.values};
    } else {
        let menuItems = setMenuItems(dataItems);

        return {dataItems: dataItems, menuItems: menuItems, mapDataItems: {}, prevValues: props.values};
    }
}

export default SelectOption;
