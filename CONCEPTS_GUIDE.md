# JavaScript Concepts - Quick Reference Guide

This guide shows exactly where each JavaScript concept is implemented in the Task Management System.

---

## 1️⃣ ERROR HANDLING

### Custom Error Classes
```javascript
// Lines 10-22 in task-manager.js

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class TaskError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskError";
    }
}
```

### Try-Catch Usage
```javascript
// Example 1: Validating task input
try {
    if (!title || typeof title !== 'string') {
        throw new ValidationError('Title must be a non-empty string');
    }
    // More validations...
} catch (error) {
    if (error instanceof ValidationError) {
        throw error;
    }
    throw new TaskError(`Failed to add task: ${error.message}`);
}

// Example 2: Date calculation
try {
    const today = new Date();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining;
} catch (error) {
    throw new TaskError(`Error calculating days remaining: ${error.message}`);
}
```

### Error Handling in UI
```javascript
// Lines 559-574 in handleAddTask()
try {
    this.taskManager.addTask(title, description, dueDate, priority, duration);
    this.showAlert('Task added successfully!', 'success');
    this.renderTasks();
} catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof ValidationError) {
        errorMessage = error.message;
    }
    this.showAlert(errorMessage, 'error');
}
```

---

## 2️⃣ VALIDATIONS

### String Validation
```javascript
// Lines 165-179 in addTask()

// Check if string and not empty
if (!title || typeof title !== 'string') {
    throw new ValidationError('Title must be a non-empty string');
}

// Trim whitespace
title = title.trim();

// Check if empty after trim
if (title.length === 0) {
    throw new ValidationError('Title cannot be empty or just spaces');
}

// Check max length
if (title.length > 100) {
    throw new ValidationError('Title cannot exceed 100 characters');
}
```

### Date Validation
```javascript
// Lines 188-204 in addTask()

// Check if date exists
if (!dueDate) {
    throw new ValidationError('Due date is required');
}

// Parse and validate date
const dueDateObj = new Date(dueDate);
if (isNaN(dueDateObj.getTime())) {
    throw new ValidationError('Invalid date format');
}

// Validate it's not in the past
const today = new Date();
today.setHours(0, 0, 0, 0);
if (dueDateObj < today) {
    throw new ValidationError('Due date cannot be in the past');
}
```

### Priority Validation
```javascript
// Lines 206-210 in addTask()

const validPriorities = ['High', 'Medium', 'Low'];
if (!validPriorities.includes(priority)) {
    throw new ValidationError(`Priority must be one of: ${validPriorities.join(', ')}`);
}
```

### Number Validation
```javascript
// Lines 212-223 in addTask()

if (duration) {
    duration = parseFloat(duration);
    if (isNaN(duration) || duration < 0) {
        throw new ValidationError('Duration must be a positive number');
    }
    if (duration > 999) {
        throw new ValidationError('Duration cannot exceed 999 hours');
    }
}
```

---

## 3️⃣ ARRAYS

### Array Declaration and Push
```javascript
// Lines 109-110 in TaskManager constructor

this.tasks = [];  // Declare array

// Add to array (in addTask method)
this.tasks.push(newTask);  // Push to end of array
```

### Array Filter
```javascript
// Example 1: Filter pending tasks
const pending = filtered.filter(t => !t.completed);

// Example 2: Filter high priority
const high = filtered.filter(t => t.priority === 'High' && !t.completed);

// Example 3: Filter overdue
const overdue = this.tasks.filter(t => t.isOverdue());
```

### Array Find
```javascript
// Lines 240 in completeTask()

const task = this.tasks.find(t => t.id === taskId);

if (!task) {
    throw new TaskError(`Task with ID ${taskId} not found`);
}
```

### Array Filter (Remove items)
```javascript
// Lines 258-260 in deleteTask()

this.tasks = this.tasks.filter(t => t.id !== taskId);
// Reassign array with filtered items (removes target)
```

### Array Reduce
```javascript
// Lines 315 in getStatistics()

totalDuration: this.tasks.reduce((sum, t) => sum + t.duration, 0)
// Accumulates all task durations
```

### Array Sort
```javascript
// Lines 306 in getFilteredTasks()

return filtered.sort((a, b) => a.dueDate - b.dueDate);
// Sorts tasks by due date (earliest first)
```

### Array Map
```javascript
// Lines 358-373 in loadFromStorage()

this.tasks = parsedData.map(data => {
    const task = new Task(
        data.title,
        data.description,
        data.dueDate,
        data.priority,
        data.duration
    );
    task.id = data.id;
    task.completed = data.completed;
    return task;
});
```

### Array ForEach
```javascript
// Lines 345 in exportAsText()

this.tasks.forEach((task, index) => {
    exportText += `${index + 1}. ${task.getFormattedDetails()}\n`;
    if (task.description) {
        exportText += `   Description: ${task.description}\n`;
    }
});
```

