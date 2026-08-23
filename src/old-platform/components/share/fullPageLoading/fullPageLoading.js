import React from 'react';
import styles from './loading.scss';
import LoaderComponent from "../spinner/LoaderComponent";
import {LocaleProvider} from "antd";
function FullPageLoading() { 
  return   <LoaderComponent/>
}
 
export default FullPageLoading;