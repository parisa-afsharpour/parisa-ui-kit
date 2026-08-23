import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../iconButton/IconButton';


class RowActions extends React.Component {
    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            onClick: PropTypes.func,
            color:PropTypes.string
        })),
    };

    getActionsButton =(actions)=> {
        const {squareButton,size}=this.props;
        let actionsButton = null;
        if (Array.isArray(actions) && actions.length) {
            actionsButton = actions.map((action, index) => {
                return (
                    <IconButton onClick={action.onClick}
                             key={index}
                             tooltip={action.tooltip}
                             icon={action.icon}
                             squareButton={squareButton}
                             iconColor={action.color}
                    />)
            });
        }
        return actionsButton;
    };

    render() {
        const {actions} = this.props;
        return (
            <div style={{display:'inline-block'}}>
                {this.getActionsButton(actions)}
            </div>
        );
    }
}

export default RowActions;