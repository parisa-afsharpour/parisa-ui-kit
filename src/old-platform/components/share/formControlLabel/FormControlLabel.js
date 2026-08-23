import React from 'react';
import PropTypes from 'prop-types';
function FormControlLabel({label, isMandatory, mandatoryMark, style}) {
    const inlineStyles = {
        label:{ fontSize: 12, margin: '1px auto', display:'inline-block',...style },
        star:{fontSize:12,margin: '1px 2px',color:'red', display:'inline-block',fontWeight:'700'}
    };


    return (
        <React.Fragment>
            <Typography type={'caption'} children={label} style={inlineStyles.label}/>
           {isMandatory && <p style={inlineStyles.star}>{mandatoryMark}</p>}
        </React.Fragment>

);
}

import Typography from '../typography/Typography';

FormControlLabel.propTypes = {
    isMandatory: PropTypes.bool,
    label: PropTypes.string.isRequired,
    mandatoryMark: PropTypes.string,
    style: PropTypes.object
};

FormControlLabel.defaultProps = {
    isMandatory: false,
    label: '',
    mandatoryMark: ' * ',
    style: {}
}

export default FormControlLabel;