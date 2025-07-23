# Assignment Project

This repository contains solutions for three different programming challenges, demonstrating skills in algorithms, database operations, and modern web development.

## 📁 Project Structure

```
assignment/
├── question2-dsa/           # Data Structures & Algorithms
│   └── twoSum.js           # Two Sum algorithm implementation
├── question3-mongodb/       # MongoDB Aggregation Pipeline
│   ├── package.json        # Dependencies
│   ├── salesAggregation.js # Main aggregation pipeline
│   └── testData.js         # Test data and execution
├── question4-react-todo/    # React Todo Application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (for question3)

## 📋 Projects Overview

### Question 2: Data Structures & Algorithms
**Two Sum Algorithm Implementation**

Efficient solution to find two numbers in an array that sum to a target value.

**Features:**
- O(n) time complexity using hash map
- Handles edge cases and duplicates
- Clean, readable code with comments

**Run:**
```bash
cd question2-dsa
node twoSum.js
```

---

### Question 3: MongoDB Aggregation Pipeline
**Sales Revenue Analysis System**

Advanced MongoDB aggregation pipeline for analyzing sales data by store and month.

**Features:**
- Unwinds item arrays for individual processing
- Calculates revenue per item (quantity × price)
- Groups data by store and month
- Computes total revenue and average prices
- Sorts results by store and month

**Aggregation Stages:**
1. `$unwind` - Separates items array
2. `$addFields` - Calculates revenue and extracts month
3. `$group` - Aggregates by store and month
4. `$project` - Formats output with rounded numbers
5. `$sort` - Orders results

**Run:**
```bash
cd question3-mongodb
npm install
node testData.js
```

**Sample Output:**
```json
[
  {
    "store": "Store A",
    "month": "2024-06",
    "totalRevenue": 240,
    "averagePrice": 17.5
  }
]
```

---

### Question 4: React Todo Application
**Modern Todo App with Vite**

Full-featured React application with modern development setup.

**Features:**
- ✅ Add new todos
- ✏️ Edit existing todos
- 🗑️ Delete todos
- ☑️ Toggle completion status
- 🔍 Filter by status (All, Active, Completed)
- 📱 Responsive design
- ⚡ Fast development with Vite

**Tech Stack:**
- React 19
- Vite (build tool)
- ESLint (code quality)
- CSS3 (styling)

**Components:**
- `TodoApp` - Main application logic
- `AddTodo` - Todo creation form
- `TodoList` - List container
- `TodoItem` - Individual todo
- `Filter` - Status filtering

**Run:**
```bash
cd question4-react-todo
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Development Notes

### Code Quality
- All projects follow modern JavaScript/React best practices
- Comprehensive error handling
- Clear documentation and comments
- Modular and reusable code structure

### Git Configuration
The project includes a comprehensive `.gitignore` that excludes:
- `node_modules/` and dependency files
- Build outputs (`dist/`, `build/`)
- Environment variables (`.env*`)
- IDE settings and OS files
- MongoDB data files

## 🧪 Testing

Each project can be tested independently:

**DSA (question2):** 
- Run with different input arrays and targets
- Verify time complexity and correctness

**MongoDB (question3):**
- Test script includes sample data insertion
- Aggregation pipeline execution with results display

**React (question4):**
- Interactive testing through web interface
- All CRUD operations functional

## 📝 Implementation Highlights

### Two Sum Algorithm
- Uses hash map for O(n) time complexity
- Single pass through array
- Handles duplicate numbers correctly

### MongoDB Aggregation
- Complex multi-stage pipeline
- Proper data transformation and grouping
- Revenue calculations with proper rounding

### React Todo App
- Modern React hooks (useState, useEffect)
- Component composition patterns
- State management without external libraries
- CSS-in-JS styling approach

## 🔗 Repository Information

- **Repository:** Gravity-assignment
- **Owner:** Tarunagg1
- **Branch:** master

