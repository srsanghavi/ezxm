import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';

const CHANGE = 'CHANGE';
const PROFILE_CHANGE = 'PROFILE_CHANGE';
const ROLES_CHANGED = 'ROLES_CHANGED';
let _userid = -1;
let _user = null;
let _roles = {};

class AuthStore extends EventEmitter {
    constructor() {
        super();
         Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {

        switch(action.actionType) {
            
            case ActionTypes.ACCOUNT_SIGN_IN:
                this._setUserid(action.payload);
                break;
            case ActionTypes.ACCOUNT_CREATED:
                this._setUserid(action.payload);
            case ActionTypes.GET_USER:
                this._setUser(action.payload);
                break;
            case ActionTypes.ROLES_RECEIVED:
                this._setRoles(action.payload);
                break;
            default:
            break;
        }
    }
    _setRoles(role){
        _roles = role;
        setTimeout(() => { // Run after dispatcher has finished
            this.emit(ROLES_CHANGED);
        }, 0);

    }

    getRoles(){
        return _roles;
    }

    _setUserid(userid){
        if(userid){
            let self = this;
            _userid = userid;
            localStorage.setItem('userid',_userid.userid);
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(CHANGE);
            }, 0);
        }
    }

    _getUserid(){
        if(localStorage.getItem('userid')){
            return localStorage.getItem('userid');
        }
    }

    _setUser(user){
        
        if(user){
            let self = this;
            _user = user;
            setTimeout(() => { // Run after dispatcher has finished
                self.emit(PROFILE_CHANGE);
            }, 0);
        }
    }

    _getUser(){
        return _user;
    }


    addSigninListener(callback){
        this.on(CHANGE,callback);
    }

    removeSigninListener(callback){
        this.removeListener(CHANGE,callback);
    }

    addProfileChangeListener(callback){
        this.on(PROFILE_CHANGE,callback);
    }

    removeProfileChangeListener(callback){
        this.removeListener(PROFILE_CHANGE,callback);
    }

    addRoleListener(callback){
        this.on(ROLES_CHANGED,callback);
    }

    removeRoleListener(callback){
        this.removeListener(ROLES_CHANGED,callback);
    }
}
export default new AuthStore();