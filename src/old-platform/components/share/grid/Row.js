import React from 'react';
import { Row as AntRow } from 'antd';
import PropTypes from 'prop-types';

class GridList extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
        justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
    };

    render() {
        const {gutter,justify,children,align}=this.props;
        return (
            <AntRow gutter={gutter ? gutter : 15} justify={justify} type={'flex'} align={align}>
                {children}
            </AntRow>
        );
    }
}

export default GridList;
