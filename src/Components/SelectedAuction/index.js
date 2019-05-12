import React, {Component} from 'react';
import './style.css';
import '../MainStyles.css';
import Back from "../../Icons/Back";
import AppDispatcher, {LOTNULL_SELECTED, TAB_CHANGED} from "../../Dispatcher";
import '@happysanta/vk-app-ui/dist/vkappui.css';
import PopUp from "../PopUp";
import AppStore from "../../Stores/AppStore";
import {buildBetLink, countdownRenderer, formatCoinNumber, openLinkIOS} from "../../Helpers";
import Img from 'react-image';
import Countdown from "react-countdown-now";
import AuthStore from "../../Stores/AuthStore";
import ReactTimeAgo from "react-time-ago";

export default class SelectedAuction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lot: AppStore.SelectedAuction,

            popups: {
                popupNewBet: false,
                popupBuy: false
            }
        }

        this.showBuyPopup = this.showBuyPopup.bind(this);
        this.showBetPopup = this.showBetPopup.bind(this);
        this.listenLot = this.listenLot.bind(this);
    }

    listenLot(){
        this.setState({
            lot: AppStore.SelectedAuction
        })
    }

    returnBack() {
        AppDispatcher.dispatch({
            type: LOTNULL_SELECTED
        });
        AppDispatcher.dispatch({
            type: TAB_CHANGED,
            tab: 'home'
        })
    }

    showBuyPopup() {
        this.setState({
            popups: {
                popupBuy: true
            }
        })
    }

    showBetPopup() {
        this.setState({
            popups: {
                popupNewBet: true
            }
        })
    }

    componentWillMount() {
        AppStore.addChangeListener(this.listenLot);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this.listenLot);
    }

    renderLastBets(){
        return (this.state.lot.last_bets.map((el, index)=>{
            return (
                <div className="SelectedAuction--main--body--bets--user" key={index} onClick={()=>{openLinkIOS("https://vk.com/id"+el.VKProfile.id)}}>
                    <img className="SelectedAuction--main--body--bets--user--avatar"
                         src={el.VKProfile.photo_200} alt="avatar"/>
                    <div className="SelectedAuction--main--body--bets--user--info">
                        <p className="SelectedAuction--main--body--bets--user--info--header">
                            {el.VKProfile.first_name} {el.VKProfile.last_name}
                        </p>
                        <p className="SelectedAuction--main--body--bets--user--info--second">
                            поставил <span
                            className="SelectedAuction--main--body--bets--user--info--second--small">{formatCoinNumber(el.amount)}<span
                            className="App__coin"/></span>
                        </p>

                        <ReactTimeAgo className="SelectedAuction--main--body--bets--user--info--footer" date={new Date(el.time * 1000)} locale="ru"/>
                    </div>
                </div>
            )
        }))
    }

    render() {
        return (
            <div className="SelectedAuction">
                <div className="Header App__p10">
                    <span className="Header__icon" onClick={this.returnBack}><Back/></span>
                    <span>auctions.</span>
                </div>
                <div className="SelectedAuction--main">
                    <div className="SelectedAuction--main--header">
                        <div className="SelectedAuction--main--header--left">
                            <Img src={[this.state.lot.prize.image, "https://vk.com/sticker/1-12374-128"]}/>
                            <div className="SelectedAuction--main--header--left--info">
                                <div className="SelectedAuction--main--header--left--info--timer">
                                    <Countdown
                                        date={new Date(this.state.lot.end_time*1000)}
                                        renderer={countdownRenderer}
                                    />
                                </div>
                                <div className="SelectedAuction--main--header--left--info--small">
                                    осталось
                                </div>
                            </div>
                        </div>
                        <div className="SelectedAuction--main--header--right">
                            <p className="SelectedAuction--main--header--right--header">{this.state.lot.prize.name}</p>
                            <div className="SelectedAuction--main--header--right--body App--opacitied">
                                <p className="SelectedAuction--main--header--right--body--left">
                                    шаг ставки
                                </p>
                                <p className="SelectedAuction--main--header--right--body--right">
                                    {formatCoinNumber(this.state.lot.bet.step)} <span className="App__coin"/>
                                </p>
                            </div>

                            <div className="SelectedAuction--main--header--right--body">
                                <p className="SelectedAuction--main--header--right--body--left">
                                    текущая цена
                                </p>
                                <p className="SelectedAuction--main--header--right--body--right">
                                    {formatCoinNumber(this.state.lot.buyout.amount)} <span className="App__coin"/>
                                </p>
                            </div>

                            {this.state.lot.buyout.available === 1 ?
                                <div className="SelectedAuction--main--header--right--btn" onClick={this.showBuyPopup}>
                                    <span>Выкупить!</span>
                                </div> : null
                            }

                        </div>
                    </div>
                    <div className="SelectedAuction--main--body">
                        <p className="SelectedAuction--main--body--header">
                            История ставок
                        </p>

                        <div className="SelectionAuction--main--body--bets">
                            {this.renderLastBets()}
                        </div>
                    </div>
                </div>

                <div className="SelectedAuction--btn" onClick={this.showBetPopup}>
                    <p className="SelectedAuction--btn--text"><span className="App__coin"/> Сделать ставку</p>
                </div>

                {(this.state.popups.popupBuy) ?
                    <PopUp onClose={()=>{this.setState({popups: {popupBuy: false}})}} onConfirm={()=> {
                        //BUYING PROCESS
                        openLinkIOS(buildBetLink(AuthStore.AuthData.data.transfers_receiver, this.state.lot.buyout.amount, 2e9+this.state.lot.id, true));

                        this.setState({
                            popups: {
                                popupBuy: false
                            }
                        })
                    }} color="#4a76a8" btnName="Выкупить лот прямо сейчас">
                        <div className="SelectedAuction__PopUp">
                            <p className="SelectedAuction__PopUp--header">Если вы выкупите лот, аукцион завершится досрочно.</p>
                            <p className="SelectedAuction__PopUp--center">
                                {formatCoinNumber(this.state.lot.buyout.amount)} <span className="App__coin"/>
                            </p>
                        </div>
                    </PopUp>
                    : null}

                {(this.state.popups.popupNewBet) ?
                    <PopUp onClose={()=>{this.setState({popups: {popupNewBet: false}})}} onConfirm={()=> {
                        openLinkIOS(buildBetLink(AuthStore.AuthData.data.transfers_receiver, this.state.lot.bet.next_sum, this.state.lot.id, false));

                        this.setState({
                            popups: {
                                popupNewBet: false
                            }
                        })
                    }} color="#43BEA4" btnName="Сделать ставку на лот">
                        <div className="SelectedAuction__PopUp">
                            <p className="SelectedAuction__PopUp--header">Если вашу ставку перебьют, мы вернем монетки после окончания аукциона.</p>
                            <p className="SelectedAuction__PopUp--center">
                                {formatCoinNumber(this.state.lot.bet.next_sum)} <span className="App__coin"/>
                            </p>
                        </div>
                    </PopUp>
                    : null}

            </div>
        )
    }


}
