import { EventEmitter } from 'events';
import Fetch from 'whatwg-fetch';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import HTTPService from '../services/HTTPService';
import TodoList from '../classes/Todo/TodoList';
import Todo from '../classes/Todo/Todo';

const CHANGE_EVENT = 'change';

let todoList = [];

function parsingFailed(ex) {
    throw new Error('Parsing failed because; ' + ex);
}

function fetchItem(id) {
    console.log('fetchItem(s)');
    HTTPService.get(id).then(function(data) {
        todoList = new TodoList(data).toArray();
        store.emitChange();
    }).catch(parsingFailed);
}

function addItem(text) {
    console.log('addItem');
    HTTPService.post(text).then(function(data){
        todoList.push(new Todo(
            data.id,
            text
        ));
        store.emitChange();
    }).catch(parsingFailed);
}

function updateItem(id, text) {
    console.log('updateItem: ' + id  + ' with ' + ' ' + text);
    HTTPService.put({id: id, text: text}).then(function(data) {
        if (data.success) {

        }
        store.emitChange();
    }).catch(parsingFailed);
}

function removeItem (id) {
    console.log('removeItem: ' + id);
    HTTPService.destroy(id).then(function(data) {
        if (data.success) {
            todoList = todoList.filter((item) => {
                return item.id != id;
            }, id);
            store.emitChange();
        } else {
            console.log('item ' + id  + ' has not been deleted.');
        }
    }).catch(parsingFailed);
}

class Store extends EventEmitter {

    constructor() {
        super();
        AppDispatcher.register(this.handler.bind(this));
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getTodoList(){
        return todoList;
    }

    /**
     * @param  {Object} action
     */
    handler(action) {
        let text;
        let id;

        switch (action.actionType) {
            case Constants.ADD:
                text = action.text.trim();
                if (text !== '') {
                    addItem(text);
                }
                break;
            case Constants.FETCH:
                id = action.id;
                fetchItem(id);
                break;
            case Constants.UPDATE:
                id = action.id;
                text = action.text;
                if (id !== '') {
                    updateItem(id, text);
                }
                break;
            case Constants.REMOVE:
                id = action.id;
                if (id !== '') {
                    removeItem(id);
                }
                break;
        }
    }
}

const store = new Store();

export default store;
