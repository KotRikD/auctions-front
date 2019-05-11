import React from 'react';
import './style.css';

export default class TabLayout extends React.Component {
    render() {
        return (
            <div className="TabLayout">
                {this.props.children}
            </div>
        )
    }
}