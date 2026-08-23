import React from "react";
import { Steps as AntSteps ,Icon} from 'antd';
import RaisedButton from "../raisedButton/RaisedButton";
import PropTypes from "prop-types";
const { Step } = AntSteps;

const Steps =(props)=>{
    const current=props.current;
    const parisaStep=props.steps;


    return(
        <div style={{  border: '1px solid #ebedf0', borderRadius: '2px',backgroundColor:'#fff',padding:'10px'}}>
            <AntSteps id={props.id} current={current}>
                {parisaStep.map(item => (
                    <Step key={item.id} title={item.title} icon={<Icon type={`${item.icon}`}/>}/>
                ))}
            </AntSteps>
            <div className="steps-content">{parisaStep[current].content}</div>
            <div className="steps-action" style={{marginRight:'auto', display: 'table'}}>
                {(parisaStep && parisaStep.length > 0) ? parisaStep[current].actions.map(buttonElement => (
                    <RaisedButton
                        key={buttonElement.id}
                        id={buttonElement.id}
                        label={buttonElement.label}
                        type={buttonElement.type}
                         disabled={buttonElement.isDisabled}
                        onClick={buttonElement.onClick}
                        className={buttonElement.className}
                        style={{...buttonElement.style, marginRight:'7px'}}
                    />
                )) : null}

                {/* {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}*/}
            </div>
        </div>
    )

}

/*============ type check ======================== */
Steps.propTypes = {
    id: PropTypes.string,
    current: PropTypes.number,
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            actions: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                type:PropTypes.string,
                isDisabled:PropTypes.bool,
                onClick:PropTypes.func,
                style:PropTypes.shape,
                className: PropTypes.string,
            })
            )
        })
    )
}

export default Steps;
