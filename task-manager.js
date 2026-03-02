/**
 * ========================================
 * TASK MANAGEMENT SYSTEM
 * ========================================
 * Demonstrates: Error Handling, Validations, 
 * Arrays, Strings, and Date manipulation
 */

// ============================================
// CUSTOM ERROR HANDLING
// ============================================

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

// ============================================
// TASK CLASS
// ============================================

class Task {
    constructor(title, description, dueDate, priority, duration) {
        this.id = Date.now(); // Unique ID using timestamp
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate); // DATE MANIPULATION
        this.priority = priority;
        this.duration = duration;
        this.completed = false;
        this.createdAt = new Date(); // DATE MANIPULATION
    }
    
    /**
     * Calculate days remaining until due date
     * DEMONSTRATES: Date manipulation
     */
    getDaysRemaining() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const due = new Date(this.dueDate);
            due.setHours(0, 0, 0, 0);
            
            const timeDiff = due - today;
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            
            return daysRemaining;
        } catch (error) {
            throw new TaskError(`Error calculating days remaining: ${error.message}`);
        }
    }
    
    /**
     * Check if task is overdue
     * DEMONSTRATES: Date comparison
     */
    isOverdue() {
        return this.getDaysRemaining() < 0 && !this.completed;
    }
    
    /**
     * Format task details as string
     * DEMONSTRATES: String manipulation
     */
    getFormattedDetails() {
        const dateStr = this.dueDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const daysLeft = this.getDaysRemaining();
        const statusText = this.completed ? '✓ COMPLETED' : `${daysLeft} days left`;
        
        return `[${this.priority.toUpperCase()}] ${this.title} - Due: ${dateStr} (${statusText})`;
    }
}

// ============================================
// TASK MANAGER CLASS
// ============================================

class TaskManager {
    constructor() {
        this.tasks = []; // ARRAY - main storage
        this.currentFilter = 'all'; // Filter state
        this.loadFromStorage();
    }
    
    /**
     * Add a new task with full validation
     * DEMONSTRATES: Error handling, Validations, Arrays
     */
    addTask(title, description, dueDate, priority, duration) {
        try {
            // ===== VALIDATION =====
            
            // Validate title
            if (!title || typeof title !== 'string') {
                throw new ValidationError('Title must be a non-empty string');
            }
            
            title = title.trim(); // STRING manipulation
            if (title.length === 0) {
                throw new ValidationError('Title cannot be empty or just spaces');
            }
            
            if (title.length > 100) {
                throw new ValidationError('Title cannot exceed 100 characters');
            }
            
            // Validate description
            if (description && typeof description !== 'string') {
                throw new ValidationError('Description must be a string');
            }
            description = description ? description.trim() : '';
            
            if (description.length > 500) {
                throw new ValidationError('Description cannot exceed 500 characters');
            }
            
            // Validate date
            if (!dueDate) {
                throw new ValidationError('Due date is required');
            }
            
            const dueDateObj = new Date(dueDate);
            if (isNaN(dueDateObj.getTime())) {
                throw new ValidationError('Invalid date format');
            }
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDateObj.setHours(0, 0, 0, 0);
            
            if (dueDateObj < today) {
                throw new ValidationError('Due date cannot be in the past');
            }
            
            // Validate priority
            const validPriorities = ['High', 'Medium', 'Low'];
            if (!validPriorities.includes(priority)) {
                throw new ValidationError(`Priority must be one of: ${validPriorities.join(', ')}`);
            }
            
            // Validate duration
            if (duration) {
                duration = parseFloat(duration);
                if (isNaN(duration) || duration < 0) {
                    throw new ValidationError('Duration must be a positive number');
                }
                if (duration > 999) {
                    throw new ValidationError('Duration cannot exceed 999 hours');
                }
            } else {
                duration = 0;
            }
            
            // ===== CREATE TASK =====
            const newTask = new Task(title, description, dueDate, priority, duration);
            
            // ARRAY manipulation - add to tasks array
            this.tasks.push(newTask);
            
            // Save to local storage
            this.saveToStorage();
            
            return newTask;
            
        } catch (error) {
            // Error handling - re-throw with context
            if (error instanceof ValidationError || error instanceof TaskError) {
                throw error;
            }
            throw new TaskError(`Failed to add task: ${error.message}`);
        }
    }
    
