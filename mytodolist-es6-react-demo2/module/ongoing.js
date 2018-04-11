import React,{Component} from 'react'
import {render} from 'react-dom'
import $ from './jquery'
import "../views/liborder.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default class OnGoing extends Component{
  
    constructor(props){
        super(props);     
        this.handleDel=this.handleDel.bind(this);
        this.handleFinish=this.handleFinish.bind(this);
        this.statusChange=this.statusChange.bind(this);
        this.allowDrop=this.allowDrop.bind(this);
        this.drag=this.drag.bind(this);
        this.drop=this.drop.bind(this);
        this.stop=this.stop.bind(this);
    };
    componentWillMount() {
        window.srcdiv = null;
        window.k1 = null;
        window.k2 = null;
        window.k1class = '';
        window.k2class = '';
    }
    stop(e){
        e.stopPropagation();
    }
    allowDrop(e){
        e.preventDefault();
    }
    drag(e){
        srcdiv=e.target;
        e.dataTransfer.setData("text/html", e.target.firstChild.lastChild.innerHTML);
        k1 = e.target.id;
    }
    drop(e){
        e.preventDefault();
        var rows=this.props.msg;
        k2=e.target.id;
        var k1index=0;
        var k2index=0;
        for (var i = 0,j=0; i < rows.length,j<rows.length; i++,j++) {
            if (k1 == rows[i].id) {
                k1index=i;
            }
            if (k2 == rows[j].id) {
                k2index=j;
            }
        }
        if(srcdiv!=e.target){
            var tem=rows[k1index];            
            rows[k1index]=rows[k2index];
            rows[k2index]=tem;
            var len1=0;
            var len2=0;
            var rows=this.props.msg;
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].done){
                    len2++;
                }else{
                    len1++;
                }
            }
            this.props.finish(rows,len1,len2);
            localStorage.setItem("myplan", JSON.stringify(rows));
        }
    }
    handleDel(e){
        console.log("删除");
        var rows=this.props.msg;
        var key=e.target.parentNode.getAttribute('id');
        var len1=0;
        var len2=0;
        for (var i = 0; i < rows.length; i++) {
            if (key == rows[i].id) {
                rows.splice(i, 1);
            }
            if(rows[i].done){
                len2++;
            }else{
                len1++;
            }
        }
        this.props.del(rows,len1,len2);
        localStorage.setItem("myplan", JSON.stringify(rows));
    }
    handleFinish(e){
        var len1=0;
        var len2=0;
        e.stopPropagation();
        e.target.checked=false;
        var rows=this.props.msg;
        var key=e.target.parentNode.parentNode.getAttribute('id');
        for (let i=0;i<rows.length;i++){
            if(rows[i].id==key){                
                if(i==rows.length-1){
                    rows[i].done=true;
                }
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
            if(!item.done){
                if(item.listatus){
                   return(
                        <li className='liborder' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange} id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                    ) 
                }else{
                    return(
                        <li className='libordernone' onDragOver={this.allowDrop} onDragStart={this.drag} onDrop={this.drop} draggable="true" onClick={this.statusChange}  id={item.id} key={item.id}><span onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}><span></span><input type='checkbox'  style={{zoom:'200%'}} onClick={this.handleFinish}/><span>{item.content} </span></span><span className='del' onClick={this.handleDel} onDragOver={this.stop} onDragStart={this.stop} onDrop={this.stop}>X</span></li>
                    )  
                }                                  
            }                 
        }.bind(this))
        return(
            
            <div className="todolist ongoing">
                <div className="listtop">
                    <span>正在进行</span><span>{this.props.len1}</span>
                </div>
                <div className="list list1">
                    <ul id="ullist">
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