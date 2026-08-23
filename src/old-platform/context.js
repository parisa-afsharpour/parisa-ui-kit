/**
 * Created by Ma_Gorji on 2019/02/20.
 */


import React, {Component} from 'react';
import config from './fconfig';
  //
export const AppContext = React.createContext(
    {theme : config.theme}
);
