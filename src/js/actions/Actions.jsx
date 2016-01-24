import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';

export default  {

    add: (text) => {
        AppDispatcher.dispatch({
            actionType: Constants.ADD,
            text: text
        });
    },

    fetch: (id) => {
        AppDispatcher.dispatch({
            actionType: Constants.FETCH,
            id: id
        });
    },

    update: (id, text) => {
        AppDispatcher.dispatch({
            actionType: Constants.UPDATE,
            id: id,
            text: text
        });
    },

    remove: (id) => {
        AppDispatcher.dispatch({
            actionType: Constants.REMOVE,
            id: id
        });
    }
}

