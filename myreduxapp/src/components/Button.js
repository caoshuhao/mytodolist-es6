import React,{Component} from 'react';
import {render} from 'react-dom';
import guid from './Guid';
import { connect } from 'react-redux';
let Button=(props) =>{
    return(
            <button className="addlist" onClick={props.addTodos}>新增任务</button> 
    )
}
function mapStateToProps(state){ 
    localStorage.setItem("myplan", JSON.stringify(state.todos));
    return state;
    
}
function mapDispatchToProps(dispatch){
    let num=0;
    return {        
        addTodos(){
            let lists=[];
            for(let i=0;i<1000;i++){                
                lists.push({
                    "id":guid(),
                    "text": num++,
                    "done": false,
                    "listatus": false
                })
            }
            console.time('add')
            dispatch({
                type:'ADD_TODOS',
                lists:lists
            })
            console.timeEnd('add')
            
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Button) 