import React from 'react';
import './style.css';
import '../MainStyles.css';
import Bk from '../../Images/bk.png';

export default class WinnedAuctions extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return(
            <div className="WinnedAuctions">
                <div className="Header App__p10">
                    <span>auctions.</span>
                </div>

                <div className="WinnedAuctions--body">
                    <p className="WinnedAuctions--body--header">Выигранные лоты</p>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="WinnedAuctions--body--card">
                        <img className="WinnedAuctions--body--card--image" src={Bk}/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">Чизбургер от Burger King</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">куплен за</span> 12 000 000<span className="App__coin"/></p>
                            <div className="WinnedAuctions--body--card--btn">
                                <span>
                                    получить код
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="WinnedAuctions__footer"/>
            </div>
        )
    }
}