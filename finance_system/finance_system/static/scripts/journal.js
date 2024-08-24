document.getElementById('apply-filter-btn').addEventListener('click', function() {
    // Get filter values
    const source = document.getElementById('filter-source').value.toLowerCase();
    const description = document.getElementById('filter-description').value.toLowerCase();
    const amount = document.getElementById('filter-amount').value;
    const posted = document.getElementById('filter-posted').value;
    const reoccuring = document.getElementById('filter-reoccuring').value;

    // Get all rows in the table
    const rows = document.querySelectorAll('#accounts-table tbody tr');

    // Loop through each row and filter
    rows.forEach(row => {
        const rowSource = row.cells[1].innerText.toLowerCase();
        const rowDescription = row.cells[2].innerText.toLowerCase();
        const rowAmount = row.cells[3].innerText;
        const rowPosted = row.cells[4].innerText;
        const rowReoccuring = row.cells[5].innerText;

        let isVisible = true;

        // Apply filters
        if (source && !rowSource.includes(source)) isVisible = false;
        if (description && !rowDescription.includes(description)) isVisible = false;
        if (amount && rowAmount !== amount) isVisible = false;
        if (posted && rowPosted !== posted) isVisible = false;
        if (reoccuring && rowReoccuring !== reoccuring) isVisible = false;

        // Toggle row visibility
        row.style.display = isVisible ? '' : 'none';
    });

    // Close the modal
    const filterModal = new bootstrap.Modal(document.getElementById('filterModal'));
    filterModal.hide();
});


document.addEventListener('DOMContentLoaded', function() {
    let rowToDelete = null;

    // When a delete button is clicked, open the modal and store the row reference
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            rowToDelete = this.closest('tr'); // Store the reference to the row to be deleted
        });
    });

    // Confirm deletion and remove the row
    document.getElementById('confirm-delete-btn').addEventListener('click', function() {
        if (rowToDelete) {
            rowToDelete.remove(); // Remove the row from the table
            rowToDelete = null; // Reset the reference
        }

        // Close the modal
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.hide();
    });
});