### Array Includes
```javascript
// Lines 207 in addTask()

const validPriorities = ['High', 'Medium', 'Low'];
if (!validPriorities.includes(priority)) {
    // Handle error
}
```

---

## 4️⃣ STRINGS

### String Length
```javascript
// Lines 168-179 in addTask()

if (title.length === 0) {
    throw new ValidationError('Title cannot be empty or just spaces');
}

if (title.length > 100) {
    throw new ValidationError('Title cannot exceed 100 characters');
}
```

### String Trim
```javascript
// Lines 167 & 180 in addTask()

title = title.trim();
description = description ? description.trim() : '';
```

### String toLowerCase
```javascript
// Lines 84 & 325 in searchTasks()

const term = searchTerm.trim().toLowerCase();

return this.tasks.filter(t => 
    t.title.toLowerCase().includes(term)
);
```

### String toUpperCase
```javascript
// Used in display: `${this.priority.toUpperCase()}`
```

### String Includes
```javascript
// Lines 331-333 in searchTasks()

return this.tasks.filter(t => 
    t.title.toLowerCase().includes(term) ||
    t.description.toLowerCase().includes(term)
);
```

### String Replace
```javascript
// Lines 735-743 in escapeHtml()

const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
};
return text.replace(/[&<>"']/g, m => map[m]);
```

### String Repeat
```javascript
// Lines 337-338 in exportAsText()

exportText += '='.repeat(50) + '\n';
// Creates string with 50 equal signs
```

### String Concatenation
```javascript
// Lines 336-351 in exportAsText()

let exportText = '';
exportText += '='.repeat(50) + '\n';
exportText += 'TASK EXPORT\n';
exportText += `Generated: ${new Date().toLocaleString()}\n`;
```

### Template Literals (String Interpolation)
```javascript
// Lines 63 in getFormattedDetails()
return `[${this.priority.toUpperCase()}] ${this.title} - Due: ${dateStr}`;

// Lines 724 in createTaskElement()
taskContent.innerHTML = `
    <div class="task-title">${this.escapeHtml(task.title)}</div>
`;
```

---

## 5️⃣ DATES

### Creating Date Objects
```javascript
// Lines 44 in Task constructor

this.dueDate = new Date(dueDate);  // From string
this.createdAt = new Date();       // Current date/time
```

### Date Subtraction (Calculate difference)
```javascript
// Lines 52-53 in getDaysRemaining()

const timeDiff = due - today;  // Milliseconds difference
const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
// Convert milliseconds to days
```

### Date Comparison
```javascript
// Lines 63 in isOverdue()

return this.getDaysRemaining() < 0 && !this.completed;
// Compare numeric values
```

### Date setHours
```javascript
// Lines 50-51 in getDaysRemaining()

today.setHours(0, 0, 0, 0);
due.setHours(0, 0, 0, 0);
// Reset time to midnight for accurate day comparison
```

### Date toLocaleDateString
```javascript
// Lines 68-72 in getFormattedDetails()

const dateStr = this.dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});
// Formats: "Mar 15, 2024"
```

### Date toISOString
```javascript
// Lines 346-347 in saveToStorage()

dueDate: t.dueDate.toISOString(),
// Stores as: "2024-03-15T00:00:00.000Z"
```

### Date getTime
```javascript
// Lines 197 in addTask()

if (isNaN(dueDateObj.getTime())) {
    throw new ValidationError('Invalid date format');
}
// getTime() returns milliseconds, NaN if invalid
```

### Date toLocaleString
```javascript
// Lines 339 in exportAsText()

`Generated: ${new Date().toLocaleString()}\n`
// Formats: "3/2/2024, 3:45:30 PM"
```

### Date Constructor with String
```javascript
// Lines 44 in Task constructor

this.dueDate = new Date(dueDate);  // Parse date string
```

---

## 🔄 Complete Example: Adding a Task

This shows how all 5 concepts work together:

```javascript
taskManager.addTask(
    "Complete Project",      // String - validated with length checks
    "Finish JavaScript",     // String - trimmed and validated
    "2024-03-15",           // Date - parsed and validated
    "High",                 // String - validated against array
    "8"                     // Number - validated as positive
);

// EXECUTION FLOW:
// 1. Strings: trim(), length checks, toLowerCase()
// 2. Dates: new Date(), comparison, validation
// 3. Numbers: parseFloat(), range checking
// 4. Arrays: includes() check for priority, push() to store
// 5. Error Handling: try-catch, ValidationError thrown
// 6. Result: Task added to array, saved to storage
```

---

## 📊 Concept Checklist

- ✅ **Error Handling**: Custom error classes, try-catch blocks
- ✅ **Validations**: Type, range, format, date, array inclusion
- ✅ **Arrays**: Declaration, push, filter, find, map, reduce, sort, forEach, includes
- ✅ **Strings**: Length, trim, includes, toLowerCase, toUpperCase, replace, repeat, template literals
- ✅ **Dates**: Create, subtract, compare, format, parse, validate

All concepts are demonstrated in a real, working application! 🎉
