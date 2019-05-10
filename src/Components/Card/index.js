import React from 'react';
import './style.css';
import Bk from '../../Images/bk.png';
import AppDispatcher, {TAB_CHANGED} from "../../Dispatcher";

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prize: props.prize,
            timeEnd: props.timeEnd,
            name: props.name,
            lastBet: props.lastBet
        }
    }

    onClicked() {
        AppDispatcher.dispatch({
            type: TAB_CHANGED,
            tab: "selected"
        })
    }

    render() {
        return(
            <div className="Card" onClick={this.onClicked}>
                <div className="Card--left">
                    <img className="Card--left--image" src={Bk}/>
                    <div className="Card--left--text">
                        <p className="Card--left--text--timer">05:59</p>
                        <p className="Card--left--text--small">осталось</p>
                    </div>
                </div>
                <div className="Card--right">
                    <p className="Card--right--header">Рожок</p>
                    <div className="Card--right--footer">
                        <p className="Card--right--footer--one">последняя ставка:</p>
                        <div className="Card--right--footer--user">
                            <div className="Card--right--footer--user--mini">
                                <img className="Card--right--footer--user--mini--avatar" src="https://sun1-25.userapi.com/c846124/v846124342/1fd5d9/eOVYWBIXma8.jpg?ava=1"/>
                                <p className="Card--right--foter--user--mini--text">Константин П.</p>
                            </div>
                            <div className="Card--right--footer--user--balance">1 000 500 500 <span className="App__coin"/></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
