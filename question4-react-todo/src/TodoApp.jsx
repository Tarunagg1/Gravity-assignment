import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';
import { todoAPI, storage, generateId, filterTodos } from './utils/api';
import './TodoApp.css';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load todos from localStorage on component mount
    useEffect(() => {
        const savedTodos = storage.getTodos();
        if (savedTodos.length > 0) {
            setTodos(savedTodos);
        } else {
            // Load initial todos from API if no saved todos
            const loadInitialTodos = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await todoAPI.getAllTodos(10, 0);
                    if (response && response.todos) {
                        const apiTodos = response.todos.map(todo => ({
                            id: todo.id.toString(),
                            todo: todo.todo,
                            completed: todo.completed,
                            userId: todo.userId,
                            isFromAPI: true
                        }));
                        setTodos(apiTodos);
                    }
                } catch (err) {
                    setError('Failed to load todos from API. You can still add todos manually.');
                    console.error('Error loading todos:', err);
                } finally {
                    setLoading(false);
                }
            };
            loadInitialTodos();
        }
    }, []);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        storage.saveTodos(todos);
    }, [todos]);

    // Load sample todos from DummyJSON API
    const loadSampleTodos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await todoAPI.getAllTodos(10, 0);
            if (response && response.todos) {
                const apiTodos = response.todos.map(todo => ({
                    id: todo.id.toString(),
                    todo: todo.todo,
                    completed: todo.completed,
                    userId: todo.userId,
                    isFromAPI: true
                }));
                setTodos(apiTodos);
            }
        } catch (err) {
            setError('Failed to load todos from API. You can still add todos manually.');
            console.error('Error loading todos:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add a new todo
    const addTodo = useCallback(async (todoText) => {
        setLoading(true);
        setError(null);

        const newTodo = {
            id: generateId(),
            todo: todoText,
            completed: false,
            userId: 1,
            isFromAPI: false
        };

        try {
            // Add to local state immediately for better UX
            setTodos(prevTodos => [newTodo, ...prevTodos]);

            // Optionally sync with API (this is simulated and won't persist)
            await todoAPI.addTodo(newTodo);
        } catch (err) {
            console.error('Error adding todo:', err);
            // Todo is already added locally, so no need to show error
        } finally {
            setLoading(false);
        }
    }, []);

    // Toggle todo completion status
    const toggleTodo = useCallback(async (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id === id) {
                    const updatedTodo = { ...todo, completed: !todo.completed };

                    // Optionally sync with API for todos that came from API
                    if (todo.isFromAPI) {
                        todoAPI.updateTodo(id, { completed: updatedTodo.completed })
                            .catch(err => console.error('Error updating todo on API:', err));
                    }

                    return updatedTodo;
                }
                return todo;
            })
        );
    }, []);

    // Delete a todo
    const deleteTodo = useCallback(async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);

        // Remove from local state immediately
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

        // Optionally sync with API for todos that came from API
        if (todoToDelete?.isFromAPI) {
            try {
                await todoAPI.deleteTodo(id);
            } catch (err) {
                console.error('Error deleting todo on API:', err);
            }
        }
    }, [todos]);

    // Edit a todo
    const editTodo = useCallback(async (id, newText) => {
        setTodos(prevTodos =>
            prevTodos.map(todo => {
                if (todo.id === id) {
                    const updatedTodo = { ...todo, todo: newText };

                    // Optionally sync with API for todos that came from API
                    if (todo.isFromAPI) {
                        todoAPI.updateTodo(id, { todo: newText })
                            .catch(err => console.error('Error updating todo on API:', err));
                    }

                    return updatedTodo;
                }
                return todo;
            })
        );
    }, []);

    // Filter todos based on current filter
    const filteredTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);

    // Calculate todo counts
    const todoCounts = useMemo(() => ({
        total: todos.length,
        pending: todos.filter(todo => !todo.completed).length,
        completed: todos.filter(todo => todo.completed).length
    }), [todos]);

    // Handle filter change
    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    // Clear all todos
    const clearAllTodos = useCallback(() => {
        if (window.confirm('Are you sure you want to clear all todos?')) {
            setTodos([]);
            storage.clearTodos();
        }
    }, []);

    return (
        <div className="todo-app">
            <header className="app-header">
                <h1>📝 Todo List</h1>
                <p>Manage your tasks efficiently</p>
                {error && (
                    <div className="error-message">
                        <span>⚠️ {error}</span>
                        <button onClick={() => setError(null)} className="close-error">×</button>
                    </div>
                )}
            </header>

            <main className="app-main">
                <AddTodo
                    onAdd={addTodo}
                    loading={loading}
                />

                <Filter
                    currentFilter={filter}
                    onFilterChange={handleFilterChange}
                    todoCounts={todoCounts}
                    onLoadFromAPI={loadSampleTodos}
                    loading={loading}
                />

                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    filter={filter}
                    loading={loading}
                />
            </main>
        </div>
    );
};

export default TodoApp;
