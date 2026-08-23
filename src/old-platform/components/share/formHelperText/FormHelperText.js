import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../typography/Typography';

const colors = {
    error: 'red',
};

function FormHelperText({text,type,style}) {
    const inlineStyles = { fontSize: 11, margin: '2px auto', display:'block', height: 10, ...style };

    if(type != 'error' && type != 'label'){
        console.warn(`FormHelperText's type must be 'error' or 'label' but it's '${type}'`)
    }

    return (<Typography children={text} type={'caption'} style={inlineStyles} color={colors[type]}/>);

}

FormHelperText.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error','label']),
    style: PropTypes.object
};

FormHelperText.defaultProps = {
    style: {},
    text: '',
    type: 'label'
};

export default FormHelperText;