import React from 'react';
import Bk from '../../Images/bk.png';
import './style.css';
import Img from 'react-image';

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
        console.log(this.state);
        return (
            <div className="SmallCard">
                <div className="SmallCard__prize-image">
                    <Img src={[this.state.image, 'https://vk.com/sticker/1-12374-128']}/>
                </div>
                <div className="SmallCard__prize-body">
                    <p className="SmallCard__prize-body--bold">{this.state.name}</p>
                    <p className="SmallCard__prize-body--bold">{this.state.timeStart} <span className="SmallCard__prize-body--smal">до начала!</span></p>
                </div>
            </div>
        )
    }

}