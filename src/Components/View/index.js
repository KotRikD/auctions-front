import React from 'react';
import './style.css';
import MainScreen from "../MainScreen";
import SelectedAuction from "../SelectedAuction";
import WinnedAuctions from "../WinnedAuctions";
import TabStore from "../../Stores/TabStore";

export default class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            room: this.resolveRoom("home")
        }

        this.resolveRoom = this.resolveRoom.bind(this);
        this.onNewTab = this.onNewTab.bind(this);
    }

    onNewTab() {
        this.setState({
            room: this.resolveRoom(TabStore.Tab)
        })
    }

    componentWillMount() {
        TabStore.addChangeListener(this.onNewTab)
    }

    componentWillUnmount() {
        TabStore.removeChangeListener(this.onNewTab)
    }

    resolveRoom(room) {
        switch(room) {
            case "home":
                return <MainScreen/>;
            case "bet":
                return <WinnedAuctions/>;
            case "selected":
                return <SelectedAuction/>;
            default:
                return <MainScreen/>
        }
    }

    render() {
        return (
            <div className="View">
                {this.state.room}
            </div>
        )
    }
}