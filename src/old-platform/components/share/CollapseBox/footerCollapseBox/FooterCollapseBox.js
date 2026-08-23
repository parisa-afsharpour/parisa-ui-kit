import React from 'react';


const inlineStyles = {
    container : {
        borderTop:'1px solid #d9d9d9'
    },
    margin:{margin:'7px 15px'}
}
export class FooterExpander extends React.Component {

    static propTypes = {

    };

    render() {
        const {
            children,
        } = this.props;

        return (
            <div style={inlineStyles.container}>
                <div style={inlineStyles.margin}>
                    {children}
                </div>
            </div>
        );
    }
}

export default FooterExpander;