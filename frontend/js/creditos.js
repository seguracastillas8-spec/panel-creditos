fetch('/api/creditos', {
  headers: { Authorization: `Bearer ${localStorage.token}` }
})
.then(r => r.json())
.then(console.log);

