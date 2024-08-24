function addRow() {
  const tableBody = document.querySelector("#entryTable tbody");
  const firstRow = tableBody.querySelector("tr");
  const newRow = firstRow.cloneNode(true);

  // Clear the input values in the new row
  newRow.querySelectorAll("input").forEach((input) => (input.value = ""));
  tableBody.appendChild(newRow);
}

function removeRow(button) {
  const row = button.closest("tr");
  row.remove();
}

function generateJERecordNumber() {
  const jeRecordNumber = "JE-" + Date.now();
  document.getElementById("jeRecordNumber").value = jeRecordNumber;
}
