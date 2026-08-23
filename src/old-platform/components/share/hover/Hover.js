import * as React from 'react';

class Hover extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isHover: false,
        };
    }

    handleHover = ()=> this.setState({ isHover: true });
    handleBlur = ()=> this.setState({ isHover: false });

    render(){
        const {isHover} = this.state;
        const {
            children,
            hoverStyle = {},
            hoverTransition = 200,
            wrapperType='inline',
        } = this.props;
        const childElement = children;
        const WrapperElement = wrapperType == 'inline' ? 'span' : 'div';
        const baseStyles = childElement.props.style || {};

        Object.assign({},baseStyles, { transition: `all ${hoverTransition}ms` });

        return (
            <WrapperElement onMouseEnter={this.handleHover}
                            onMouseLeave={this.handleBlur}>
                {React.cloneElement(childElement, {style: isHover ? {...baseStyles, ...hoverStyle} : baseStyles,})}
            </WrapperElement>
        );
    }
}

export default Hover;