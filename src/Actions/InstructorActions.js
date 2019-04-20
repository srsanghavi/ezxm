import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';

const api = new Api();

class InstructorActions{
    fetchInstructorClasses(){
        api.getClassesForInstructor().then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASSES_FETCHED,
                payload: value,
            })
        })
    }



}

export default new InstructorActions();