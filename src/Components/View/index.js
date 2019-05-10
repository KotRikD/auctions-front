import React from 'react';
import './style.css';
import MainScreen from "../MainScreen";
import SelectedAuction from "../SelectedAuction";

export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="View">
                <SelectedAuction/>
            </div>
        )
    }
}