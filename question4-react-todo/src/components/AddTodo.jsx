import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ onAdd, loading }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed) {
            onAdd(trimmed);
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <div className="input-group">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new todo..."
                    className="todo-input"
                    disabled={loading}
                    maxLength={200}
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim() || loading}
                    className="add-btn"
                >
                    {loading ? '...' : 'Add'}
                </button>
            </div>
            <div className="input-helper">
                <small>Press Enter to add • {inputValue.length}/200 characters</small>
            </div>
        </form>
    );
};

export default AddTodo;
