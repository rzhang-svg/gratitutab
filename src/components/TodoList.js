/*global chrome*/
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './TodoList.css';

function TodoList(props) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
      if (props.isUrgent) {
        chrome.storage.sync.get({'urgentList': []}, (result) => {
          console.log('URGENT LIST')
          console.log(result.urgentList)
          setTodos(result.urgentList);
        }); 
      }
      else {
        chrome.storage.sync.get({'nonUrgentList': []}, (result) => {
          console.log('NONURGENT LIST')
          console.log(result.nonUrgentList)
          setTodos(result.nonUrgentList)
        }) 
      }     
  }, [props.isUrgent]);

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
  const addTodo = async(todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos, todo];
    setTodos(newTodos);
    // console.log("WE MADE IT PAST ADD TODO FUCK YEAH")
    console.log(...todos);
    // storeTodos(props)
    // updateUI(props)
    var promise = new Promise((resolve, reject) => {
      if (props.isUrgent) {
        chrome.storage.sync.set({
          'urgentList': newTodos
      }, () => {
        chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
      })
      }
  
      else {
        chrome.storage.sync.set({
          'nonUrgentList': newTodos},
          () => {
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
          } 
      )}
    });
    return await promise;
  };

  const updateTodo = async(todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));

    var promise = new Promise((resolve, reject) => {
      if (props.isUrgent) {
        chrome.storage.sync.set({
          'urgentList': todos
      }, () => {
        chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
      })
      }
  
      else {
        chrome.storage.sync.set({
          'nonUrgentList': todos},
          () => {
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
          } 
      )}
    });
    return await promise;
  };
  const removeTodo = async(id) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
    var promise = new Promise((resolve, reject) => {
      if (props.isUrgent) {
        chrome.storage.sync.set({
          'urgentList': removedArr
      }, () => {
        chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
      })
      }
  
      else {
        chrome.storage.sync.set({
          'nonUrgentList': removedArr},
          () => {
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
          } 
      )}
    });
    return await promise;
  };

  const completeTodo = async(id) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    var promise = new Promise((resolve, reject) => {
      if (props.isUrgent) {
        chrome.storage.sync.set({
          'urgentList': todos
      }, () => {
        chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
      })
      }
  
      else {
        chrome.storage.sync.set({
          'nonUrgentList': todos},
          () => {
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
          } 
      )}
    });
    return await promise;
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
