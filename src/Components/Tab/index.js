import React from 'react';
import './style.css';
import TabStore from "../../Stores/TabStore";
import AppDispatcher, {TAB_CHANGED} from "../../Dispatcher";

export default class Tab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calledTab: props.id,
            currentTab: TabStore.Tab
        }

        this.changeTab = this.changeTab.bind(this);
        this.isTab = this.isTab.bind(this);
    }

    changeTab() {
        AppDispatcher.dispatch({
            type: TAB_CHANGED,
            tab: this.state.calledTab
        });
    }

    isTab() {
        this.setState({
            currentTab: TabStore.Tab
        })
    }

    componentWillMount() {
        TabStore.addChangeListener(this.isTab);
    }

    componentWillUnmount() {
        TabStore.removeChangeListener(this.isTab);
    }

    render() {
        return (
            <div className="Tab" onClick={this.changeTab}>
                <span className={`Tab--icon${(this.state.calledTab === this.state.currentTab) ? "--active" : ""}`}>{(this.props.icon === undefined) ? null : this.props.icon}</span>
            </div>
        )
    }
}