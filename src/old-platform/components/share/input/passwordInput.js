import * as React from 'react';
import TextField from '../textField/TextField';
import Row from '../grid/Row';
import Col from '../grid/Col';
import FormHelperText from '../formHelperText/FormHelperText';
import FormControlLabel from '../formControlLabel/FormControlLabel';

const businessMessage = {
  errorText: {
    id: 'errorText',
    defaultMessage: 'پسوردهای وارد شده مطابقت ندارند.',
  },
  passWord: {
    id: 'passWord',
    defaultMessage: 'پسورد',
  },
  confirmPassWord: {
    id: 'confirmPassWord',
    defaultMessage: 'تایید پسورد',
  },
};

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        passWord: this.props.value.passWord ? this.props.value.passWord : '',
        confirmPassWord: this.props.value.confirmPassWord
          ? this.props.value.confirmPassWord
          : '',
      },
    };
    if (props.validatorRegistrar) {
      props.validatorRegistrar(this.validation.bind(this));
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(this.props.value) != JSON.stringify(prevProps.value)) {
      if (this.props.value) {
        this.setState({
          value: {
            passWord: this.props.value.passWord
              ? this.props.value.passWord
              : '',
            confirmPassWord: this.props.value.confirmPassWord
              ? this.props.value.confirmPassWord
              : '',
          },
        });
      }
    }
  }
validatepassWord(value){
  let val = (typeof value === 'string') || (typeof value === 'number') ? value :
  path ? value[path] : value['value'];
  if (!val.match('[A-Z]') || !val.match('[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\|\\\/\?\>\<]')
      || !val.match('[0-9]') || val.length <= 7 || val.length>=17 )  {
    return {isValid: false}
}
else{
  return {isValid: true}

}
}
  validation(value, formValidation) {
    let validateResult = { isValid: true };
    if ((formValidation && formValidation.mandatory===true) ||  (value && value.passWord.length>0 )) {
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        !value.passWord ||
        !value.confirmPassWord ||
        value.passWord === '' ||
        value.confirmPassWord === '' //TODO OBJECT.KEYS.LEMGTH == 0
      ) {
        validateResult = {
          isValid: false,
          errorText: 'هردو فیلد پسورد و تایید پسورد را وارد کنید',
        };
      } else if (value && value.passWord) {
        const result = this.validatepassWord(value.passWord)
          // format: /[`~!@#$%^&*()_+|\\/?><]/,

        if (!result.isValid) {
          validateResult = {
            isValid: false,
            errorText:
                'پسورد حداقل باید بین 8 تا 16 کاراکتر دارای حروف بزرگ و عدد و یک علامت غیر حرفی باشد',
          };
        } else {
          if (value.passWord !== value.confirmPassWord) {
            validateResult = {
              isValid: false,
              errorText: businessMessage.errorText.defaultMessage,
            };
          }
        }
      }
    }
    return validateResult;
  }

  handleOnChange = (type, e) => {
    const { onChange } = this.props;
    let data = {
      passWord: this.state.value.passWord,
      confirmPassWord: this.state.value.confirmPassWord,
    };

    switch (type) {
      case 'passWord':
        data.passWord = e.target.value;
        break;
      case 'confirmPassWord':
        data.confirmPassWord = e.target.value;
        break;
    }
    this.setState({
      value: data,
    });

    if (onChange && typeof onChange === 'function') {
      this.props.onChange(data);
    }
  };

  render() {
    const {
      label,
      mandatoryPresentational,
      errorText,
      value,
      disabled,
    } = this.props;
    return (
      <React.Fragment>
        {this.props.buildData && this.props.buildData.inline?(
                <Row  gutter={5}>
                  <Col sm={12}>
                    <FormControlLabel
                        label={label}
                        isMandatory={mandatoryPresentational}
                    />
                    <TextField
                        onChange={this.handleOnChange.bind(this, 'passWord')}
                        value={this.state.value.passWord}
                        noError={true}
                        disabled={disabled}
                        hintText={businessMessage.passWord.defaultMessage}
                        type='password'
                    />
                  </Col>


                  <Col sm={12}>
                    <FormControlLabel
                        label='تایید پسورد'
                        isMandatory={mandatoryPresentational}
                    />

                    <TextField
                        onChange={this.handleOnChange.bind(this, 'confirmPassWord')}
                        value={this.state.value.confirmPassWord}
                        noError={true}
                        disabled={disabled}
                        hintText={businessMessage.confirmPassWord.defaultMessage}
                        type='password'
                    />
                  </Col>
                </Row>

            ):
            (
                <div>
        <Row>
          <Col sm={24}>
            <FormControlLabel
              label={label}
              isMandatory={mandatoryPresentational}
            />
            <TextField
              onChange={this.handleOnChange.bind(this, 'passWord')}
              value={this.state.value.passWord}
              noError={true}
              disabled={disabled}
              hintText={businessMessage.passWord.defaultMessage}
              type='password'
            />
            <FormHelperText text={''} type={'error'} />
          </Col>
          </Row>

          <Row>

          <Col sm={24}>
            <FormControlLabel
              label='تایید پسورد'
              isMandatory={mandatoryPresentational}
            />

            <TextField
              onChange={this.handleOnChange.bind(this, 'confirmPassWord')}
              value={this.state.value.confirmPassWord}
              noError={true}
              disabled={disabled}
              hintText={businessMessage.confirmPassWord.defaultMessage}
              type='password'
            />
          </Col>
          </Row>
          </div>
            )
          }
            <FormHelperText text={errorText} type={'error'} />

      </React.Fragment>
    );
  }
}

export default PasswordInput;
