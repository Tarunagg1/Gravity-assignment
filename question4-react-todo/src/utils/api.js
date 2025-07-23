// API utilities for DummyJSON todos
const API_BASE_URL = 'https://dummyjson.com';

export const todoAPI = {
    // Get all todos
    getAllTodos: async (limit = 30, skip = 0) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos?limit=${limit}&skip=${skip}`);
            if (!response.ok) throw new Error('Failed to fetch todos');
            return await response.json();
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw error;
        }
    },

    // Get a single todo
    getTodo: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`);
            if (!response.ok) throw new Error('Failed to fetch todo');
            return await response.json();
        } catch (error) {
            console.error('Error fetching todo:', error);
            throw error;
        }
    },

    // Get todos by user
    getTodosByUser: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user todos');
            return await response.json();
        } catch (error) {
            console.error('Error fetching user todos:', error);
            throw error;
        }
    },

    // Add a new todo (simulated)
    addTodo: async (todo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    todo: todo.todo,
                    completed: todo.completed || false,
                    userId: todo.userId || 1,
                })
            });
            if (!response.ok) throw new Error('Failed to add todo');
            return await response.json();
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    },

    // Update a todo (simulated)
    updateTodo: async (id, updates) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!response.ok) throw new Error('Failed to update todo');
            return await response.json();
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    },

    // Delete a todo (simulated)
    deleteTodo: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete todo');
            return await response.json();
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }
};

// Local storage utilities
export const storage = {
    getTodos: () => {
        try {
            const todos = localStorage.getItem('todos');
            return todos ? JSON.parse(todos) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    },

    saveTodos: (todos) => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    clearTodos: () => {
        try {
            localStorage.removeItem('todos');
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

// Utility functions
export const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const filterTodos = (todos, filter) => {
    switch (filter) {
        case 'completed':
            return todos.filter(todo => todo.completed);
        case 'pending':
            return todos.filter(todo => !todo.completed);
        default:
            return todos;
    }
};
