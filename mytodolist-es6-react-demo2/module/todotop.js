import React,{Component} from 'react'
import {render} from 'react-dom';
import guid from './guid'
class TodoTop extends Component{
    constructor(props){
        super(props);
        this.state={
            value:"",
            placeholder:"添加TODO"
        };
        this.handleChangeval=this.handleChangeval.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    handleChangeval(e){
            var newValue=e.target.value;
            this.setState({value:newValue});
        };
    handleSubmit(e){
        var len1=0;
        var len2=0;
        if(e.keyCode==13){            
            var content=e.target.value;
            if(content.length>0){
                var rows=this.props.msg;
                if (rows.length <= 0) {
                    var obj = {};
                    obj.content = content;
                    obj.done = false;
                    obj.listatus = false;
                    obj.id=guid();
                    rows.push(obj);
                } else {
                    rows.push({
                        "content": content,
                        "done": false,
                        "listatus": false,
                        "id":guid()
                    });
                }
                for (var i = 0; i < rows.length; i++) {
                    if(rows[i].done){
                        len2++;
                    }else{
                        len1++
                    }
                }
                localStorage.setItem("myplan", JSON.stringify(rows));
                this.setState({value:''},function(){
                    this.props.add(rows,len1,len2); 
                });
            }   
        }  
    }
    render(){
        return(
            <div className="todotop">
                <div className="text">
                    ToDoList
                </div>
                <input type="text" value={this.state.value} placeholder={this.state.placeholder} onKeyDown={this.handleSubmit} onChange={this.handleChangeval}  id="todoinput"  autofocus="autofocus" />
            </div>
        )
    };
    
}
export default TodoTop