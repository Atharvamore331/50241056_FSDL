const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Step 1: Calculate total
function calculateTotal(marks, callback) {
    let total = marks.reduce((a, b) => a + b, 0);
    callback(total);
}

// Step 2: Calculate percentage
function calculatePercentage(total, callback) {
    let percentage = (total / 500) * 100;
    callback(percentage);
}

// Step 3: Assign grade
function assignGrade(percentage, callback) {
    let grade;

    if (percentage >= 75) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "Fail";

    callback(grade);
}

// API route
app.post("/result", (req, res) => {
    let marks = req.body.marks;

    calculateTotal(marks, (total) => {
        calculatePercentage(total, (percentage) => {
            assignGrade(percentage, (grade) => {
                res.json({
                    total,
                    percentage: percentage.toFixed(2),
                    grade
                });
            });
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});