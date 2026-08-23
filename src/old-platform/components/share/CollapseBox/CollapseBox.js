import React from 'react';
import PropTypes from 'prop-types';
import HeaderCollapseBox from './headerCollapseBox/HeaderCollapseBox'
import FooterCollapseBox from "./footerCollapseBox/FooterCollapseBox";
import styles from './collapsBox.scss';
// const inlineStyles = {
//     container : {
//         border:'1px solid #00bbf0',
//         borderRadius:'7px',
//         backgroundColor:'white',
//         marginBottom:'10px',
//         boxShadow:'0 0px 11px 0 #a5a5a5',
//         borderTop:'3px solid #00bbf0'
//     },
//     contentMargin:{
//         margin:'5px 11px'
//     }
// };

class CollapseBox extends React.Component {
    static propTypes = {
      actions: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string,
        onClick: PropTypes.func,
        tooltip: PropTypes.string,
        color: PropTypes.string,
      })),
      settingActions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.shape({
          icon: PropTypes.string,
          onClick: PropTypes.func,
          tooltip: PropTypes.string,
        })),
      ]),
      imgSettingActions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          onClick: PropTypes.func,
          tooltip: PropTypes.string,
          size: PropTypes.number,
        })),
      ]),
      title: PropTypes.node,
      footerContent: PropTypes.node || PropTypes.string,
      minHeight: PropTypes.number || PropTypes.string,
    };

    constructor(props) {
      super(props);
        this.myInput = React.createRef()
      this.state = {
        visible: true,
          monted:false
      };
    }

    componentDidMount () {
        if (!this.state.monted){
            this.setState({
                monted:true
            })
        }else {
        }
    }

    handelActive = (visible) => {
      this.setState({ visible });
    };

    render() {
      const {
        actions,
        footerContent,
        settingActions,
        title,
        children,
        className,
        imgSettingActions,
        minHeight
      } = this.props;

      return (
        <div ref={this.myInput} className={styles.container+ ' ' + className }>
          <HeaderCollapseBox
            title={title}
            settingActions={settingActions}
            imgSettingActions={imgSettingActions}
            actions={actions}
            visible={this.handelActive}
          />
          <div style={{ display: this.state.visible ? 'block' : 'none', minHeight:minHeight}}>
            <div className={styles.contentMargin}>
              {children}
            </div>
            {footerContent && <FooterCollapseBox>{footerContent}</FooterCollapseBox>}
          </div>
        </div>
      );
    }
}

export default CollapseBox;
