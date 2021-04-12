import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';

export default function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '')

    const handleChange = e => {
        setInput(e.target.value);
      };
    
    const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.floor(Math.random() * 100000),
        text: input
    });
    setInput('');
    };

    return (
    <form className="todo-form" onSubmit={handleSubmit}>
          <TextareaAutosize
            type="text-area"
            placeholder="new"
            value = {input}
            name="text"
            className="todo-input"
            onChange={handleChange} />
        <button className="todo-button"> + </button>
    </form>
    )
}


