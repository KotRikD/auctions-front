import React from 'react';
import './style.css';
import '../MainStyles.css';
import AuctionSection from "../Section";
import AppStore from "../../Stores/AppStore";

export default class MainScreen extends React.Component {

    state = {
        Lots: AppStore.Lots
    }

    updateLots = () => {
        this.setState({
            Lots: AppStore.Lots
        })
    }

    componentWillMount() {
        AppStore.addChangeListener(this.updateLots);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this.updateLots);
    }

    render() {
        return (
            <div className="MainScreen">
                <div className="Header App__p10">
                    <span>auctions.</span>
                </div>
                <AuctionSection name="активные аукционы" items={this.state.Lots.onGoing} key="on"/>
                <AuctionSection name="скоро начнутся" items={this.state.Lots.soonGoing} key="soon"/>
                <div className="MainScreen__footer"/>
            </div>
        )
    }

}