import React from 'react';
import { Col as AntCol } from 'antd';
import PropTypes from 'prop-types';

class GridTile extends React.Component {
    static propTypes = {
        xs: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        sm: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        lg: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        xl: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        md: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        children: PropTypes.node,
    };

    static defaultProps = {
        xs: 24,
        sm: 24,
    };

    render() {
        const config = {
            lg: this.props.lg,
            xs: this.props.xs,
            sm: this.props.sm,
            xl: this.props.xl,
            md: this.props.md,
        };

        return (
            <AntCol xs={config.xs} sm={config.sm} lg={config.lg} xl={config.xl} md={config.md}>
                {this.props.children}
            </AntCol>
        );
    }
}

export default GridTile;