    /**
     * Mark task as completed
     * DEMONSTRATES: Array methods, Error handling
     */
    completeTask(taskId) {
        try {
            const task = this.tasks.find(t => t.id === taskId); // ARRAY method
            
            if (!task) {
                throw new TaskError(`Task with ID ${taskId} not found`);
            }
            
            task.completed = true;
            this.saveToStorage();
            
            return task;
        } catch (error) {
            throw error instanceof TaskError ? error : new TaskError(error.message);
        }
    }
    
    /**
     * Delete a task
     * DEMONSTRATES: Array manipulation, Error handling
     */
    deleteTask(taskId) {
        try {
            const initialLength = this.tasks.length;
            
            // ARRAY method - filter to remove task
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            
            if (this.tasks.length === initialLength) {
                throw new TaskError(`Task with ID ${taskId} not found`);
            }
            
            this.saveToStorage();
            return true;
            
        } catch (error) {
            throw error instanceof TaskError ? error : new TaskError(error.message);
        }
    }
    
    /**
     * Get filtered tasks based on current filter
     * DEMONSTRATES: Array methods, String comparison
     */
    getFilteredTasks() {
        try {
            let filtered = this.tasks; // ARRAY reference
            
            // ARRAY method - filter based on current filter state
            switch (this.currentFilter.toLowerCase()) {
                case 'pending':
                    filtered = filtered.filter(t => !t.completed);
                    break;
                case 'completed':
                    filtered = filtered.filter(t => t.completed);
                    break;
                case 'high':
                    filtered = filtered.filter(t => t.priority === 'High' && !t.completed);
                    break;
                case 'all':
                default:
                    // Return all tasks
                    break;
            }
            
            // ARRAY method - sort by due date
            return filtered.sort((a, b) => a.dueDate - b.dueDate);
            
        } catch (error) {
            throw new TaskError(`Error filtering tasks: ${error.message}`);
        }
    }
    
    /**
     * Get statistics
     * DEMONSTRATES: Array methods (reduce, filter)
     */
    getStatistics() {
        try {
            return {
                total: this.tasks.length,
                // ARRAY method - filter and get length
                completed: this.tasks.filter(t => t.completed).length,
                pending: this.tasks.filter(t => !t.completed).length,
                highPriority: this.tasks.filter(t => t.priority === 'High' && !t.completed).length,
                // ARRAY method - reduce to sum
                totalDuration: this.tasks.reduce((sum, t) => sum + t.duration, 0),
                // ARRAY method - find overdue
                overdue: this.tasks.filter(t => t.isOverdue()).length
            };
        } catch (error) {
            throw new TaskError(`Error calculating statistics: ${error.message}`);
        }
    }
    
    /**
     * Search tasks by title or description
     * DEMONSTRATES: String methods, Array methods
     */
    searchTasks(searchTerm) {
        try {
            // STRING validation and manipulation
            if (!searchTerm || typeof searchTerm !== 'string') {
                return this.tasks;
            }
            
            const term = searchTerm.trim().toLowerCase(); // STRING methods
            
            if (term.length === 0) {
                return this.tasks;
            }
            
            // ARRAY method - filter with STRING includes method
            return this.tasks.filter(t => 
                t.title.toLowerCase().includes(term) ||
                t.description.toLowerCase().includes(term)
            );
            
        } catch (error) {
            throw new TaskError(`Error searching tasks: ${error.message}`);
        }
    }
    
    /**
     * Export tasks as formatted text
     * DEMONSTRATES: String concatenation, Array iteration
     */
    exportAsText() {
        try {
            let exportText = ''; // STRING building
            exportText += '='.repeat(50) + '\n'; // STRING repeat method
            exportText += 'TASK EXPORT\n';
            exportText += `Generated: ${new Date().toLocaleString()}\n`; // DATE and STRING
            exportText += '='.repeat(50) + '\n\n';
            
            // ARRAY iteration with forEach
            this.tasks.forEach((task, index) => {
                exportText += `${index + 1}. ${task.getFormattedDetails()}\n`;
                if (task.description) {
                    exportText += `   Description: ${task.description}\n`;
                }
                if (task.duration > 0) {
                    exportText += `   Estimated Duration: ${task.duration} hours\n`;
                }
                exportText += '\n';
            });
            
            return exportText;
        } catch (error) {
            throw new TaskError(`Error exporting tasks: ${error.message}`);
        }
    }
    
