import React from 'react';
import './style.css';
import Card from "../Card";
import SmallCard from "../SmallCard";
import {GOING} from "../../Helpers";

export default class AuctionSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: (props.name === undefined ? "Секция" : props.name),
            items: (props.items === undefined ? [] : props.items)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            name: nextProps.name,
            items: nextProps.items
        })
    }

    renderItems() {
        return (
            this.state.items.map((el, index)=> {
                return (
                    el.status === GOING ?
                        <Card prize={el.prize.image} timeEnd={el.end_time} name={el.prize.name} last_user={el.last_bets[0]} lastBet="хуй вовы в очке" id={el.id} key={index} />
                        :
                        <SmallCard image={el.prize.image} timeStart={el.start_time} name={el.prize.name} key={index} />
                )
            })
        )
    }

    render() {
        return (
            <div className="AuctionSection">
                <div className="AuctionSection--header">
                    <div className="AuctionSection--header--body">
                        {this.state.name}
                    </div>
                </div>
                <div className="AuctionSection--container">
                    {this.renderItems()}
                </div>
            </div>
        )
    }
}