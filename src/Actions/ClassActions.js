import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';
import AuthStore from '../Stores/AuthStore';

const api = new Api();

class ClassActions{
    fetchClasses(){
        api.getClasses().then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASSES_FETCHED,
                payload: value,
            })
        })
    }
    addClass(c){
        api.addClass(c.name,AuthStore._getUserid(),c.startdate,c.enddate,c.courseid).then(value => {
            Dispatcher.dispatch({
                actionTypes: ActionTypes.CLASS_CREATED,
                payload: value,
            })
        })
    }

    getClass(id){
        api.getClass(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_FETCHED,
                payload: value,
            })
        })
    }

    getClassStudents(id){
        api.getClassStudents(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_STUDENTS_FETCHED,
                payload: value,
            })
        })
    }

    getClassInstructorss(id){
        api.getClassInstructors(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_INS_FETCHED,
                payload: value,
            })
        })
    }

    addClassStudent(uid,cid){
        api.addStudentToClass(uid,cid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_STUDENT_ADDED,
                payload: value,
            })
        })
    }

    addClassIns(uid,cid){
        api.addInstructorToClass(uid,cid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_INS_ADDED,
                payload: value,
            })
        })
    }

    deleteClassStudent(uid,cid){
        api.removeStudentFromClass(uid,cid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_STUDENT_REMOVED,
                payload: value,
            })
        })
    }

    deleteClassIns(uid,cid){
        api.removeInstructorFromClass(uid,cid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.CLASS_INS_REMOVED,
                payload: value,
            })
        })
    }

    fetchExams(classid){
        api.getExamsInClass(classid).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.EXAMS_FETCHED,
                payload: value,
            })
        })
    }

    createExam(classid,date,name,answerkey){
        api.createExam(classid,date,answerkey,name).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.EXAM_CREATED,
                payload: value,
            })
        })
    }
}

export default new ClassActions();