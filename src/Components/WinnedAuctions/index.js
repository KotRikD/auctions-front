import React from 'react';
import './style.css';
import '../MainStyles.css';
import AuthStore from "../../Stores/AuthStore";
import {formatCoinNumber, openLinkIOS} from "../../Helpers";

export default class WinnedAuctions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winnedAuctions: AuthStore.StartData.win_history
        }

        this.updateHistory = this.updateHistory.bind(this);
    }

    updateHistory() {
        this.setState({
            winnedAuctions: AuthStore.StartData.win_history
        })
    }

    componentWillMount() {
        AuthStore.addChangeListener(this.updateHistory);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.updateHistory);
    }


    renderWinnedItems() {
        return(
            this.state.winnedAuctions.map((el, index)=>{
                return(
                    <div className="WinnedAuctions--body--card" key={index}>
                        <img className="WinnedAuctions--body--card--image" src={el.prize.image} alt='prize-img'/>
                        <div className="WinnedAuctions--body--card--info">
                            <p className="WinnedAuctions--body--card--info--header">{el.prize.name}</p>
                            <p className="WinnedAuctions--body--card--info--bold"><span className="WinnedAuctions--body--card--info--small">{(el.type === 0) ? "выигран" : "выкуплен"} за</span> {formatCoinNumber(el.amount)}<span className="App__coin"/></p>
                                {(el.prize.send_type === 2) ?
                                    <div className="WinnedAuctions--body--card--btn" data-index={index} onClick={()=> {
                                        openLinkIOS(el.code);
                                    }}>
                                        <span>
                                            {el.prize.win_description}
                                        </span>
                                    </div>
                                :
                                (el.prize.send_type === 1) ?
                                    <div className="WinnedAuctions--body--card--btn--selecting">
                                        <span>
                                            {el.code}
                                        </span>
                                    </div>
                                    :
                                    <p className="WinnedAuctions--body--card--info--very-small">Приз отправляется автоматически</p>
                                }
                        </div>
                    </div>
                )
            })
        )

    }

    render() {
        return(
            <div className="WinnedAuctions">
                <div className="Header App__p10">
                    <span>auctions.</span>
                </div>

                <div className="WinnedAuctions--body">
                    {this.state.winnedAuctions.length <1 ?
                        <div className="WinnedAuctions--body--null">
                            <p>Вы пока что не выиграли ни одного аукциона. Самое время сделать это!</p>
                        </div>
                        :
                        <div>
                        <p className="WinnedAuctions--body--header">Выигранные лоты</p>
                        {this.renderWinnedItems()}
                        </div>
                    }

                </div>

                <div className="WinnedAuctions__footer"/>
            </div>
        )
    }
}