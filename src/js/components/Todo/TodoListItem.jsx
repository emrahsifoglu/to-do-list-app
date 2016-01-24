import React, { Component } from 'react';
import TodoItem from './TodoItem';

let styles = {
    uList: {
        paddingLeft: 0,
        listStyleType: "none"
    }
};

export default class TodoListItem extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        let items = this.props.items.map((item) => {
            return (
                <TodoItem key={item.id} remove={this.props.remove.bind(null, item.id)}>{item.text}</TodoItem>
            )
        });
        return (
            <ul style={styles.uList}>{items}</ul>
        )
    }
}

