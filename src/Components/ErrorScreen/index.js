import React from 'react';
import './style.css';
import AuthStore from '../../Stores/AuthStore';
import {isJSError} from "../../Helpers";
import VkSdk from "@happysanta/vk-apps-sdk";

export default class ErrorScreen extends React.Component {

    state = {
        error: (isJSError(AuthStore.Error) ? {
            'error_text': 'Произошла ошибка в приложении',
            'error_msg': 'App Error',
            'error_code': -1
        } : AuthStore.Error)
    }

    componentWillMount() {
        VkSdk.setViewSettings("light", "none");
    }

    render() {
        return (
            <div className="ErrorScreen">
                <p className="ErrorScreen--center">Упс!</p>
                <p className="ErrorScreen--second">что-то пошло не так.</p>
                <div className="ErrorScreen--btn" onClick={(ev)=> { window.location.reload(true) }}>
                    <span>перезапустить</span>
                </div>
            </div>
        )
    }

}