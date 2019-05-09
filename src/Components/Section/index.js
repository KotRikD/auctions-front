import React from 'react';
import './style.css';
import Card from "../Card";
import SmallCard from "../SmallCard";

export default class AuctionSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: (props.name === undefined ? "Секция" : props.name),
            items: (props.items === undefined ? [] : props.items)
        }
    }

    renderItems() {
        return (
            this.state.items.map((el, index)=> {
                return (<div key={index}>Test</div>)
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
                    <Card/>
                    <SmallCard/>
                </div>
            </div>
        )
    }
}