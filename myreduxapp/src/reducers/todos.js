import { combineReducers } from 'redux'
const myplan=JSON.parse(localStorage.getItem("myplan"));
console.time('a')
const initialstate=myplan?myplan:[];
const todos=(state=initialstate,action)=>{
    let k1index='';
    let k2index='';
    let k1id='';
    let k2id='';
   
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id:action.id,
                    text:action.text,
                    done:false,
                    listatus:false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                ? {...todo, done: !todo.done}
                : todo
                )
        case 'DELETE_TODO':
            state.splice(state.findIndex(item => item.id === action.id), 1)
                
                
        case 'CHANGE_LI':
            return state.map(todo =>
                (todo.id === action.id)
                ? {...todo, listatus: !todo.listatus}
                : todo
                )
        case 'ADD_TODOS': 
            return [
                ...state,
                ...action.lists
            ]
        case 'DROP':
            state.map(function(todo,index){
                if(todo.id===action.id){
                    k2id=action.id;
                    k2index=index;
                }
                if(todo.id===action.k1){
                    k1id=action.k1;
                    k1index=index;
                }
            })
            if(k1id!=k2id&&k1id!=''&&k2id!=''){
                let tem=state[k1index];
                state[k1index]=state[k2index];
                state[k2index]=tem;
              }
            return [...state];
        default:
            return [...state]
    }
}
console.timeEnd('a');
export default combineReducers({
    todos
  })
