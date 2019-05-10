import React from 'react';
import View from "./Components/View";
import TabLayout from "./Components/TabLayout";
import Tab from "./Components/Tab";

import Bet from "./Icons/Bet";

import './App.css';
import Cup from "./Icons/Cup";
import VkSdk from "@happysanta/vk-apps-sdk";
import ApiHelper from "./Api/ApiHelper";
import AppDispatcher, {APP_CONNCETED} from "./Dispatcher";

export default class App extends React.Component {


    componentWillMount() {
        VkSdk.init();
        VkSdk.setViewSettings("dark", "none");

        VkSdk.getUserInfo().then(async (res)=> {
            try {
                let UserInfo = res; // VK REQUEST
                let VKToken = await VkSdk.getAuthToken(); // VK REQUEST
                let AuthData = await ApiHelper.getData(btoa(window.location.href)); //AXIOS REQUEST
                let StartData = await ApiHelper.getStartData(AuthData.data.response.access_token);

                if (!AuthData.data.response || !StartData.data.response) {
                    throw Error("Axios authorization part error");
                }

                AppDispatcher.dispatch({
                    type: APP_CONNCETED,
                    AuthData: AuthData.data.response,
                    StartData: StartData.data.response,
                    VKProfile: UserInfo,
                    VKToken: VKToken.access_token
                })
            }
            catch(e) {
                console.log(e);
            }
        });
    }


    render() {
        return (
            <div className="App">
                <View/>
                <TabLayout>
                    <Tab icon={<Bet/>} id="home"/>
                    <Tab icon={<Cup/>} id="bet"/>
                </TabLayout>
            </div>
        )
    }

}
