import React from 'react';
import './style.css';
import '../MainStyles.css';
import AuctionSection from "../Section";

export default class MainScreen extends React.Component {

    render() {
        return (
            <div className="MainScreen">
                <div className="Header App__p10">
                    <span>auctions.</span>
                </div>
                <AuctionSection name="активные аукционы"/>
                <AuctionSection name="активные аукционы"/>
                <div className="MainScreen__footer"/>
            </div>
        )
    }

}