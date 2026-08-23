import React from 'react';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';

class CircularProgress extends React.Component{

    static propTypes = {
        size: PropTypes.oneOf(['small','large','default'])
    };

    static defaultProps = {
        size: 'default'
    };

    render() {
        const { size } = this.props;
        const antIcon = <Icon type='loading'  spin/>;
        return (
            <div className={'loadingWrapper'}>
                <Spin size={size} indicator={antIcon} />
            </div>
        );
    }
}

export default CircularProgress;