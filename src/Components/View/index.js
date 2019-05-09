import React from 'react';
import './style.css';
import MainScreen from "../MainScreen";

export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="View">
                <MainScreen/>
            </div>
        )
    }
}