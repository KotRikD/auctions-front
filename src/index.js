import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VkSdk from "@happysanta/vk-apps-sdk";

VkSdk.init();

ReactDOM.render(<App />, document.getElementById('root'));
