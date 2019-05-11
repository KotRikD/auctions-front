import React from 'react';
import './style.css';
import VkSdk from "@happysanta/vk-apps-sdk";

export default class Loader extends React.Component {

    componentWillMount() {
        VkSdk.setViewSettings("light", "none");
    }

    render() {
        return (
            <div className="Loader">
                <p className="Loader--center">загрузка...</p>
                <p className="Loader--bottom">@vkcoin_games</p>
            </div>
        )
    }

}