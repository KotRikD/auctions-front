import React from 'react';
import './style.css';
import Close from "../../Icons/Close";

export default class PopUp extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            onClose: props.onClose,
            onConfirm: props.onConfirm,

            color: props.color,
            btnName: props.btnName
        }
    }

    render() {
        return(
            <div className="Popup">
                <div className="Popup__background" onClick={this.state.onClose}/>
                <div className="Popup__container">
                    <span className="Popup__close" onClick={this.state.onClose}><Close/></span>
                    {this.props.children}
                    <div className="Popup__btn" onClick={this.state.onConfirm} style={{
                        background: this.state.color
                    }}>
                        <span>{this.state.btnName}</span>
                    </div>
                </div>
            </div>
        )
    }
}