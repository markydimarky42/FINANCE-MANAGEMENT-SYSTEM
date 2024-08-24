document.addEventListener("DOMContentLoaded", function () {
  let selectedRow = null;

  // Cache button elements
  const editButton = document.querySelector(".disabled-edit");
  const deleteButton = document.querySelector(".disabled-deactivate");
  const applyFilterButton = document.getElementById("apply-filter-btn");
  const resetFilterButton = document.getElementById("reset-filter-btn");
  const saveNewButton = document.getElementById("save-new-btn");
  const updateEditButton = document.getElementById("update-edit-btn");
  const confirmDeleteButton = document.getElementById("confirm-delete-btn");

  // Initially disable the edit and delete buttons
  editButton.disabled = true;
  deleteButton.disabled = true;

  // Function to highlight selected row and store its data
  window.selectRow = function (row) {
    if (selectedRow) {
      selectedRow.classList.remove("table-active");
    }
    selectedRow = row;
    selectedRow.classList.add("table-active");

    editButton.disabled = false;
    deleteButton.disabled = false;

    document.getElementById("edit-account-id").value = selectedRow.dataset.id;
    document.getElementById("edit-account-no").value =
      selectedRow.dataset.number;
    document.getElementById("edit-name").value = selectedRow.dataset.name;
    document.getElementById("edit-type").value = selectedRow.dataset.type;

    document.getElementById("delete-entry-id").value = selectedRow.dataset.id;
  };

  // Filter Accounts
  applyFilterButton.addEventListener("click", function () {
    const filterName = document.getElementById("filter-name").value;
    const filterType = document.getElementById("filter-type").value;
    const filterStatus = document.getElementById("filter-status").value;

    const params = new URLSearchParams({
      name: filterName,
      type: filterType,
      status: filterStatus,
    });

    window.location.href = "/chart_of_accounts?" + params.toString();
  });

  // Reset Filters
  resetFilterButton.addEventListener("click", function () {
    window.location.href = "/chart_of_accounts";
  });

  // Save New Account
  saveNewButton.addEventListener("click", function () {
    const formData = new FormData(document.getElementById("new-account-form"));
    fetch("/chart_of_accounts/add_account", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          alert("Failed to add account.");
        }
      })
      .catch(() => alert("Network error. Failed to add account."));
  });

  // Edit Account
  updateEditButton.addEventListener("click", function () {
    const formData = new FormData(document.getElementById("edit-account-form"));
    fetch("/chart_of_accounts/edit_account", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          alert("Failed to update account.");
        }
      })
      .catch(() => alert("Network error. Failed to update account."));
  });

  // Delete Account
  confirmDeleteButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this account?")) {
      const formData = new FormData();
      formData.append(
        "account_id",
        document.getElementById("delete-entry-id").value
      );
      fetch("/chart_of_accounts/delete_account", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            location.reload();
          } else {
            alert("Failed to delete account.");
          }
        })
        .catch(() => alert("Network error. Failed to delete account."));
    }
  });
});
