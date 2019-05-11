import React from 'react';
import View from "./Components/View";
import TabLayout from "./Components/TabLayout";
import Tab from "./Components/Tab";

import Bet from "./Icons/Bet";

import './App.css';
import Cup from "./Icons/Cup";
import VkSdk from "@happysanta/vk-apps-sdk";
import ApiHelper from "./Api/ApiHelper";
import AppDispatcher, {APP_CONNCETED, ERROR_SUBMITTED} from "./Dispatcher";
import AuthStore from './Stores/AuthStore';
import Loader from "./Components/Loader";
import ErrorScreen from "./Components/ErrorScreen";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isError: false,
            isLoading: true
        }

        this.catchAuthStoreUpdate = this.catchAuthStoreUpdate.bind(this);
    }

    onFocus() {
        VkSdk.setViewSettings("dark", "none");
    }

    catchAuthStoreUpdate() {
        this.setState({
            isError: (AuthStore.Error !== null)
        })
    }

    componentWillMount() {
        VkSdk.init();

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
                });

                this.setState({
                    isLoading: false
                })

                VkSdk.setViewSettings("dark", "none");
            }
            catch(e) {
                AppDispatcher.dispatch({
                    type: ERROR_SUBMITTED,
                    error: e
                });
            }
        });

        AuthStore.addChangeListener(this.catchAuthStoreUpdate);
        window.addEventListener("focus", this.onFocus);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.catchAuthStoreUpdate);
        window.removeEventListener("focus", this.onFocus);
    }


    render() {
        return (
            (this.state.isError) ? <ErrorScreen/> :
            (this.state.isLoading) ? <Loader/>
            :
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
