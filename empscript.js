const form = document.getElementById('empForm');
const employeeList = document.getElementById('employeeList');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const email = document.getElementById('email').value;
  const empData = { name, position, email };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    alert("Employee registered successfully!");
    displayEmployee(result);
    form.reset();
  } catch (err) {
    console.error("Error:", err.message);
  }
});

async function loadEmployees() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const employees = await res.json();
    employees.forEach(emp => {
      displayEmployee({ name: emp.name, position: "Developer", email: emp.email });
    });
  } catch (err) {
    console.error("Failed to fetch employees:", err);
  }
}

function displayEmployee({ name, position, email }) {
  const card = document.createElement('div');
  card.className = 'employee-card';
  card.innerHTML = `
    <strong>${name}</strong><br>
    Position: ${position}<br>
    Email: ${email}
  `;
  employeeList.prepend(card);
}

loadEmployees();
