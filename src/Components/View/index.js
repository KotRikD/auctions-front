import React from 'react';
import './style.css';
import MainScreen from "../MainScreen";
import SelectedAuction from "../SelectedAuction";
import WinnedAuctions from "../WinnedAuctions";
import TabStore from "../../Stores/TabStore";
import PopUp from "../PopUp";
import AppDispatcher, {CLEAR_MESSAGE, CLEAR_WINLOT} from "../../Dispatcher";
import AppStore from "../../Stores/AppStore";
import {formatCoinNumber} from "../../Helpers";
import AuthStore from "../../Stores/AuthStore";

export default class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            room: this.resolveRoom("home"),

            showMessagePopup: false,
            message: AppStore.showMessage,

            showWinlot: false,
            winLot: null
        };

        this.resolveRoom = this.resolveRoom.bind(this);
        this.onNewTab = this.onNewTab.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage() {
        this.setState({
            showMessagePopup: (AppStore.showMessage !== null),
            message: AppStore.showMessage,

            showWinlot: (AppStore.winLot !== null),
            winLot: AppStore.winLot
        })
    }

    onNewTab() {
        this.setState({
            room: this.resolveRoom(TabStore.Tab)
        })
    }

    componentWillMount() {
        AppStore.addChangeListener(this.updateMessage);
        TabStore.addChangeListener(this.onNewTab)
    }

    componentWillUnmount() {
        AppStore.addChangeListener(this.updateMessage);
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

    clearWinLot() {
        AppDispatcher.dispatch({
            type: CLEAR_WINLOT
        })
    }

    render() {
        return (
            <div className="View">
                {this.state.room}
                {(this.state.showMessagePopup) ?
                    <PopUp onClose={()=> {AppDispatcher.dispatch({type: CLEAR_MESSAGE})}} onConfirm={()=> {AppDispatcher.dispatch({type: CLEAR_MESSAGE})}} color="#43BEA4" btnName="Окей">
                        <p className="View__message">{this.state.message}</p>
                    </PopUp>
                    : null}
                {(this.state.showWinlot) ?
                    <PopUp color="#43BEA4" btnName="Ура!" onClose={this.clearWinLot} onConfirm={this.clearWinLot}>
                        <div className="View__winlot">
                            <p className="View__winlot--header">Поздравляем!</p>
                            <img className="View__winlot--image" src={this.state.winLot.prize.image} alt="prizeimg"/>
                            <p className="View__winlot--bold-one">Вы победили в аукционе и выкупили лот</p>
                            <p className="View__winlot--green-win">{this.state.winLot.prize.name}</p>
                            <p className="View__winlot--bold-one">всего за</p>
                            <p className="View__winlot--bold-two">
                                {formatCoinNumber(this.state.winLot.prize.amount)} <span className="App__coin"/>
                            </p>
                        </div>
                    </PopUp>
                    : null}
            </div>
        )
    }
}