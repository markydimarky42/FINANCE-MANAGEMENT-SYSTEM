document.addEventListener("DOMContentLoaded", () => {
  // Shared account data
  const accountNumbers = [
    { id: 1, number: "1001", name: "Cash" },
    { id: 2, number: "1002", name: "Accounts Receivable" },
    { id: 3, number: "2001", name: "Accounts Payable" },
  ];

  // Get the edit row template
  const editRowTemplate = document.getElementById("editJournalRowTemplate");
  const editModal = document.getElementById("editModal");
  const editJournalTableBody = document
    .getElementById("edit-journalTable")
    .querySelector("tbody");
  const editAddRowButton = document.getElementById("edit-addRow");
  let rowToDelete = null;

  // Function to populate dropdowns with account numbers and names
  function populateRow(row) {
    const accountNumberDropdown = row.querySelector(".account-number-dropdown");
    const accountNameDropdown = row.querySelector(".account-name-dropdown");

    accountNumbers.forEach((account) => {
      const optionNumber = document.createElement("option");
      optionNumber.value = account.number;
      optionNumber.textContent = account.number;
      accountNumberDropdown.appendChild(optionNumber);

      const optionName = document.createElement("option");
      optionName.value = account.name;
      optionName.textContent = account.name;
      accountNameDropdown.appendChild(optionName);
    });
  }

  // Function to add a new row to the journal table body
  function addNewRow(journalTableBody) {
    const newRow = editRowTemplate.content.cloneNode(true);
    populateRow(newRow);
    journalTableBody.appendChild(newRow);
  }

  // Event listener for the 'Edit' modal show event
  editModal.addEventListener("show.bs.modal", () => {
    editJournalTableBody.innerHTML = ""; // Clear existing rows
    addNewRow(editJournalTableBody); // Add one empty row
  });

  // Add new row on button click
  editAddRowButton.addEventListener("click", () => {
    addNewRow(editJournalTableBody);
  });

  // Event listener for dropdown changes to sync account numbers and names
  editJournalTableBody.addEventListener("change", (event) => {
    if (event.target.classList.contains("account-number-dropdown")) {
      const selectedNumber = event.target.value;
      const nameDropdown = event.target
        .closest("tr")
        .querySelector(".account-name-dropdown");
      nameDropdown.value = accountNumbers.find(
        (account) => account.number === selectedNumber
      ).name;
    }

    if (event.target.classList.contains("account-name-dropdown")) {
      const selectedName = event.target.value;
      const numberDropdown = event.target
        .closest("tr")
        .querySelector(".account-number-dropdown");
      numberDropdown.value = accountNumbers.find(
        (account) => account.name === selectedName
      ).number;
    }
  });

  // Remove row with confirmation if populated
  editJournalTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-row")) {
      e.preventDefault(); // Prevent default button action
      const row = e.target.closest("tr");
      const inputs = row.querySelectorAll("input, select");
      let isPopulated = false;

      inputs.forEach((input) => {
        if (input.value.trim() !== "") {
          isPopulated = true;
        }
      });

      if (isPopulated) {
        rowToDelete = row;
        const deleteConfirmationModal = new bootstrap.Modal(
          document.getElementById("deleteConfirmationModal")
        );
        deleteConfirmationModal.show();
      } else {
        row.remove();
      }
    }
  });

  // Confirm delete row
  document
    .getElementById("confirmDelete")
    .addEventListener("click", function () {
      if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
      }
      const deleteConfirmationModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      deleteConfirmationModal.hide();
    });
});
