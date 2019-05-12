import React from 'react';
import './style.css';
import Img from 'react-image';
import {countdownRenderer} from "../../Helpers";
import Countdown from "react-countdown-now";

export default class SmallCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            timeStart: props.timeStart,
            name: props.name
        }
    }


    render() {
        return (
            <div className="SmallCard">
                <div className="SmallCard__prize-image">
                    <Img src={[this.state.image, 'https://vk.com/sticker/1-12374-128']}/>
                </div>
                <div className="SmallCard__prize-body">
                    <p className="SmallCard__prize-body--bold">{this.state.name}</p>
                    <p className="SmallCard__prize-body--bold">
                        <Countdown
                            date={new Date(this.state.timeStart*1000)}
                            renderer={countdownRenderer}
                        /> <span className="SmallCard__prize-body--small">до начала!</span></p>
                </div>
            </div>
        )
    }

}