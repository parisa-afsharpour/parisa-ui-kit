import React from 'react';
import PropTypes from 'prop-types';
import { stylesMapping, elementMapping } from './mapings';

const gutterBottomStyle = {
    marginBottom: 20
};

class Typography extends React.Component{

    static propTypes = {
        type: PropTypes.oneOf([
            'body1',
            'body2',
            'button',
            'caption',
            'heading1',
            'heading2',
            'heading3',
            'heading4',
            'heading5',
            'heading6',
            'subTitle1',
            'subTitle2']),
        style: PropTypes.object,
        gutterBottom: PropTypes.bool,
        color: PropTypes.string
    };
    static defaultProps = {
        type: 'body1',
        style: {},
        gutterBottom: false,
        color: '#000'
    };

    getStyles(){
         const {style, gutterBottom, type, color} = this.props;
         let styles = {...stylesMapping[type], color};
        
         if(gutterBottom){
            Object.assign(styles, gutterBottomStyle)
        }
        
         if(style){
             Object.assign(styles, style);
         }
        return styles;
    }

    render(){
        const { type, children } = this.props;
        const Comp = elementMapping[type];
        return(
            <Comp style={this.getStyles()}  children={children}/>
        );
    }
}

export default Typography;
