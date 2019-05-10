import React from 'react';
import './style.css';
import '../MainStyles.css';
import Bk from '../../Images/bk.png';
import Back from "../../Icons/Back";

export default class SelectedAuction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lot: null
        }
    }


    render() {
        return (
            <div className="SelectedAuction">
                <div className="Header App__p10">
                    <span className="Header__icon"><Back/></span>
                    <span>auctions.</span>
                </div>
                <div className="SelectedAuction--main">
                    <div className="SelectedAuction--main--header">
                        <div className="SelectedAuction--main--header--left">
                            <img src={Bk}/>
                            <div className="SelectedAuction--main--header--left--info">
                                <div className="SelectedAuction--main--header--left--info--timer">
                                    05:59
                                </div>
                                <div className="SelectedAuction--main--header--left--info--small">
                                    осталось
                                </div>
                            </div>
                        </div>
                        <div className="SelectedAuction--main--header--right">
                            <p className="SelectedAuction--main--header--right--header">Рожок</p>
                            <div className="SelectedAuction--main--header--right--body App--opacitied">
                                <p className="SelectedAuction--main--header--right--body--left">
                                    шаг ставки
                                </p>
                                <p className="SelectedAuction--main--header--right--body--right">
                                    500 000 <span className="App__coin"/>
                                </p>
                            </div>

                            <div className="SelectedAuction--main--header--right--body">
                                <p className="SelectedAuction--main--header--right--body--left">
                                    текущая цена
                                </p>
                                <p className="SelectedAuction--main--header--right--body--right">
                                    6 500 000 <span className="App__coin"/>
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
                                <img className="SelectedAuction--main--body--bets--user--avatar" src="https://sun1-25.userapi.com/c846124/v846124342/1fd5d9/eOVYWBIXma8.jpg?ava=1"/>
                                <div className="SelectedAuction--main--body--bets--user--info">
                                    <p className="SelectedAuction--main--body--bets--user--info--header">
                                        Баран Баранович
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--second">
                                        поставил <span className="SelectedAuction--main--body--bets--user--info--second--small">5 000 000<span className="App__coin"/></span>
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--footer">
                                        10 секунд назад
                                    </p>
                                </div>
                            </div>

                            <div className="SelectedAuction--main--body--bets--user">
                                <img className="SelectedAuction--main--body--bets--user--avatar" src="https://sun1-25.userapi.com/c846124/v846124342/1fd5d9/eOVYWBIXma8.jpg?ava=1"/>
                                <div className="SelectedAuction--main--body--bets--user--info">
                                    <p className="SelectedAuction--main--body--bets--user--info--header">
                                        Баран Баранович
                                    </p>
                                    <p className="SelectedAuction--main--body--bets--user--info--second">
                                        поставил <span className="SelectedAuction--main--body--bets--user--info--second--small">5 000 000<span className="App__coin"/></span>
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
            </div>
        )
    }


}
