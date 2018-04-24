import React,{Component} from 'react'
import {render} from 'react-dom'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
let Done=(props)=>{
    let len2=0;
    let List=props.todos.map(function(item,i){
        if(item.done){
            len2++;
            if(item.listatus){
               return(
                <li className='liborder' onClick={props.clickLi} id={item.id} key={item.id}><span><span></span><input type='checkbox' defaultChecked="checked" onClick={props.toggleTodo}   style={{zoom:'200%'}} /><span>{item.text} </span></span><span className='del' onClick={props.delTodo}>X</span></li>
                    // <li className='liborder' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange} id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                ) 
            }else{
                return(
                    <li className='libordernone' onClick={props.clickLi} id={item.id} key={item.id}><span><span></span><input type='checkbox' defaultChecked="checked" onClick={props.toggleTodo}  style={{zoom:'200%'}} /><span>{item.text} </span></span><span className='del' onClick={props.delTodo}>X</span></li>
                    // <li className='libordernone' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange}  id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                )  
            }                                  
        }                 
    }.bind(this))
    return(
        
        <div className="todolist done">
        <div className="listtop">
            <span>已经完成</span><span>{len2}</span>
        </div>
        <div className="list list2">
            <ul id="donelist">
            {
                <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {List}
                </ReactCSSTransitionGroup>
            }
            </ul>
        </div>
    </div>
        
    )
}

function mapStateToProps(state){ 
    return state;
    
}
function mapDispatchToProps(dispatch){
    return {
        toggleTodo(e,id){
            dispatch({
                type:'TOGGLE_TODO',
                id:e.target.parentNode.parentNode.id
            })
        },
        delTodo(e,id){
            e.stopPropagation();
            dispatch({
                type:'DELETE_TODO',
                id:e.target.parentNode.id
            })
        },
        clickLi(e,id){
            dispatch({
                type:'CHANGE_LI',
                id:e.target.id
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Done) 