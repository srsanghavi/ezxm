import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';

const api = new Api();

class ExamActions{
    getExam(id){
        api.getExam(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.EXAM_FETCHED,
                payload: value,
            })
        })
    }

    deleteExam(id){
        api.deleteExam(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.EXAMS_DELETED,
                payload: value,
            })
        })
    }

    updateAnswerKey(examid,answerkey){
        api.updateAnswerKey(examid,answerkey).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.EXAM_UPDATED,
                payload: value,
            })
        })
    }

    getStudentExam(examid){
        api.getStudentExam(examid).then(value => {
            Dispatcher.dispatch({
                actionType:ActionTypes.EXAM_FETCHED,
                payload:value,
            })
        })
    }


}

export default new ExamActions();