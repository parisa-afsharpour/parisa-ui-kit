import React, {Component} from "react";
import AsyncPaginate from "react-select-async-paginate";
import loadOptions from "../../../../platform/components/share/options/loadOptions";


class LazySelect extends Component {

    render(){
        const {values,...props} = this.props;
        const selectStyles = {
            control: (base, state) => {

                return {
                    ...base,
                    '&:hover':{borderColor: "#40a9ff"},
                    height:'30px',
                    minHeight: 0,
                    borderColor: state.isFocused ? "#40a9ff":"#d9d9d9",
                    boxShadow: 'none'
                }
            },
            placeholder: (base, state) => {
                return {
                    ...base,
                    top:'38%',
                }
            },
            singleValue: (base, state) => {
                return {
                    ...base,
                    top:'38%',
                }
            },
            indicatorContainer: (base, state) => {
                return {
                    ...base,
                    padding: '4px'
                }
            },
            indicatorSeparator: (base, state) => {
                return {
                    ...base,
                    marginBottom: '12px',
                    marginTop: '5px'
                }
            },
            option: (base, state) => {
                return {
                    ...base,
                }
            }
        };
        return(
            <AsyncPaginate
                styles={selectStyles}
                placeholder={'انتخاب'}
                loadOptions={loadOptions.bind(this, values)}
                {...props}
            />
        )
    }

}

export default LazySelect