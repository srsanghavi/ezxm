import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import CourseActions from '../Actions/CourseActions';

const COURSE_CHANGE = 'COURSE_CHANGE';
const COURSES_CHANGE = 'COURSES_CHANGE';
const COURSE_ADDED = 'COURSE_ADDED';
const COURSES_DELETED = 'COURSES_DELETED';

let _courses = [];
let _course = null;

class CourseStore extends EventEmitter {
    constructor() {
        super();
         Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
        switch(action.actionType) {
            case ActionTypes.COURSES_FETCHED:
                this._setCourses(action.payload);
                break;
            case ActionTypes.COURSE_ADDED:
                this._addCourse(action.payload);
                break;
            case ActionTypes.COURSE_DELETED:
                this._deleteCourse(action.payload);
                break;
            case ActionTypes.COURSE_FETCHED:
                this._setCourse(action.payload);
                break;
            case ActionTypes.COURSE_UPDATED:
                this._updateCourse(action.payload);
                break;
        }
    }

    _setCourses(courses){
        if(courses){
            _courses=courses;
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(COURSES_CHANGE);
            }, 0);
        }
    }

    _getCourses(){
        return _courses;
    }

    _setCourse(course){
        if(course){
            _course=course;
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(COURSE_CHANGE);
            }, 0);
        }
    }

    _getCourse(){
        return _course;
    }


    _addCourse(course){
        if(course){
            CourseActions.fetchCourses();
        }
    }

    _deleteCourse(course){
        if(course){
            CourseActions.fetchCourses();
        }
    }

    _updateCourse(course){
        if(course){
            this._setCourse(course);
        }
    }

    addCoursesChangeListner(callback){
        this.on(COURSES_CHANGE,callback);
    }

    removeCoursesChangeListner(callback){
        this.removeListener(COURSES_CHANGE,callback);
    }

    addCourseChangeListner(callback){
        this.on(COURSE_CHANGE,callback);
    }

    removeCouseChangeListner(callback){
        this.removeListener(COURSES_CHANGE,callback);
    }
}
export default new CourseStore();