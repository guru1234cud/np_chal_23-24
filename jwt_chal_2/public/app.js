// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/notes.html';
        } else {
            document.getElementById('error').textContent = data.error;
        }
    } catch (err) {
        document.getElementById('error').textContent = 'Login failed';
    }
});

// Notes page loader
if (window.location.pathname === '/notes.html') {
    loadNotes();
}

async function loadNotes() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/';
        return;
    }

    try {
        const res = await fetch('/api/notes', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();

        if (data.notes) {
            displayNotes(data.notes);
        } else {
            document.getElementById('error').textContent = data.error + '\n' + (data.hint || '');
        }
    } catch (err) {
        document.getElementById('error').textContent = 'Failed to load notes';
    }
}

function displayNotes(notes) {
    const container = document.getElementById('notesContainer');
    container.innerHTML = notes.map(note => `
    <div class="note-entry">
      <div class="note-date">${note.date}</div>
      <div class="note-title">${note.title}</div>
      <div class="note-content">${note.content}</div>
    </div>
  `).join('');
}
