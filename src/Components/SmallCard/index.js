import React from 'react';
import Bk from '../../Images/bk.png';
import './style.css';

export default class SmallCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            timeStart: props.timeEnd,
            name: props.name
        }
    }


    render() {
        return (
            <div className="SmallCard">
                <div className="SmallCard__prize-image">
                    <img src={Bk}/>
                </div>
                <div className="SmallCard__prize-body">
                    <p className="SmallCard__prize-body--bold">Чизбургер от Burger King</p>
                    <p className="SmallCard__prize-body--bold">03:01 <span className="SmallCard__prize-body--smal">до начала!</span></p>
                </div>
            </div>
        )
    }

}