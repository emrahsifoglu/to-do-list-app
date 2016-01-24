import React, { Component } from 'react';

const ENTER_KEY_CODE = 13;

export default class TextInput extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        if(e.keyCode === ENTER_KEY_CODE){
            let newItem = this.refs.newItem.value;
            this.refs.newItem.value = '';
            this.props.add(newItem);
        }
    }

    render() {
        return (
            <div>
                <input type="text"
                       ref="newItem"
                       className="form-control"
                       placeholder="To-do text"
                       onKeyDown={this.handleSubmit}
                />
            </div>
        );
    }
}
