import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit, filter, loading }) => {
    if (loading) {
        return (
            <div className="todo-list loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading todos...</p>
                </div>
            </div>
        );
    }

    if (todos.length === 0) {
        const messages = {
            all: "No todos yet. Add one above to get started!",
            pending: "No pending todos. Great job!",
            completed: "No completed todos yet."
        };

        return (
            <div className="todo-list empty">
                <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No todos found</h3>
                    <p>{messages[filter] || messages.all}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-list">
            <div className="todo-list-header">
                <h3>
                    {filter === 'all' && `All Todos (${todos.length})`}
                    {filter === 'pending' && `Pending Todos (${todos.length})`}
                    {filter === 'completed' && `Completed Todos (${todos.length})`}
                </h3>
            </div>

            <div className="todo-items">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
