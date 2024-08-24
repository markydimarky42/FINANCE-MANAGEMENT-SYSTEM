// Percentage of Income Budget Pie Chart
var incomeCtx = document.getElementById('incomeBudgetChart').getContext('2d');
var incomeBudgetChart = new Chart(incomeCtx, {
    type: 'pie',
    data: {
        labels: ['Used Budget', 'Remaining Budget'],
        datasets: [{
            data: [94, 6], // Example data: 94% used, 6% remaining
            backgroundColor: ['#36a2eb', '#e4e9f7']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Percentage of Expenses Budget Pie Chart
var expensesCtx = document.getElementById('expensesBudgetChart').getContext('2d');
var expensesBudgetChart = new Chart(expensesCtx, {
    type: 'pie',
    data: {
        labels: ['Used Budget', 'Remaining Budget'],
        datasets: [{
            data: [93, 7], // Example data: 93% used, 7% remaining
            backgroundColor: ['#ff6384', '#e4e9f7']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Income and Expenses Budget Bar Chart
var budgetCtx = document.getElementById('incomeExpensesBudgetChart').getContext('2d');
var incomeExpensesBudgetChart = new Chart(budgetCtx, {
    type: 'bar',
    data: {
        labels: ['Income Budget', 'Expenses Budget'],
        datasets: [{
            label: 'Budget',
            data: [432568, 245860], // Replace with your actual data
            backgroundColor: ['#36a2eb', '#ff6384']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Net Profit Margin Donut Chart
var profitCtx = document.getElementById('netProfitMarginDonutChart').getContext('2d');
var netProfitMarginDonutChart = new Chart(profitCtx, {
    type: 'doughnut',
    data: {
        labels: ['Net Profit', 'Other Expenses'],
        datasets: [{
            data: [22.56, 100], // Example data: Adjust according to your actual values
            backgroundColor: ['#4caf50', '#ff6384']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});