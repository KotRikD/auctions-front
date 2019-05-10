import React from 'react';
import './style.css';
import AppDispatcher, {LOT_SELECTED, TAB_CHANGED} from "../../Dispatcher";
import Img from 'react-image';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prize: props.prize,
            timeEnd: props.timeEnd,
            name: props.name,
            lastBet: props.lastBet,
            id: props.id
        }
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
        return(
            <div className="Card" onClick={this.onClicked}>
                <div className="Card--left">
                    <Img className="Card--left--image" src={[this.state.prize, 'https://vk.com/sticker/1-12374-128']} />
                    <div className="Card--left--text">
                        <p className="Card--left--text--timer">{this.state.timeEnd}</p>
                        <p className="Card--left--text--small">осталось</p>
                    </div>
                </div>
                <div className="Card--right">
                    <p className="Card--right--header">{this.state.name}</p>
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
