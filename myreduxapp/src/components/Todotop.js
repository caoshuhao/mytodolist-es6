import React,{Component} from 'react'
import {render} from 'react-dom';
import guid from './Guid'
import { connect } from 'react-redux'
const TodoTop=(props)=>{ 
    return(
        <div className="todotop">
            <div className="text">
                ToDoList
            </div>
            <input type="text" id="todoinput" onKeyDown={props.addTodo} placeholder="添加TODO"  autoFocus="autofocus" />
        </div>
    )  
}
function mapStateToProps(state){
    localStorage.setItem("myplan", JSON.stringify(state.todos));
    return state;
}
function mapDispatchToProps(dispatch){
   
    return {
        addTodo(e){ 
            if(e.keyCode==13){
                if(e.target.value.length>0){
                    let id=guid();
                    console.log(id)                    
                    dispatch({
                        type:'ADD_TODO',
                        id:id,
                        text:e.target.value,
                        done:false,
                        listatus:false
                    })
                    setTimeout(() => {                        
                        document.getElementById(id).setAttribute("class", "addanimation")                         
                    }, 0);
                    e.target.value='';
                    }  
                }
              
        }
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoTop) 