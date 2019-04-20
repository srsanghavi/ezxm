import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';

const api = new Api();

class UserActions{
    fetchUsers(){
        api.getUsers().then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.USERS_FETCHED,
                payload:    value,
            });
          });
    }

    updateUser(user){
        api.updateUser(user.idUser, user.firstName, user.lastName, user.isAdmin).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.USER_UPDATED,
                payload: value,
            })
        })
    }

    deleteUser(id){
        api.deleteUser(id).then(value => {
            Dispatcher.dispatch({
                actionTypes: ActionTypes.USER_DELETED,
                payload:value,
            })
        })
    }
}

export default new UserActions();
