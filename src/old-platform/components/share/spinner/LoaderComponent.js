import * as React from "react";
import { connect } from "react-redux";
import {Spin} from "antd";

export const styles= {
    container: {
        verticalAlign: 'middle',
        display: 'flex',
        flexBasis: '25%',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexShrink: 0,
        flexGrow: 1,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: 'rgba(0,0,0,0.39)',
        top: '0px',
        left: '0px',
        opacity: 1,
        position: 'fixed',
        willChange: 'opacity',
        zIndex: 9000, // TODO
    },
    background:{
        background:'rgba(255,255,255,0.72)',
        padding:'12px',
        borderRadius:'8px',
        border:'1px solid #fff'
    }
};
const messages ={
    loading: {
        id: 'ui.const.Spinner.loading',
        defaultMessage: 'درحال بارگذاری ...',
    }
};
class LoaderComponent extends React.PureComponent {


    render() {
        const {size}=this.props;
        return this.props.showLoader ?
            <div style={styles.container}>
                <div style={styles.background}>
                    <Spin tip={messages.loading.defaultMessage} size={size ? size : "large"}/>
                </div>
            </div>
            : null;
    }
}

const mapStateToProps = (state) => ({
    showLoader: state.loading.showLoader,
});

export default connect(mapStateToProps)(LoaderComponent);
