import React,{Component} from 'react'
import {render} from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
console.time("add")
const OnGoing=(props) =>{
    console.log(props.todos)
    let len1=0;
    const List=props.todos.map(function(item,i){
        if(!item.done){
            len1++;
            if(item.listatus){
               return(
                <li className='liborder' onDragOver={props.allowDrop} onDragStart={props.drag} onDrop={props.drop} draggable="true" onClick={props.clickLi} id={item.id} key={item.id}><span><span></span><input type='checkbox' onClick={props.toggleTodo}   style={{zoom:'200%'}} /><span>{item.text} </span></span><span className='del' onClick={props.delTodo}>X</span></li>
                    // <li className='liborder' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange} id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                ) 
            }else{
                return(
                    <li className='libordernone' onDragOver={props.allowDrop} onDragStart={props.drag} onDrop={props.drop} draggable="true" onClick={props.clickLi} id={item.id} key={item.id}><span><span></span><input type='checkbox' onClick={props.toggleTodo}  style={{zoom:'200%'}} /><span>{item.text} </span></span><span className='del' onClick={props.delTodo}>X</span></li>
                    // <li className='libordernone' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange}  id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                )  
            }                                  
        }                
    }.bind(this))
    return(        
        <div className="todolist ongoing">
            <div className="listtop">
                <span>正在进行</span><span>{len1}</span>
            </div>
            <div className="list list1">
                <ul id="ullist">
                    {
                    // <ReactCSSTransitionGroup
                    // transitionName='example'
                    // transitionAppear={true}
                    // transitionEnterTimeout={300}
                    // transitionLeaveTimeout={300}>
                    // {List}
                    // </ReactCSSTransitionGroup>
                        List
                    } 
                </ul>                
            </div>
        </div>        
    )    
}

function mapStateToProps(state){ 
    return {
        todos:state.todos.filter(function(item){
            return !item.done
        })
    } 
}
function mapDispatchToProps(dispatch){
    let srcdiv=null;
    let k1=null;
    let k2=null;
    let k1class='';
    let k2class='';
    return {
        toggleTodo(e,id){
            console.log(e.target.parentNode.parentNode)
            e.target.parentNode.parentNode.setAttribute("class", "delanimation");
            id= e.target.parentNode.parentNode.id
            e.stopPropagation();
            setTimeout(() => {
                dispatch({
                    type:'TOGGLE_TODO',
                    id:id
                }) 
            }, 500);
            
        },
        delTodo(e,id){
            e.target.parentNode.setAttribute("class", "delanimation"); 
            id=e.target.parentNode.id;
            setTimeout(() => {
               dispatch({
                type:'DELETE_TODO',
                id:id
            }) 
            },500);
            
        },
        clickLi(e,id){
            e.stopPropagation();
            dispatch({
                type:'CHANGE_LI',
                id:e.target.id
            })
        },
        stop(e){
            e.stopPropagation();
        },
        allowDrop(e){
            e.preventDefault();
        },
        drag(e){
            k1=e.target.id;
        },
        drop(e){
            k2=e.target.id;
            e.preventDefault();
            dispatch({
                type:'DROP',
                id:e.target.id,
                k1:k1

            })
        }
    }
    
}

console.timeEnd("add")
export default connect(mapStateToProps, mapDispatchToProps)(OnGoing) 