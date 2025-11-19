document.addEventListener('DOMContentLoaded', function() {
    
    const deleteLinks = document.querySelectorAll('.delete-link');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                e.preventDefault();
            }
        });
    });

    
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            const taskItems = document.querySelectorAll('li');
            taskItems.forEach(item => {
                const title = item.querySelector('span').textContent.toLowerCase();
                item.style.display = title.includes(query) ? '' : 'none';
            });
        });
    }

    const form = document.querySelector('form');
    const titleInput = document.querySelector('input[name="title"]');
    const formError = document.getElementById('form-error');
    
    if (form && titleInput) {
        form.addEventListener('submit', function(e) {
            const title = titleInput.value.trim();
            if (!title) {
                e.preventDefault();
                if (formError) {
                    formError.textContent = 'Le titre ne peut pas être vide';
                    formError.style.display = 'block';
                }
            } else if (formError) {
                formError.style.display = 'none';
            }
        });
    }


    const doneLinks = document.querySelectorAll('a[href*="done"]');
    doneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const taskId = this.getAttribute('href').split('/').pop();
            const li = this.closest('li');
            
            fetch(`/done/${taskId}`)
                .then(response => {
                    if (response.ok) {
                        
                        li.classList.add('done');
                        
                       
                        this.outerHTML = `<a href="/delete/${taskId}" class="delete-link" style="background-color: #f44336; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none;">Supprimer</a>`;
                        
                      
                        const newDeleteLink = li.querySelector('.delete-link');
                        newDeleteLink.addEventListener('click', function(e) {
                            if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                                e.preventDefault();
                            }
                        });
                    } else {
                        alert('Erreur lors de la mise à jour de la tâche.');
                    }
                })
                .catch(error => {
                    console.error('Erreur AJAX:', error);
                    alert('Erreur réseau.');
                });
        });
    });
});