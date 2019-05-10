import React, {Component} from 'react';
import './style.css';
import '../MainStyles.css';
import Bk from '../../Images/bk.png';
import Back from "../../Icons/Back";
import AppDispatcher, {LOTNULL_SELECTED, TAB_CHANGED} from "../../Dispatcher";
import '@happysanta/vk-app-ui/dist/vkappui.css';
import PopUp from "../PopUp";
import AppStore from "../../Stores/AppStore";
import {formatCoinNumber} from "../../Helpers";
import Img from 'react-image';

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
                                    {this.state.lot.end_time}
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
                                    {formatCoinNumber(this.state.lot.buyout.sum)} <span className="App__coin"/>
                                </p>
                            </div>

                            <div className="SelectedAuction--main--header--right--btn">
                                <span>Выкупить!</span>
                            </div>

                        </div>
                    </div>
                    <div className="SelectedAuction--main--body">
                        <p className="SelectedAuction--main--body--header">
                            История ставок
                        </p>

                        <div className="SelectionAuction--main--body--bets">
                            <div className="SelectedAuction--main--body--bets--user">
                                <img className="SelectedAuction--main--body--bets--user--avatar"
                                     src="https://sun1-25.userapi.com/c846124/v846124342/1fd5d9/eOVYWBIXma8.jpg?ava=1"/>
                                <div className="SelectedAuction--main--body--bets--user--info">
                                    <p className="SelectedAuction--main--body--bets--user--info--header">
                                        Баран Баранович
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--second">
                                        поставил <span
                                        className="SelectedAuction--main--body--bets--user--info--second--small">5 000 000<span
                                        className="App__coin"/></span>
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--footer">
                                        10 секунд назад
                                    </p>
                                </div>
                            </div>

                            <div className="SelectedAuction--main--body--bets--user">
                                <img className="SelectedAuction--main--body--bets--user--avatar"
                                     src="https://sun1-25.userapi.com/c846124/v846124342/1fd5d9/eOVYWBIXma8.jpg?ava=1"/>
                                <div className="SelectedAuction--main--body--bets--user--info">
                                    <p className="SelectedAuction--main--body--bets--user--info--header">
                                        Баран Баранович
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--second">
                                        поставил <span
                                        className="SelectedAuction--main--body--bets--user--info--second--small">5 000 000<span
                                        className="App__coin"/></span>
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--footer">
                                        10 секунд назад
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="SelectedAuction--btn">
                    <p className="SelectedAuction--btn--text"><span className="App__coin"/> Сделать ставку</p>
                </div>



                {(this.state.popups.popupBuy) ?
                    <PopUp onClose={()=>{console.log("closed")}} onConfirm={()=> {
                        this.setState({
                            popups: {
                                popupBuy: false
                            }
                        })
                    }} color="black" btnName="Выкупить лот прямо сейчас">
                        Hello!
                    </PopUp>
                    : null}

            </div>
        )
    }


}
