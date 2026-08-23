import React, { Component, useRef, useState, useEffect, Fragment } from "react";

const Header = (props) => {
    return (
        <Fragment>
            <header className="window-header" style={{ cursor: "move", background: "lightblue" }}>
                <div className="logo-container">
                    <div className="app-logo">
                        <span className="app-name">{props.title}</span>
                    </div>
                </div>
                <div className="actions-container">
                    {/*<button className="settings-window window-button-style">*/}
                    {/*    <svg className="window-controls-icon">*/}
                    {/*        <use href="#window-settings"></use>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                    {/*<button className="close-window window-button-style">*/}
                    {/*    <svg className="window-controls-icon">*/}
                    {/*        <use href="#window-close"></use>*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                </div>
            </header>
        </Fragment>
    );
}

export default Header;
