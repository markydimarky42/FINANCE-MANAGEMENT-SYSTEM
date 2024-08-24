document.addEventListener("DOMContentLoaded", function () {
  const accountsTable = document.getElementById("accountsTable");
  let selectedRow = null;

  // Handle row selection
  accountsTable.addEventListener("click", function (e) {
    const targetRow = e.target.parentNode;
    if (targetRow.nodeName === "TR") {
      clearSelection();
      selectedRow = targetRow;
      selectedRow.classList.add("table-active");
      document.getElementById("editButton").disabled = false;
      document.getElementById("deleteButton").disabled = false;
    }
  });

  function showSuccessModal(message) {
    document.getElementById("successMessage").textContent = message;
    const successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    successModal.show();
  }

  // Handle add account
  document
    .querySelector("#addModal .btn-primary")
    .addEventListener("click", function () {
      const accountNumber = document.getElementById("accountNumber").value;
      const accountTitle = document.getElementById("accountTitle").value;
      const accountCategory = document.getElementById("accountCategory").value;

      fetch("/chart_of_accounts/add", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          accountNumber: accountNumber,
          accountTitle: accountTitle,
          accountCategory: accountCategory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            location.reload(); // Reload the page to see the changes
          }
        });
    });

  // Handle edit account
  document
    .querySelector("#editModal .btn-primary")
    .addEventListener("click", function () {
      const accountId = selectedRow.dataset.id; // Get the ID from the selected row
      const accountNumber = document.getElementById("editAccountNumber").value;
      const accountTitle = document.getElementById("editAccountTitle").value;
      const accountCategory = document.getElementById(
        "editAccountCategory"
      ).value;

      fetch("/chart_of_accounts/edit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          id: accountId, // Include the ID here
          accountNumber: accountNumber,
          accountTitle: accountTitle,
          accountCategory: accountCategory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            location.reload(); // Reload the page to see the changes
          }
        });
    });

  // Handle delete account
  document
    .querySelector("#deleteModal .btn-danger")
    .addEventListener("click", function () {
      const accountNumber = selectedRow.cells[0].textContent;

      fetch("/chart_of_accounts/delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          accountNumber: accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            location.reload(); // Reload the page to see the changes
          }
        });
    });

  // Handle edit button click
  document.getElementById("editButton").addEventListener("click", function () {
    if (selectedRow) {
      document.getElementById("editAccountNumber").value =
        selectedRow.cells[0].textContent;
      document.getElementById("editAccountTitle").value =
        selectedRow.cells[1].textContent;
      document.getElementById("editAccountCategory").value =
        selectedRow.cells[2].textContent;
      const editModal = new bootstrap.Modal(
        document.getElementById("editModal")
      );
      editModal.show();
    }
  });

  // Handle delete button click
  document
    .getElementById("deleteButton")
    .addEventListener("click", function () {
      if (selectedRow) {
        const deleteModal = new bootstrap.Modal(
          document.getElementById("deleteModal")
        );
        deleteModal.show();
      }
    });

  function clearSelection() {
    if (selectedRow) {
      selectedRow.classList.remove("table-active");
      selectedRow = null;
    }
    document.getElementById("editButton").disabled = true;
    document.getElementById("deleteButton").disabled = true;
  }
});
