import React from 'react';
import AsyncPaginate from "react-select-async-paginate";

 import loadOptions from "./loadOptions";


class LazyLoadOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:{
                value: this.props.value.value ? this.props.value.value : '',
                label: this.props.value.label ? this.props.value.label : ''
            }
        };
    }

    handleChange = (value)=>{
        const {onChange} = this.props;
        if (onChange && typeof onChange === 'function') {
            this.props.onChange(value.value)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.value) != JSON.stringify(prevProps.value)) {
            if (this.props.value) {
                this.setState( {
                    value:{
                        value: this.props.value.value ? this.props.value.value : '',
                        label: this.props.value.label ? this.props.value.label : ''
                    }
                });
            }else {
                this.setState( {
                    value:{
                        value:  '',
                        label:  ''
                    }
                });
            }
        }
    }
    

    render(){
        return (
            <React.Fragment>
            <div>
                {this.props.label}
            </div>
            <AsyncPaginate

                value={this.props.value.value}
                onChange={this.handleChange}
                loadOptions={loadOptions}
                isDisabled={this.props.disabled}
                placeholder={'انتخاب'}
                additional={{
                    options: this.props.buildData
                  }}
            />
            </React.Fragment>

        );
    }


}


export default LazyLoadOptions;