import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from '../fontIcon/FontIcon';
import { Dropdown, Menu } from 'antd';
import { getCustomContainer, handleVisibleChange } from '../utils/popupContainer';
import IconButton from '../iconButton/IconButton';
import {emptyFunction} from '../utils/function';

const inlineStyles = {
    dropDownLink: { cursor: 'pointer', fontSize: 16, fontWeight: 'bold',display:'inline-block', height:14},
    menuWrapper: { margin: '0 5px' },
    dropDownItem: { fontSize: 13,cursor: 'pointer' }
};

class DropDownActions extends React.Component {

    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            onClick: PropTypes.func
        })),
        placement: PropTypes.string,
    };

    static defaultProps = {
        placement: 'bottomCenter'
    };

    getDropDownActions = (actions) => {
        const dropDownItems = this.getDropDownItems(actions),
            actionsMenu = (<Menu style={inlineStyles.menuWrapper}
                                onOpenChange={handleVisibleChange.bind(null, false)}>
                {dropDownItems}
            </Menu>);

        return (<Dropdown overlay={actionsMenu}
                         getPopupContainer={getCustomContainer}
                         onVisibleChange={handleVisibleChange}
                         trigger={['click']}
                         placement={this.props.placement}>
            {this.getEllipsisIcon()}
        </Dropdown>);
    };

    getDropDownItems = (actions) => {
        return actions.map((action, index) => {
            const dropDownItem = this.getItemContent(action);
            return (<Menu.Item key={index}>{ dropDownItem }</Menu.Item>);
        });
    };

    getItemContent = (action) => {
        return (
            <div onClick={action.onClick}
                  style={inlineStyles.dropDownItem}>
             <FontIcon icon={action.icon}/>
             <span>{action.tooltip}</span>
             </div>
        );
    };

    getEllipsisIcon = () => {
        return (
            <IconButton icon={'ellipsis-h'} onClick={emptyFunction}/>
        )
    };

    render() {
        const {actions} = this.props;
        return (
            <div style={{display:'inline-block'}}>
                {this.getDropDownActions(actions)}
            </div>
        );
    }
}

export default DropDownActions;