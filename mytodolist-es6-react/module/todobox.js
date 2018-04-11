import React,{Component} from 'react'
import {render} from 'react-dom';
import Done from './done.js'
import Button from './button'
import OnGoing from './ongoing.js'
import TodoTop from './todotop'
import '../views/liborder.css'

class TodoBox extends Component{
    constructor(props){
        super(props);
        this.state={
            old:JSON.parse(localStorage.getItem("myplan"))?JSON.parse(localStorage.getItem("myplan")):[],
            len1:0,
            len2:0
        }
        this.handleChange=this.handleChange.bind(this);
        
    }
    componentWillMount() {
        var rows=this.state.old;
        var len1=0;
        var len2=0;
        for (var i = 0; i < rows.length; i++) {
            if(rows[i].done){
                this.setState((prevState,props)=>({
                    len2:prevState.len2+1
                }))
            }else{
                this.setState((prevState,props)=>({
                    len1:prevState.len1+1
                }))
            }
        }
      }
    handleChange(rows,len1,len2){
        this.setState({
            old:rows,
            len1:len1,
            len2:len2
        })
    }
    render(){
        return(
            <div className="todobox">
                <TodoTop msg={this.state.old} add={this.handleChange}/>
                <Button msg={this.state.old} add={this.handleChange}/>
                <OnGoing msg={this.state.old} len1={this.state.len1} del={this.handleChange} finish={this.handleChange}/>
                <Done msg={this.state.old} len2={this.state.len2} del={this.handleChange} finish={this.handleChange}/>
            </div>
        )
    }
}

export default TodoBox