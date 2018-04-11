import React,{Component} from 'react'
import {render} from 'react-dom';
import guid from './guid'
class Button extends Component{
    constructor(props){
        super(props);
        this.handleAddList=this.handleAddList.bind(this);
    };
    componentWillMount() {
        window.num = 0;
      }
    handleAddList(e){
        var len1=0;
        var len2=0;           
        var rows=this.props.msg;
        for(var i=0;i<1000;i++){
            if (rows.length <= 0) {
                var obj = {};
                obj.content = num++;
                obj.done = false;
                obj.listatus = false;
                obj.id=guid();
                rows.push(obj);
            } else {
                rows.push({
                    "content": num++,
                    "done": false,
                    "listatus": false,
                    "id":guid()
                });
            }
        }
        
        for (var i = 0; i < rows.length; i++) {
            if(rows[i].done){
                len2++;
            }else{
                len1++
            }
        }
        this.props.add(rows,len1,len2);
        localStorage.setItem("myplan", JSON.stringify(rows));
         
        
              
         
    }
    render(){
        return(
               <button className="addlist" onClick={this.handleAddList}>新增任务</button> 
        )
    }
}
export default Button