    /**
     * Local storage operations
     * DEMONSTRATES: JSON, Error handling
     */
    saveToStorage() {
        try {
            // Convert tasks to JSON STRING
            const jsonData = JSON.stringify(this.tasks.map(t => ({
                id: t.id,
                title: t.title,
                description: t.description,
                dueDate: t.dueDate.toISOString(),
                priority: t.priority,
                duration: t.duration,
                completed: t.completed,
                createdAt: t.createdAt.toISOString()
            })));
            
            localStorage.setItem('tasks', jsonData);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const jsonData = localStorage.getItem('tasks');
            
            if (!jsonData) {
                return;
            }
            
            // Parse JSON STRING back to objects
            const parsedData = JSON.parse(jsonData);
            
            // ARRAY manipulation - map to Task objects
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
                task.createdAt = new Date(data.createdAt);
                return task;
            });
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.tasks = [];
        }
    }
}

// ============================================
// UI CONTROLLER
// ============================================

class UIController {
    constructor() {
        this.taskManager = new TaskManager();
        this.initializeEventListeners();
        this.renderTasks();
        this.updateStats();
    }
    
    initializeEventListeners() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTask();
        });
        
        // Filter buttons
        document.getElementById('filterAll').addEventListener('click', () => {
            this.setFilter('all');
        });
        document.getElementById('filterPending').addEventListener('click', () => {
            this.setFilter('pending');
        });
        document.getElementById('filterCompleted').addEventListener('click', () => {
            this.setFilter('completed');
        });
        document.getElementById('filterHigh').addEventListener('click', () => {
            this.setFilter('high');
        });
    }
    
    /**
     * Handle adding a new task
     * DEMONSTRATES: Error handling, DOM manipulation
     */
    handleAddTask() {
        try {
            // Get form values - STRING trim
            const title = document.getElementById('taskTitle').value.trim();
            const description = document.getElementById('taskDesc').value.trim();
            const dueDate = document.getElementById('taskDate').value;
            const priority = document.getElementById('taskPriority').value;
            const duration = document.getElementById('taskDuration').value;
            
            // Add task with full validation
            this.taskManager.addTask(title, description, dueDate, priority, duration);
            
            // Reset form
            document.getElementById('taskForm').reset();
            
            // Show success message
            this.showAlert('Task added successfully!', 'success');
            
            // Refresh UI
            this.renderTasks();
            this.updateStats();
            
        } catch (error) {
            // ERROR HANDLING - show error message
            let errorMessage = 'An unexpected error occurred';
            if (error instanceof ValidationError) {
                errorMessage = error.message;
            } else if (error instanceof TaskError) {
                errorMessage = error.message;
            }
            
            this.showAlert(errorMessage, 'error');
        }
    }
    
    /**
     * Render all tasks
     * DEMONSTRATES: Array methods, dom manipulation, conditional logic
     */
    renderTasks() {
        try {
            const filteredTasks = this.taskManager.getFilteredTasks();
            const tasksList = document.getElementById('tasksList');
            
            // Clear previous content
            tasksList.innerHTML = '';
            
            // Check if empty - STRING concatenation
            if (filteredTasks.length === 0) {
                tasksList.innerHTML = '<div class="no-tasks">No tasks found. Add a new task to get started!</div>';
                return;
            }
            
            // ARRAY method - forEach to render each task
            filteredTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                tasksList.appendChild(taskElement);
            });
            
        } catch (error) {
            this.showAlert(`Error rendering tasks: ${error.message}`, 'error');
        }
    }
    
    /**
     * Create a task DOM element
     * DEMONSTRATES: DOM creation, STRING formatting, Date manipulation
     */
    createTaskElement(task) {
        const daysRemaining = task.getDaysRemaining();
        const isOverdue = task.isOverdue();
        
        // Create elements
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.id = `task-${task.id}`;
        
        // Format date - DATE manipulation
        const formattedDate = task.dueDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Build content with STRING templates
        let daysText = '';
        if (isOverdue) {
            daysText = `<span style="color: #dc3545; font-weight: bold;">OVERDUE by ${Math.abs(daysRemaining)} days</span>`;
        } else {
            daysText = `<span>${daysRemaining} days remaining</span>`;
        }
        
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.innerHTML = `
            <div class="task-title">${this.escapeHtml(task.title)}</div>
            <div class="task-details">
                <span class="task-priority priority-${task.priority.toLowerCase()}">
                    ${task.priority} Priority
                </span>
                <span>Due: ${formattedDate}</span>
                ${daysText}
                ${task.duration > 0 ? `<span>⏱️ ${task.duration}h</span>` : ''}
            </div>
            ${task.description ? `<div style="margin-top: 8px; color: #666; font-size: 13px;">${this.escapeHtml(task.description)}</div>` : ''}
        `;
        
        // Create action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        
        if (!task.completed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn-complete';
            completeBtn.textContent = 'Complete';
            completeBtn.addEventListener('click', () => {
                this.handleCompleteTask(task.id);
            });
            actionsDiv.appendChild(completeBtn);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            this.handleDeleteTask(task.id);
        });
        actionsDiv.appendChild(deleteBtn);
        
        taskElement.appendChild(taskContent);
        taskElement.appendChild(actionsDiv);
        
        return taskElement;
    }
    
    handleCompleteTask(taskId) {
        try {
            this.taskManager.completeTask(taskId);
            this.showAlert('Task marked as completed!', 'success');
            this.renderTasks();
            this.updateStats();
        } catch (error) {
            this.showAlert(`Error completing task: ${error.message}`, 'error');
        }
    }
    
    handleDeleteTask(taskId) {
        try {
            if (confirm('Are you sure you want to delete this task?')) {
                this.taskManager.deleteTask(taskId);
                this.showAlert('Task deleted successfully!', 'success');
                this.renderTasks();
                this.updateStats();
            }
        } catch (error) {
            this.showAlert(`Error deleting task: ${error.message}`, 'error');
        }
    }
    
    /**
     * Update statistics display
     * DEMONSTRATES: DOM manipulation, Number formatting
     */
    updateStats() {
        try {
            const stats = this.taskManager.getStatistics();
            
            document.getElementById('totalTasks').textContent = stats.total;
            document.getElementById('completedTasks').textContent = stats.completed;
            document.getElementById('pendingTasks').textContent = stats.pending;
            document.getElementById('highPriorityTasks').textContent = stats.highPriority;
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }
    
    /**
     * Set active filter
     * DEMONSTRATES: DOM manipulation, conditional logic
     */
    setFilter(filterName) {
        try {
            this.taskManager.currentFilter = filterName;
            
            // Update button states
            document.getElementById('filterAll').classList.remove('active');
            document.getElementById('filterPending').classList.remove('active');
            document.getElementById('filterCompleted').classList.remove('active');
            document.getElementById('filterHigh').classList.remove('active');
            
            const buttonMap = {
                'all': 'filterAll',
                'pending': 'filterPending',
                'completed': 'filterCompleted',
                'high': 'filterHigh'
            };
            
            if (buttonMap[filterName]) {
                document.getElementById(buttonMap[filterName]).classList.add('active');
            }
            
            this.renderTasks();
        } catch (error) {
            this.showAlert(`Error setting filter: ${error.message}`, 'error');
        }
    }
    
    /**
     * Show alert message
     * DEMONSTRATES: String concatenation, DOM manipulation
     */
    showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        alertContainer.innerHTML = ''; // Clear previous alerts
        alertContainer.appendChild(alert);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 4000);
    }
    
    /**
     * Escape HTML special characters for security
     * DEMONSTRATES: String replacement method
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// ============================================
// INITIALIZE APP ON DOM LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        new UIController();
    } catch (error) {
        console.error('Fatal error initializing app:', error);
        document.body.innerHTML = '<div style="padding: 20px; color: red;">Failed to initialize application. Check console for details.</div>';
    }
});
