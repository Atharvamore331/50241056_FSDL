// Create AngularJS app
var app = angular.module("studentPlannerApp", []);

// Create controller
app.controller("PlannerController", function ($scope) {

  // Message shown in header
  $scope.todayMessage = "Plan Smart, Study Better";

  // Student profile object
  $scope.student = {
    name: "",
    course: "",
    year: "",
    studyHours: "",
    about: ""
  };

  // Default task input object
  $scope.newTask = {
    title: "",
    priority: ""
  };

  // Validation error visibility
  $scope.showError = false;

  // Initial sample tasks
  $scope.tasks = [
    { title: "Complete AngularJS practical", priority: "High", done: false },
    { title: "Prepare notes for viva", priority: "Medium", done: true },
    { title: "Revise CSS layout concepts", priority: "Low", done: false }
  ];

  // Add a new task
  $scope.addTask = function () {
    if (!$scope.newTask.title || !$scope.newTask.priority) {
      $scope.showError = true;
      return;
    }

    $scope.tasks.push({
      title: $scope.newTask.title,
      priority: $scope.newTask.priority,
      done: false
    });

    // Reset form fields
    $scope.newTask.title = "";
    $scope.newTask.priority = "";
    $scope.showError = false;
  };

  // Delete a task by index
  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };

  // Count completed tasks
  $scope.getCompletedTasks = function () {
    var count = 0;

    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].done) {
        count++;
      }
    }

    return count;
  };

  // Remove completed tasks
  $scope.clearCompleted = function () {
    var remainingTasks = [];

    for (var i = 0; i < $scope.tasks.length; i++) {
      if (!$scope.tasks[i].done) {
        remainingTasks.push($scope.tasks[i]);
      }
    }

    $scope.tasks = remainingTasks;
  };

  // Dynamic motivation message
  $scope.getMotivationMessage = function () {
    var total = $scope.tasks.length;
    var completed = $scope.getCompletedTasks();

    if (total === 0) {
      return "Start by adding your first task and build your study momentum.";
    } else if (completed === total) {
      return "Excellent work! You have completed all your tasks.";
    } else if (completed >= 1) {
      return "Good progress. Keep going and finish the remaining tasks.";
    } else {
      return "You have tasks pending. Start one now and make progress.";
    }
  };
});