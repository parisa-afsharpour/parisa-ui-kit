import React from "react";
import PropTypes from 'prop-types';
import { Tabs as AntTabs} from 'antd';
const { TabPane } = AntTabs;


class Tabs extends React.Component {
    constructor (props) {
        super(props)
    }

    createTabs(tabs){
        let tabsNode =[];
        tabs.forEach((tab)=>{
            if(!Boolean(tab.invisible)){
                tabsNode.push(<TabPane key={tab.key}
                                       tab={tab.label}
                >
                    {tab.component}
                </TabPane>);
            }
        });
        return tabsNode;
    }
    handleOnTabClick(activeKey,event){

        this.callOnActiveTab(activeKey);
    }

    callOnActiveTab(activeKey) {
        const targetTab = this.props.tabs.find(tab => tab.key === activeKey);
        if (targetTab) {
            const {onActive} = targetTab;
            if (onActive && typeof onActive === 'function') {
                onActive();
            }
        }
    }

   render() {
       let { tabs, defaultActiveKey, onChange,tabPosition } = this.props;
       const tabsNode= this.createTabs(tabs);

        return(
            <div className="card-container">
            <AntTabs type="card"
                     tabPosition={tabPosition}
                     defaultActiveKey={defaultActiveKey || tabs[0].key}
                     onTabClick={this.handleOnTabClick.bind(this)}
                     onChange={onChange}>
                {tabsNode}
            </AntTabs>
            </div>
        )
   }
}

Tabs.propTypes = {
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        component : PropTypes.node.isRequired,
        onActive: PropTypes.func,
        invisible: PropTypes.bool
    }).isRequired),
    tabPosition:PropTypes.string
};
   
export default Tabs;

    