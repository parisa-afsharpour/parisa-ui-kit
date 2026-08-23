import React,{Component} from "react";
import FormControlLabel from "../../../../platform/components/share/formControlLabel/FormControlLabel";
import FormHelperText from "../../../../platform/components/share/formHelperText/FormHelperText";
import LazySelect from "../../../../platform/components/share/lazySelect/LazySelect.js"
import {Spin} from "antd";
import {getFetcher} from "../../../../samab/utils/AxiosRestFetcher";
import {messages} from "../form/FormValidation";




class TopicOptions extends Component {

    constructor(props) {
        super(props);
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }
    state = {
        options: []

    };
    validation (value, formValidation){

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null ||
                value ===undefined ||
                value ===''

            )){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }
        }
        return validateResult;
    }

    handleChange=(item)=>{
        if (this.props.onChange){
            this.props.onChange(item.value)
        }
    };

    getComboActionsLazy = (options) => {
        return options
            ? options.map((item, index) => {
                if (item.code !== '*') {
                    return {
                        value: item.code,
                        label: `${item.description}-${item.code}`,
                    };
                } else {
                    return {
                        value: '*',
                        label: 'همه',
                    };
                }
            })
            : [];
    };

    async componentDidMount() {
        const topicOptions = await  getFetcher(`reportData/tppList`, null);
        const options = topicOptions.map(item => {

            return {
                ...item,
                value: item.tppId,
                label: item.companyName + '_' + item.tppId
            };
        })
        options.unshift({value: "", label: 'انتخاب'})
        this.setState({ options });

    }






     render() {
         const {label,mandatoryPresentational,errorText}=this.props;

         const { options,disabled,value } = this.state;


        return (
            <React.Fragment>
                {options.length === 0 ? <Spin size="small" style={{marginTop: '15px'}}/> : <React.Fragment>

                    <FormControlLabel label={label} isMandatory={mandatoryPresentational}/>
                    <LazySelect
                        value={options.find(item => item.value === value)}
                        onChange={this.handleChange}
                        values={options}
                        isDisabled={disabled}
                    />
                    <FormHelperText type={'error'} text={errorText}/>
                </React.Fragment>}

            </React.Fragment>
        )
    }
}




export default TopicOptions;
