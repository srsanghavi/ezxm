import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import CourseActions from '../Actions/CourseActions';
import UserActions from '../Actions/UserActions';
import ClassActions from '../Actions/ClassActions';

const CLASSES_CHANGED = "CLASSES_CHANGED";
const CLASS_CHANGED = "CLASS_CHANGED";
const CLASS_USERS_CHANGED = "CLASS_USERS_CHANGED";
// const CLASS_STD_CHANGED = "CLASS_STD_CHANGED";
let _classes = [];
let _class= {};
let _classStudents = [];
let _classInstructors = [];

class ClassStore extends EventEmitter {
    constructor() {
        super();
         Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {        
        switch(action.actionType) {
            case ActionTypes.CLASSES_FETCHED:
                this._setClasses(action.payload);
                break;
            case ActionTypes.CLASS_CREATED:
                ClassActions.fetchClasses();
                break;
            case ActionTypes.CLASS_FETCHED:
                this._setClass(action.payload);
                break;
            case ActionTypes.CLASS_STUDENTS_FETCHED:
                this._setClassStudents(action.payload);
                break;
            case ActionTypes.CLASS_INS_FETCHED:
                this._setClassInstructors(action.payload);
                break;
            case ActionTypes.CLASS_INS_ADDED:
            case ActionTypes.CLASS_INS_REMOVED:
            case ActionTypes.CLASS_STUDENT_ADDED:
            case ActionTypes.CLASS_STUDENT_REMOVED:

                setTimeout(() => { // Run after dispatcher has finished
                    this.emit(CLASS_CHANGED);
                }, 0);
                break;
        }
    }

    _setClasses(classes){
        
            _classes=classes;
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(CLASSES_CHANGED);
            }, 0);
    }

    _setClass(ezxmclass){
        _class=ezxmclass;
        setTimeout(() => { // Run after dispatcher has finished
            this.emit(CLASS_CHANGED);
        }, 0);
    }

    _setClassInstructors(users){
        _classInstructors = users;
        setTimeout(() => { // Run after dispatcher has finished
            this.emit(CLASS_USERS_CHANGED);
        }, 0);
    }

    _setClassStudents(users){
        _classStudents = users;
        setTimeout(() => { // Run after dispatcher has finished
            this.emit(CLASS_USERS_CHANGED);
        }, 0);
    }


    getClassIns(){
        return _classInstructors;
    }

    getClassStudents(){
        return _classStudents;
    }

    _getClasses(){
        return _classes;
    }

    getClass(){
        return _class;
    }

    addClassesChangedListner(callback){
        this.on(CLASSES_CHANGED,callback);
    }

    removeClassesChangedListener(callback){
        this.removeListener(CLASSES_CHANGED,callback);
    }

    addClassChangeListner(callback){
        this.on(CLASS_CHANGED,callback);
    }

    removeClassChangeListener(callback){
        this.removeListener(CLASS_CHANGED,callback);
    }
    

    addClassUserChangeListner(callback){
        this.on(CLASS_USERS_CHANGED,callback);
    }

    removeClassUserChangeListner(callback){
        this.on(CLASS_USERS_CHANGED,callback);
    }

}

export default new ClassStore();