import React from 'react';
import PropTypes from 'prop-types';
import Actions from '../../actions/Actions';
import IconButton from '../../iconButton/IconButton';
import Typography from '../../typography/Typography';
import { isValidAction } from '../../resultTable';
import { isValidElement } from 'react';

class HeaderExpander extends React.Component{
    settingIconColor='#d9d9d9';
    static propTypes = {
        title: PropTypes.node ,//string or elements
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            onClick: PropTypes.func,
            tooltip: PropTypes.string,
            color:PropTypes.string
        })),
        settingActions:PropTypes.array,
        visible:PropTypes.func,
    
    };
    constructor(props){
        super(props);
        this.state= {
            showActions: false,
            actionsSpace: 0,
            visible:true,
        };
        this.containerRef = React.createRef();
        this.titleRef = React.createRef();
    }

    getActionsSpace = ()=>{
        const container = this.containerRef ? this.containerRef.current : null,
            titleRef = this.titleRef ? this.titleRef.current : null,
            actionsSpace = (container ? container.scrollWidth : 0) - (titleRef ? titleRef.scrollWidth : 0);
        return actionsSpace >= 0 ? actionsSpace : 0; // return 0 when containerRef is null but titleRef has value
    };

    componentDidMount(){
        const actionsSpace = this.getActionsSpace();
        this.setState({ actionsSpace:actionsSpace, showActions:true });
    }

    componentDidUpdate(){
        const actionsSpace = this.getActionsSpace();
        if(actionsSpace !== this.state.actionsSpace){
            this.setState({ actionsSpace });
        }
    }

    handleToggle(){
        this.setState(prevState => ({
            visible: !prevState.visible
        }), ()=>{
            this.props.visible(this.state.visible);
        });
    }

    getActionsButton = (action)=>{
                return (
                    <IconButton onClick={action.onClick}
                                //key={index+1}
                                tooltip={action.tooltip}
                                icon={action.icon}
                                iconColor={this.settingIconColor}
                                style={{fontSize:'12px', padding:'12px 0 12px 15px'}}
                                squareButton={false}
                    />);
    }
    getImgActionsButton = (action)=>{
        return (

            <img
                src={ `/assets/img/${action.name}`}
                title={action.tooltip}
                style={{cursor: 'pointer', paddingRight: '5px', display: 'inline-block'}}
                height={ `${action.size}px`}
                onClick={action.onClick}>
            </img>
            );
    }

    getImgSettingActions =(actions)=> {
        let settingAction=[];
        if(actions && actions.length >0){
            actions.filter(item => !item.hidden).forEach(action=>{
                if(isValidAction(action)){
                    settingAction.push(this.getImgActionsButton(action))
                }
                if(isValidElement(action)){
                    settingAction.push(action)
                }
            });
        }
        return settingAction
    };

    getSettingActions =(actions)=> {
        let settingAction=[];
        if(actions && actions.length >0){
            actions.forEach(action=>{
                if(isValidAction(action)){
                    settingAction.push(this.getActionsButton(action))
                }
                if(isValidElement(action)){
                    settingAction.push(action)
                }
            });
        }
        return settingAction
    };

    render(){
        const { title, actions,settingActions,imgSettingActions} = this.props;
        return(
            <div className={'expander-toolbar'} ref={this.containerRef} style={{ justifyContent: title ? 'space-between' : 'flex-end',borderBottom:'1px solid #d9d9d9' }}>

                <div style={{ display:'flex', flexGrow: 1, alignItems: 'center', justifyContent: actions ?'flex-end' : 'space-between'}}>
                    {
                        title ? <Typography type={'heading1'} style={{margin:'0 5px',fontSize:'14px'}}>
                            <div style={{unicodeBidi: 'plaintext'}} ref={this.titleRef}>{title}</div>
                        </Typography> : ''
                    }
                    {
                        actions ? <div style={{ display: 'flex', flexGrow:1,flexDirection:'row-reverse'  }}>
                            <Actions squareButton={true} actions={actions}/>
                        </div> : ''
                    }
                    {
                        imgSettingActions ? <div style={{ display: 'flex', flexGrow:1,flexDirection:'row-reverse' ,padding:'5px' }}>
                                {this.props.imgSettingActions && this.getImgSettingActions(imgSettingActions)}
                        </div> : ''
                    }

                    <div style={{/*borderRight:'1px solid #d9d9d9',*/display:'inline-block',paddingRight:'10px'}}>
                        {this.getSettingActions(settingActions).map(action => <span> {action} </span>)}

                        <IconButton onClick={this.handleToggle.bind(this)}
                                    key={1}
                                    icon={this.state.visible ?'chevron-up' :'chevron-down'}
                                    style={{fontSize:'12px', padding:'10px 0 8px 10px',color:'red'}}
                                    iconColor={this.settingIconColor}
                                    squareButton={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default  HeaderExpander;
