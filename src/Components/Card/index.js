import React from 'react';
import './style.css';
import AppDispatcher, {LOT_SELECTED, TAB_CHANGED} from "../../Dispatcher";
import Img from 'react-image';
import {countdownRenderer, formatCoinNumber} from "../../Helpers";
import Countdown from "react-countdown-now";

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prize: props.prize,
            timeEnd: props.timeEnd,
            name: props.name,
            id: props.id,
            last_user: props.last_user
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            prize: nextProps.prize,
            timeEnd: nextProps.timeEnd,
            name: nextProps.name,
            id: nextProps.id,
            last_user: nextProps.last_user
        })
    }

    componentWillMount() {
        this.onClicked = () => {
            AppDispatcher.dispatch({
                type: LOT_SELECTED,
                lot: this.props.id
            });
            AppDispatcher.dispatch({
                type: TAB_CHANGED,
                tab: "selected"
            })
        }
    }

    render() {
        console.log(this.state.last_user)
        return(
            <div className="Card" onClick={this.onClicked}>
                <div className="Card--left">
                    <Img className="Card--left--image" src={[this.state.prize, 'https://vk.com/sticker/1-12374-128']} />
                    <div className="Card--left--text">
                        <p className="Card--left--text--timer">
                            <Countdown
                                date={new Date(this.state.timeEnd*1000)}
                                renderer={countdownRenderer}
                            /></p>
                        <p className="Card--left--text--small">осталось</p>
                    </div>
                </div>
                <div className="Card--right">
                    <p className="Card--right--header">{this.state.name}</p>
                    <div className="Card--right--footer">
                        <p className="Card--right--footer--one">последняя ставка:</p>

                        {(this.state.last_user === undefined) ? <div className={"Card--right--foter--user--mini--text"}>Пока ставок не было</div> :
                            <div className="Card--right--footer--user">
                                <div className="Card--right--footer--user--mini">
                                    <img className="Card--right--footer--user--mini--avatar" src={this.state.last_user.VKProfile.photo_200} alt="avatar"/>
                                    <p className="Card--right--foter--user--mini--text">{this.state.last_user.VKProfile.first_name} {this.state.last_user.VKProfile.last_name[0]}.</p>
                                </div>
                                <div className="Card--right--footer--user--balance">{formatCoinNumber(this.state.last_user.amount)} <span className="App__coin"/></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )

    }
}
