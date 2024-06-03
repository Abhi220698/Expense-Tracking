document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // parse/load/get expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Get all the expenses
    function getExpenses() {
        expenseList.innerHTML = '';
        const indianRupeeSymbol = '\u20B9';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Amount:</strong> ${indianRupeeSymbol}${expense.amount}, 
                <strong>Description:</strong> ${expense.description}, 
                <strong>Category:</strong> ${expense.category}
                <button class="delete" data-index="${index}">Delete</button>
                <button class="edit" data-index="${index}">Edit</button>
            `;
            expenseList.appendChild(li);
        });
    }

    // Add expense
    function addExpense(amount, description, category) {
        expenses.push({ amount, description, category });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        getExpenses();
    }

    // Edit expense
    function editExpense(index, newExpense) {
        expenses[index] = newExpense;
        localStorage.setItem('expenses', JSON.stringify(expenses));
        getExpenses();
    }

    // Delete expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        getExpenses();
    }

    // Event listener for expense form submission (for both adding and editing)
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const index = document.getElementById('expenseIndex').value;
        if (index === '') {
            addExpense(amount, description, category);
        } else {
            editExpense(index, { amount, description, category });
            document.getElementById('expenseFormButton').textContent = 'Add Expense';
            document.getElementById('expenseIndex').value = '';
        }
        expenseForm.reset();
    });

    // Event delegation for delete and edit buttons
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.dataset.index;
            deleteExpense(index);
        }
        if (event.target.classList.contains('edit')) {
            const index = event.target.dataset.index;
            const { amount, description, category } = expenses[index];
            document.getElementById('amount').value = amount;
            document.getElementById('description').value = description;
            document.getElementById('category').value = category;
            document.getElementById('expenseFormButton').textContent = 'Save Changes';
            document.getElementById('expenseIndex').value = index;
        }
    });

    // Initial rendering of expenses
    getExpenses();
});
