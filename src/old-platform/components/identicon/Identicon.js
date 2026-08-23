/**
 * Created by Ma_Gorji on 2019/02/04.
 */

import React, { Component } from 'react';
import config from '../../fconfig'


class Identicon extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }


    render() {

        let url = `${config.iconUrl}/icon?id=${this.props.id}&size=${this.props.size}`;
        let height = `${this.props.size}px`;
        return (
            <img src={url} height={height} style={this.props.style}/>
        );
    }


}

export default Identicon;



