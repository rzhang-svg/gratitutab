
import React, {useState} from 'react'
import TodoList from './TodoList'
import{ BsTrash } from 'react-icons/bs'
import{ TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'
import './Todo.css';

function Todo({todos, completeTodo, removeTodo, updateTodo, isUrgent}) {   
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }


    const getBackgroundColor = (isUrgent) => {
        if (isUrgent) {
            return "todo-item-div urgent";
        }
        else {
            return "todo-item-div non-urgent"
        }
    };



    return todos.map((todo, index) => (
            <li className={getBackgroundColor(isUrgent)}>
            <input
                onChange={(e) => completeTodo(todo.id)}
                type="checkbox"
                checked={todo.isComplete}
                className="checkbox checkbox-circle"
                id= "checkid"
                />
             <span for="checkid" className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}
            >
                {todo.text}
                </span>
                <div className="icons">
                    <TiEdit onClick={() => setEdit({id: todo.id, value:todo.text})} />
                    <BsTrash
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon' />
                </div>
            </li>
    ))
}

export default Todo
