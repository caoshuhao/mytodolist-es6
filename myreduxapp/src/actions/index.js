import guid from '../components/Guid'

export const addTodo=text=>({
    type:'ADD_TODO',
    id:guid(),
    text
})
//点击完成
export const toggleTodo=id=>({
    type:'TOGGLE_TODO',
    id
})
//删除
export const delTodo=id=>({
    type:'DELETE_TODO',
    id
})
//批量添加
const num=0;
export const addTodos=num=>({
    type :'ADD_TODOS',
    id:guid(),
    num
})
//点击li
export const clickTodo=id=>({
    type:'CHANGE_LI',
    id
})
