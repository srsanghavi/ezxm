import React, { Component } from 'react';
import ExamStore from '../../Stores/ExamStore';
import ExamActions from '../../Actions/ExamActions';
import StudentResult from './StudentResult';




export default class OmrSheet extends Component{
    constructor(props){
        super(props);
        this.state={
            numberOfQuestion:0,
            answers:[],
            started:false,
        }
        this.start=this.start.bind(this);
        this.submit=this.submit.bind(this);
    }

    start(e){
        e.preventDefault();
        var i;
        var ans=[];
        for(i=1;i<=this.props.numberOfQuestion;i++){
            ans.push({id:i,A:false,B:false,C:false,D:false});
        }
        this.setState({
            numberOfQuestion:this.props.numberOfQuestion,
            answers:ans,
            started:true,
        })
    }

    handleCheckA(i){
        console.log(i);
        
        let ans = this.state.answers;
        if(ans[i-1].A){
            ans[i-1].A=false;
        }else{
            ans[i-1].A=true;
        }
        this.setState({
            answers:ans,
        })
    }
    
    handleCheckB(i){
        console.log(i);
        
        let ans = this.state.answers;
        if(ans[i-1].B){
            ans[i-1].B=false;
        }else{
            ans[i-1].B=true;
        }
        this.setState({
            answers:ans,
        })
    }

    handleCheckC(i){
        console.log(i);
        
        let ans = this.state.answers;
        if(ans[i-1].C){
            ans[i-1].C=false;
        }else{
            ans[i-1].C=true;
        }
        this.setState({
            answers:ans,
        })
    }

    handleCheckD(i){
        console.log(i);
        
        let ans = this.state.answers;
        if(ans[i-1].D){
            ans[i-1].D=false;
        }else{
            ans[i-1].D=true;
        }
        this.setState({
            answers:ans,
        })
    }

    submit(e){
        e.preventDefault();
        let ans = this.state.answers;
        ans = ans.map(a => {
            let st="";
            st = a.A?st+"A":st;
            st = a.B?st+"B":st;
            st = a.C?st+"C":st;
            st = a.D?st+"D":st;

            return st;
        })
        this.props.onSubmit(ans.join(","));
    }

    render(){
       
        let rows=[];
        var i;
        rows = this.state.answers.map(row => {
            return(

                     <tr>
                    <th scope="row">{row.id}</th>
                    <td>
                        {/* A */}
                        <input type="checkbox"
                               checked={row.A}
                               onChange={(e)=>{this.handleCheckA(row.id)}}/>
                            
                     </td>
                     <td>
                        {/* B */}
                        <input type="checkbox"
                               checked={row.B}
                               onChange={(e)=>{this.handleCheckB(row.id)}}/>

                     </td>
                     <td>
                        {/* C */}
                        <input type="checkbox"
                               checked={row.C}
                               onChange={(e)=>{this.handleCheckC(row.id)}}/>

                     </td>
                     <td>
                        {/* D */}
                        <input type="checkbox"
                               checked={row.D}
                               onChange={(e)=>{this.handleCheckD(row.id)}}/>

                     </td>
                </tr>
            )
        })
        
        return(
            <div>
                <h3>Fill Answers</h3>
                <button className={this.state.started?"hideen":"btn btn-primary"} onClick={this.start}>Start</button>
                <button className={this.state.started?"btn btn-primary":"hideen"} onClick={this.submit}>Submin</button>

                <table className="table table-hover table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">A</th>
                    <th scope="col">B</th>
                    <th scope="col">C</th>
                    <th scope="col">D</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        );
    }
}