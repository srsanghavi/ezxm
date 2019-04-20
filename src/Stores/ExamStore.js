import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../Constants';
import CourseActions from '../Actions/CourseActions';
import ClassActions from '../Actions/ClassActions';
import ClassStore from './ClassStore';

const EXAMS_CHANGED = 'EXAMS_CHANGED';
const EXAM_CREATED = 'EXAM_CREATED';
const EXAM_CHANGED = 'EXAM_CHANGED';
const EXAM_UPDATED = 'EXAM_UPDATED';
let _exams = [];
let _exam={};

class ExamStore extends EventEmitter {
    constructor() {
        super();
         Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
        switch(action.actionType) {
            case ActionTypes.EXAMS_FETCHED:
                this._setExams(action.payload);
                break;
            case ActionTypes.EXAM_CREATED:
                setTimeout(() => { // Run after dispatcher has finished
                    this.emit(EXAM_CREATED);
                }, 0);
                break;
            case ActionTypes.EXAMS_DELETED:
                setTimeout(() => { // Run after dispatcher has finished
                    this.emit(EXAM_CREATED);
                }, 0);
                break;
            case ActionTypes.EXAM_FETCHED:
                this._setExam(action.payload);
                break;
            case ActionTypes.EXAM_UPDATED:
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(EXAM_UPDATED);
            }, 0);
        }
    }

    _setExams(exams){
        if(exams){
            _exams=exams;
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(EXAMS_CHANGED);
            }, 0);
        }
    }

    getExams(){
        return _exams;
    }

    _setExam(exam){
        if(exam){
            _exam=exam;
            setTimeout(() => { // Run after dispatcher has finished
                this.emit(EXAM_CHANGED);
            }, 0);
        }
    }

    getExam(){
        return _exam;
    }

    addExamUpdateListener(callback){
        this.on(EXAM_UPDATED,callback);

    }

    removeExamUpdatedListner(callback){
        this.removeListener(EXAM_UPDATED,callback);

    }
    addExamChangeListner(callback){
        this.on(EXAM_CHANGED,callback);
    }

    removeExamChangeListner(callback){
        this.removeListener(EXAM_CHANGED,callback);
    }
    addExamsChangeListerner(callback){
        this.on(EXAMS_CHANGED,callback);
    }
    
    removeExamsChangeListener(callback){
        this.removeListener(EXAMS_CHANGED,callback);
    }

    addExamsAddListerner(callback){
        this.on(EXAM_CREATED,callback);
    }
    
    removeExamsAddListener(callback){
        this.removeListener(EXAM_CREATED,callback);
    }
}

export default new ExamStore();