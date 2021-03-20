import './App.css';
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

function App() {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var months = new Array(12);
  months[0] = "Januray"
  months[1] = "February"
  months[2] = "March"
  months[3] = "April"
  months[4] = "May"
  months[5] = "June"
  months[6] = "July"
  months[7] = "August"
  months[8] = "September"
  months[9] =  "October"
  months[10] = "November"
  months[11] = "December"

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
      const id = setInterval(() => setDateTime(new Date()), 1000);
      return () => {
          clearInterval(id);
      }
  }, []);
  return (
    <div className="App">
      <div class="top-row">
        <div id="nowbox">
          <div id="clockbox"> {`${dateTime.toLocaleTimeString()}`}</div>
          <div id="datebox"> {`${weekday[dateTime.getDay()]} ${months[dateTime.getMonth()]}, ${dateTime.getDate()}`}</div>
        </div>
        <h1 className="title-heading"> What do I get to do today?  </h1>
        <div className="TodoList-div">
          <div className="urgent-list">
            <h3 className="todo-category">URGENT</h3>
            <div className="urgent-list-div">
              <TodoList isUrgent={true} />
            </div>
          </div>
          <div className="vertical-break"></div>
          <div className= "nonurgent-list">
            <h3 className="todo-category">NON URGENT</h3>
            <div className="nonurgent-list-div">
              <TodoList isUrgent={false} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
