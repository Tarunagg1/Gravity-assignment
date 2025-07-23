import React, { useRef, useEffect } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        // Auto-resize textarea on mount and when content changes
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [todo.todo]);

    const handleToggle = () => {
        onToggle(todo.id);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleEdit = (newText) => {
        if (newText.trim() && newText !== todo.todo) {
            onEdit(todo.id, newText.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        }
    };

    const handleInput = (e) => {
        // Auto-resize textarea based on content
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="todo-checkbox"
                />
                <textarea
                    ref={textareaRef}
                    value={todo.todo}
                    onChange={(e) => handleEdit(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onInput={handleInput}
                    className="todo-text"
                    disabled={todo.completed}
                    rows="1"
                    style={{
                        resize: 'none',
                        overflow: 'hidden'
                    }}
                />
            </div>
            <div className="todo-actions">
                <button
                    onClick={handleToggle}
                    className={`toggle-btn ${todo.completed ? 'undo' : 'complete'}`}
                    title={todo.completed ? 'Mark as pending' : 'Mark as complete'}
                >
                    {todo.completed ? '↶' : '✓'}
                </button>
                <button
                    onClick={handleDelete}
                    className="delete-btn"
                    title="Delete todo"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
