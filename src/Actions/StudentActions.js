import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';
import ExamActions from './ExamActions';

const api = new Api();

class InstructorActions{
    fetchStudentClasses(){
        api.getClassesForStudent().then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASSES_FETCHED,
                payload: value,
            })
        })
    }

    submitExamAnswers(examid,answers){
        api.submitAnswer(examid,answers).then(value => {
            ExamActions.getStudentExam(value.examid);
        })
    }


}

export default new InstructorActions();