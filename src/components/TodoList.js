/*global chrome*/
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './TodoList.css';

function TodoList(props) {
  const [todos, setTodos] = useState([]);

  // async function updateUI(props)  {
  //   if (props.isUrgent) {
  //     chrome.storage.sync.get({'urgentList': []}, function(val) {
  //       console.log(todos)
  //       console.log(val)
  //       console.log(val.urgentList)
  //       console.log("HALLO PLS?")
  //       setTodos([...todos, ...val.urgentList])
  //     })
  //   }
  //   else {
  //     chrome.storage.sync.get({'nonUrgentList': []}, function(val){
  //       setTodos([val.nonUrgentList])
  //     })
  //   }
  // }

  // const storeTodos = props => {
  //   if (props.isUrgent) {
  //     chrome.storage.sync.set({'urgentList': todos})
  //   }

  //   else {
  //     chrome.storage.sync.set({'nonUrgentList': todos})
  //   }
  // }
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    // console.log("WE MADE IT PAST ADD TODO FUCK YEAH")
    console.log(...todos);
    // storeTodos(props)
    // updateUI(props)
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));

    // if (props.isUrgent) {
    //   chrome.storage.sync.set({
    //     'urgentList': todos
    // })
    // }

    // else {
    //   chrome.storage.sync.set({
    //     'nonUrgentList': todos
    // })
    // }
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
        <ul className="todo-div">
        <Todo className="todos"
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        isUrgent={props.isUrgent}
        />
        </ul>

        <div className="todo-form-div">
            <TodoForm className="Todo-Form" onSubmit={addTodo} />
        </div>
    </div>
  );
}

export default TodoList
