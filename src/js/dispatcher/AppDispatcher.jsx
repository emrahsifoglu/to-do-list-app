import { Dispatcher } from 'flux';

class FluxDispatcher extends Dispatcher {

    handleAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

const appDispatcher = new FluxDispatcher();

export default appDispatcher;