import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import Api from '../Utils/Api';

const api = new Api();

class CourseActions{
    fetchCourses(){
        api.getCourses().then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.COURSES_FETCHED,
                payload:    value,
            });
          });
    }

    fetchCourse(id){
        api.getCourse(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.COURSE_FETCHED,
                payload:    value,
                })
            })
    }

    addCourse(userid,name){
        api.addCourse(userid,name).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.COURSE_ADDED,
                payload:    value,
                })
            })
    }

    updateCourse(id,name){
        api.updateCourse(id,name).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.COURSE_UPDATED,
                payload:    value,
                })
            })
    }

    deleteCourse(id){
        api.deleteCourse(id).then(value => {
            Dispatcher.dispatch({
                actionType: ActionTypes.COURSE_DELETED,
                payload:    value,
                })
            })
    }
}
export default new CourseActions();