import React from 'react';
import './Filter.css';

const Filter = ({ currentFilter, onFilterChange, todoCounts, onLoadFromAPI, loading }) => {
    const filters = [
        { key: 'all', label: 'All', count: todoCounts.total },
        { key: 'pending', label: 'Pending', count: todoCounts.pending },
        { key: 'completed', label: 'Completed', count: todoCounts.completed }
    ];

    return (
        <div className="filter-container">
            <div className="filter-tabs">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => onFilterChange(filter.key)}
                        className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
                    >
                        {filter.label}
                        <span className="count-badge">{filter.count}</span>
                    </button>
                ))}
            </div>

            <div className="filter-actions">
                <button
                    onClick={onLoadFromAPI}
                    disabled={loading}
                    className="api-btn"
                    title="Load sample todos from API"
                >
                    {loading ? 'Loading...' : '🔄 Load Sample Todos'}
                </button>
            </div>
        </div>
    );
};

export default Filter;
