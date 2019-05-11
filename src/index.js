import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VkSdk from "@happysanta/vk-apps-sdk";
import JavascriptTimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru'

VkSdk.init();

JavascriptTimeAgo.locale(ru);

ReactDOM.render(<App />, document.getElementById('root'));
