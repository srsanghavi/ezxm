import React, { Component } from 'react';
import ExamStore from '../../Stores/ExamStore';
import ExamActions from '../../Actions/ExamActions';




export default class StudentResult extends Component{


    render(){
        return(

        <div>
        <h3>Results</h3>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Answers</th>
                <th scope="col">Marks</th>
                </tr>
            </thead>
            <tbody>
                {this.props.students}
            </tbody>
        </table>
        </div>);
    }
}