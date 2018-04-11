import React,{Component} from 'react'
import {render} from 'react-dom'
import $ from './jquery'
import "../views/liborder.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
class Done extends Component{
    constructor(props){
        super(props);        
        this.handleDel=this.handleDel.bind(this);
        this.handleFinish=this.handleFinish.bind(this);
        this.statusChange=this.statusChange.bind(this);
    };
    handleDel(e){
        var rows=this.props.msg;
        var key=e.target.parentNode.getAttribute('id');
        var index=0;
        var len1=0;
        var len2=0;
        for (var i = 0; i < rows.length; i++) {
            if (key == rows[i].id) {
                index = i;
                console.log(index)
                rows.splice(index, 1);
            }
            if(rows[i].done){
                len2++;
            }else{
                len1++
            }
        }
        this.props.del(rows,len1,len2);
        localStorage.setItem("myplan", JSON.stringify(rows));
    }
    handleFinish(e){
        var len1=0;
        var len2=0;
        e.stopPropagation();
        var rows=this.props.msg;
        var key=e.target.parentNode.parentNode.getAttribute('id');
        for (var i=0;i<rows.length;i++){
            if(rows[i].id==key){
               rows[i].done=false; 
               var datatem=rows[i];
                rows.splice(i,1);
                rows.push(datatem);
            }
            if(rows[i].done){
                len2++;
            }else{
                len1++
            }
        }        
        this.props.finish(rows,len1,len2);
        localStorage.setItem("myplan", JSON.stringify(rows));
    }
    statusChange(e){
        var rows=this.props.msg;
        var key=e.target.getAttribute('id');
        var index=0;
        var len1=0;
        var len2=0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].id ==key ) {
                index=i;
                rows[index].listatus=!rows[index].listatus;
            }
            if(rows[i].done){
                len2++;
            }else{
                len1++
            }
        }
        this.props.finish(rows,len1,len2);
        localStorage.setItem("myplan", JSON.stringify(rows));
    }
    render(){
        var List=this.props.msg.map(function(item,i){
            if(item.done){
                if(item.listatus){
                    return(
                        <li className='liborder' key={item.id}  onClick={this.statusChange} id={item.id}><span><span></span><input type='checkbox' checked="checked"  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} >X</span></li>
                    ) 
                }else{
                    return(
                        <li className='libordernone' onClick={this.statusChange} key={item.id}  id={item.id}><span><span></span><input type='checkbox' checked="checked"  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} >X</span></li>
                    )  
                }
                
            }                 
        }.bind(this))
        return(
            
            <div className="todolist done">
            <div className="listtop">
                <span>已经完成</span><span>{this.props.len2}</span>
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
}
export default Done