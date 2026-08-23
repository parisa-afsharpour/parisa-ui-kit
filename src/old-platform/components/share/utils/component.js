import {Component, createElement} from 'react';
import {findDOMNode} from 'react-dom';
import {onEvent} from './element';
import {debounce} from './function';

export function responsive(WrappedComponent) {
    const WINDOW_RESIZE_EVENT = 'resize';
    const DEBOUNCE_DELAY = 200;

    return class ResponsiveComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                width: undefined,
                height: undefined,
            };
        }

        getDerivedStateFromProps(props, state){
            return{
                width: window.innerWidth,
                height: window.innerHeight,
            }

        }

        componentDidMount() {
            this.unbindResizeHandler = onEvent(window, WINDOW_RESIZE_EVENT, debounce(this.resizeHandler,this, DEBOUNCE_DELAY) );
            this.selfElem = findDOMNode(this.refElem);

            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        componentWillUnmount() {
            this.unbindResizeHandler();
        }

        getRef = (element)=>{ this.refElem = element; }

        resizeHandler = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        getOwnSize = ()=>{
            let ownSize = {
                width: undefined ,
                height:undefined,
            }
            if(this.selfElem){
                ownSize = {
                    width: this.selfElem.clientWidth,
                    height: this.selfElem.clientHeight,
                }
            }
            return ownSize;
        }

        render() {
            const props = Object.assign({}, this.props, {
                windowWidth: this.state.width,
                windowHeight: this.state.height,
                ownSize: this.getOwnSize()
            });
            return createElement(WrappedComponent, {...props, ref: this.getRef});
        }
    }
}

