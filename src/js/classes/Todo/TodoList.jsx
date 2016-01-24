import Todo from './Todo';

let list = [];

export default class TodoList {

    constructor(todos) {
        list = todos.map((todo) => {
            return new Todo(
                todo.id,
                todo.text,
                todo.createdAt,
                todo.completedAt
            );
        });
    }

    toArray() {
        return list;
    }

}
