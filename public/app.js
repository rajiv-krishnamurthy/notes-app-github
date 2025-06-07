const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

function renderNote(note) {
  const li = document.createElement('li');
  li.textContent = note.content;
  li.onclick = () => {
    fetch(`/api/notes/${note.id}`, { method: 'DELETE' }).then(() => li.remove());
  };
  list.appendChild(li);
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const content = input.value;
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  const newNote = await res.json();
  renderNote(newNote);
  input.value = '';
};

fetch('/api/notes')
  .then(res => res.json())
  .then(notes => notes.forEach(renderNote));
