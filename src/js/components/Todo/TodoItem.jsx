import React, { Component } from 'react';

let styles = {
    listGroup: {
        margin: '5px 0',
        borderRadius: 5
    },
    removeItem: {
        fontSize: 20,
        float: "left",
        position: "absolute",
        top: 12,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
    },
    todoItem: {
        paddingLeft: 20,
        fontSize: 17
    }
};

export default class TodoItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li key={this.props.id} className="list-group-item" style={styles.listGroup}>
              <span
                  className="glyphicon glyphicon-remove"
                  style={styles.removeItem}
                  onClick={this.props.remove.bind(null)}
              >
              </span>
                <span style={styles.todoItem}>{this.props.children}</span>
             </li>
        )
    }
}
