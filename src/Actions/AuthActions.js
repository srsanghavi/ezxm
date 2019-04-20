import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';

const api = new Api();

class AuthActions{
    signin(email,password){
        api.login(email,password).then(value => {
          Dispatcher.dispatch({
              actionType: ActionTypes.ACCOUNT_SIGN_IN,
              payload:    value,
          });
        });
    }

    signup(fname,lname,email,password){
        api.signup(email,password,fname,lname).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.ACCOUNT_CREATED,
                payload: value,
            })
        })
    }

    getUser(userid){
        api.getUser(userid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.GET_USER,
                payload: value,
            })
        })
    }

    getRole(){
        api.getRoles().then(value => {
            Dispatcher.dispatch({
                actionType:ActionTypes.ROLES_RECEIVED,
                payload: value,
            })
        })
    }
}

export default new AuthActions();