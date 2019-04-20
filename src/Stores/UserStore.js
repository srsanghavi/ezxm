import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import CourseActions from '../Actions/CourseActions';
import UserActions from '../Actions/UserActions';

const USERS_CHANGED = "USERS_CHANGED";

let _users = [];

class UserStore extends EventEmitter {
    constructor() {
        super();
         Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
        switch(action.actionType) {
            case ActionTypes.USERS_FETCHED:
                this._setUsers(action.payload);
                break;
            case ActionTypes.USER_UPDATED:
                UserActions.fetchUsers();
                break;
            case ActionTypes.USER_DELETED:
                UserActions.fetchUsers();
                break;
        }
    }

    _setUsers(users){
        _users = users;
        setTimeout(() => { // Run after dispatcher has finished
            this.emit(USERS_CHANGED);
        }, 0);
    }

    getUsers(){
        return _users;
    }
    onUsersChangedListener(callback){
        this.on(USERS_CHANGED,callback);
    }

    removeUsersChangedListener(callback){
        this.removeListener(USERS_CHANGED,callback);
    }
}

export default new UserStore();