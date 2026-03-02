# Task Management System - JavaScript Project

A comprehensive beginner-level JavaScript project demonstrating Error Handling, Validations, Arrays, Strings, and Date manipulation.

## 🎯 Project Overview

This is a **Task Management System** with a clean, modern UI that allows users to:
- ✅ Create, manage, and complete tasks
- 🎯 Set priorities and due dates
- 📊 View statistics and filter tasks
- 💾 Persist data using local storage
- ⚠️ Handle and display validation errors

## 📚 Key JavaScript Concepts Demonstrated

### 1. **Error Handling** ❌➡️✅
```javascript
// Custom Error Classes
class ValidationError extends Error { }
class TaskError extends Error { }

// Try-Catch Blocks
try {
    // Code that might fail
} catch (error) {
    throw new ValidationError("Specific error message");
}

// Error propagation and handling
```

**File**: [task-manager.js](task-manager.js)
- Custom error classes for specific error types
- Try-catch blocks in critical methods
- Graceful error recovery with user-friendly messages

---

### 2. **Validations** ✔️
```javascript
// String Validation
if (!title || typeof title !== 'string') {
    throw new ValidationError('Title must be a non-empty string');
}

// Date Validation
const dueDateObj = new Date(dueDate);
if (isNaN(dueDateObj.getTime())) {
    throw new ValidationError('Invalid date format');
}

// Number Validation
if (isNaN(duration) || duration < 0) {
    throw new ValidationError('Duration must be a positive number');
}

// Array Validation
const validPriorities = ['High', 'Medium', 'Low'];
if (!validPriorities.includes(priority)) {
    throw new ValidationError(`Priority must be one of: ${validPriorities.join(', ')}`);
}
```

**Validation Examples**:
- Title: Non-empty string, max 100 characters
- Description: Max 500 characters
- Due Date: Valid date, cannot be in past
- Priority: Must be 'High', 'Medium', or 'Low'
- Duration: Non-negative number, max 999 hours

---

### 3. **Arrays** 📦
```javascript
// Array Storage
this.tasks = []; // Main storage

// Array Methods - Push
this.tasks.push(newTask);

// Array Methods - Filter
const pending = this.tasks.filter(t => !t.completed);

// Array Methods - Find
const task = this.tasks.find(t => t.id === taskId);

// Array Methods - Reduce
const total = this.tasks.reduce((sum, t) => sum + t.duration, 0);

// Array Methods - Sort
return filtered.sort((a, b) => a.dueDate - b.dueDate);

// Array Methods - Map
this.tasks = parsedData.map(data => new Task(...));

// Array Methods - forEach
this.tasks.forEach((task, index) => { /* process */ });
```

**Array Operations in the Project**:
- Store tasks in array
- Filter by status (pending/completed/high priority)
- Search and find specific tasks
- Sort by due date
- Calculate statistics using reduce
- Map data when loading from storage

---

### 4. **Strings** 🔤
```javascript
// String Properties
title.length // Get length
description.toLowerCase() // Case conversion

// String Methods
title.trim() // Remove whitespace
searchTerm.includes('word') // Check if contains
text.repeat(50) // Repeat string
text.replace(/pattern/g, 'replacement') // Replace

// String Concatenation
exportText += 'New content\n';

// Template Literals
exportText += `Generated: ${new Date().toLocaleString()}\n`;
```

**String Usage Examples**:
- Trim whitespace from inputs
- Case-insensitive search: `.toLowerCase().includes()`
- Format dates as strings
- Build export text with line breaks
- Create HTML content dynamically
- Escape HTML special characters for security

---

### 5. **Dates** 📅
```javascript
// Create Date Objects
this.createdAt = new Date(); // Current date/time
this.dueDate = new Date(dueDate); // From string

// Date Comparison
const today = new Date();
const daysRemaining = (dueDate - today) / (1000 * 60 * 60 * 24);

// Date Formatting
const dateStr = this.dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

// Date Methods
dueDate.getTime() // Get timestamp
dueDate.setHours(0, 0, 0, 0) // Reset time
dueDate.toISOString() // Convert to ISO string
```

