import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Store from './stores/Store';
import Actions from './actions/Actions';
import TextInput from './components/TextInput';
import TodoListItem from './components/Todo/TodoListItem';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = { todoList: Store.getTodoList() };
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		Store.addChangeListener(this.onChange);
		Actions.fetch();
	}

	componentWillUnmount() {
		Store.removeChangeListener(this.onChange);
	}

	handleAddTodo(text) {
		Actions.add(text);
	}

	handleRemoveTodo(id){;
		Actions.remove(id);
	}

	onChange(){
		this.setState({
			todoList: Store.getTodoList()
		})
	}

	render() {
		return (
			<div>
				<div className="col-sm-6 col-md-offset-3">
					<div className="col-sm-12">
						<h3 className="text-center">Todo List</h3>
						<TextInput add={this.handleAddTodo}/>
						<TodoListItem items={this.state.todoList} remove={this.handleRemoveTodo}/>
					</div>
				</div>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));
