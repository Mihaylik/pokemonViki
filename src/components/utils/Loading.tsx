import React from 'react';
import {Alert, Spin} from "antd";
import s from '../main/main.module.css';

const Loading = () => {
    return (
        <div className={s.loading_container}>
            <Spin tip="Loading..."/>
        </div>
    );
};

export default Loading;