**Date Features**:
- Track task creation and due dates
- Calculate days remaining until due
- Detect overdue tasks
- Format dates for display
- Persist dates in local storage using ISO format
- Validate future dates only

---

## 📂 File Structure

```
/workspaces/50241056_FSDL/
├── task-manager.html       # Main HTML file with UI and styling
├── task-manager.js         # JavaScript logic (Error handling, Classes, etc.)
└── README.md              # This file
```

## 🚀 How to Use

1. **Open the application**:
   - Open `task-manager.html` in your web browser

2. **Add a Task**:
   - Enter task title (required, 1-100 characters)
   - Add description (optional, max 500 characters)
   - Select due date (required, must be future date)
   - Choose priority (High/Medium/Low)
   - Set estimated duration in hours
   - Click "Add Task"

3. **Manage Tasks**:
   - **Complete**: Mark task as done
   - **Delete**: Remove task permanently
   - **Filter**: View all, pending, completed, or high priority tasks

4. **View Statistics**:
   - Total tasks
   - Completed tasks
   - Pending tasks
   - High priority tasks

## 💾 Data Persistence

Tasks are automatically saved to browser's **Local Storage**:
- Data persists across page refreshes
- Each task includes all details (title, date, priority, etc.)
- JSON serialization for storage

## 🎓 Learning Objectives

This project teaches:

### Beginner Concepts
- Variables and data types
- DOM manipulation
- Event listeners
- Conditional logic

### Intermediate Concepts
- Classes and OOP
- ARRAY methods (filter, map, reduce, find, sort)
- STRING methods (trim, includes, toLowerCase, etc.)
- DATE manipulation and comparison
- TRY-CATCH error handling
- Local storage API

### Validation Examples
```javascript
// Type checking
typeof value === 'string'

// Range checking
duration >= 0 && duration <= 999

// Array includes
validPriorities.includes(value)

// String length
title.length > 0 && title.length <= 100

// Date validation
!isNaN(dateObj.getTime())
```

## 🔒 Security Features

- HTML escaping to prevent XSS attacks
- Input trimming to remove whitespace
- Type validation on all inputs
- Secure data storage in browser

## 📊 Example Task Workflow

```javascript
// 1. Create task with validation
const task = taskManager.addTask(
    "Complete Project",      // title
    "Finish JavaScript code", // description
    "2024-03-15",            // dueDate
    "High",                  // priority
    "8"                      // duration (hours)
);

// 2. Task automatically validated and added to array of tasks
// 3. Data saved to local storage
// 4. UI updates with new task
// 5. User can filter, complete, or delete the task
```

## 🐛 Error Handling Examples

```javascript
// Validation Error
try {
    taskManager.addTask("", "desc", "2024-03-15", "High", "5");
} catch (error) {
    // Error: "Title cannot be empty or just spaces"
}

// Date Error
try {
    taskManager.addTask("Task", "desc", "2020-01-01", "High", "5");
} catch (error) {
    // Error: "Due date cannot be in the past"
}

// Delete Error
try {
    taskManager.deleteTask(999); // Non-existent ID
} catch (error) {
    // Error: "Task with ID 999 not found"
}
```

## 🎨 Features Showcase

| Feature | Technology | Implementation |
|---------|------------|-----------------|
| Task Storage | Arrays | `this.tasks = []` |
| Search/Filter | Array Methods | `.filter()`, `.find()` |
| Validation | Error Classes | Custom `ValidationError` |
| Dates | Date Object | `new Date()`, calculations |
| Formatting | String Methods | `.toLowerCase()`, `.trim()` |
| Persistence | Local Storage | `JSON.stringify/parse` |
| Error Handling | Try-Catch | Error catching & recovery |
| UI Updates | DOM API | `createElement()`, events |

## 📝 Notes

- All validations run before adding a task
- Tasks are sorted by due date
- Overdue tasks are highlighted in red
- Local storage is automatically managed
- No external dependencies required

Enjoy learning JavaScript! 🎉
