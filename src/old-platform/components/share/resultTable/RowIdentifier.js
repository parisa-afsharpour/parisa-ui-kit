import * as React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

class RowIdentifier extends React.Component {

    static propTypes = {
        placement: PropTypes.string,
        identifier: PropTypes.shape({
            tooltip: PropTypes.string,
            color: PropTypes.string,
        }),
        selectableTable: PropTypes.bool,
    };

    render(){
        const { identifier, placement } = this.props;

        return(
            <Tooltip placement={placement} title={identifier.tooltip}>
                 <span className={['rowIdentifier', 'offset0']}
                       style={{background: identifier.color}}/>
            </Tooltip>
        );
    }

}

export default  RowIdentifier;