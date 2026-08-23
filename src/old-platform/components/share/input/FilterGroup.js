import React, {Component} from 'react';
import SelectOption from "../selectOption/SelectOption";
import TextField from "../textField/TextField";
import PropTypes from 'prop-types';
import IconButton from "../iconButton/IconButton";
import GridTile from "../grid/Col";
import GridList from "../grid/Row";


class FilterGroup extends Component {
    constructor(props) {
        super(props);
    }

    convertArrayList(array){
        let convertedData =[];
        if(array[0] && array[0].id){
            array.map((element) => {
                let obj = {text : element['text'] , value : element['id'] }
                convertedData.push(obj)
            })
            return convertedData;
        }
        else{
            return array;
        }

    }

    render() {

        return (
            <div >

                    <GridList gutter={-2}>

                    <SelectOption
                        id={this.props.id}
                        value={this.props.defaultValue}
                        values={this.convertArrayList(this.props.values)}
                        onChange={this.props.handleSelect}
                        disabled={this.props.disabled}
                    />


                    <TextField id={'text'}
                               disabled={false}
                               fullWidth={true}
                               value={this.props.inputValue}
                               onChange={this.props.onChange}
                               allowClear={true}
                               onEnter={()=>{this.props.onSearch(this.props.inputValue)}}
                               hintText="جستجو - حداقل سه کاراکتر وارد کنید"
                               noError={"true"}    style={{width:'280px'}}  />


                    <IconButton onClick={()=>{this.props.onSearch(this.props.inputValue)}}
                                key={'search'}
                                tooltip={'جستجو'}
                                icon={'refresh'}
                                iconColor={'green'}
                                size={'8px'}
                                style={{padding:0}}
                                squareButton={true}
                    />

                    </GridList>

            </div>
        );
    }
}
FilterGroup.propTypes = {
    id: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    values:PropTypes.array.isRequired

};

export default FilterGroup;