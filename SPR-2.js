document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchContainer = document.getElementById('search-container');
    const searchButton = document.getElementById('search-button');
    const closeSearchButton = document.getElementById('close-search-button');
    const searchInput = document.getElementById('search-input');
    const dateButton = document.getElementById('date-button');
    const columnItems = document.querySelectorAll('.column-item');
    
    // Variables de estado
    let isSearchByDate = false;
    let originalItemsOrder = Array.from(columnItems).map(item => item.cloneNode(true));
    
    // Función para abrir el contenedor de búsqueda
    function openSearchContainer() {
        searchContainer.style.display = 'block';
        searchContainer.classList.remove('fade-out');
        searchContainer.classList.add('fade-in');
        searchInput.focus();
    }
    
    // Función para cerrar el contenedor de búsqueda
    function closeSearchContainer() {
        searchContainer.classList.remove('fade-in');
        searchContainer.classList.add('fade-out');
        
        setTimeout(() => {
            searchContainer.style.display = 'none';
            searchContainer.classList.remove('fade-out');
            resetSearch();
        }, 300);
    }
    
    // Función para alternar entre modos de búsqueda
    function toggleSearchMode() {
        isSearchByDate = !isSearchByDate;
        dateButton.textContent = isSearchByDate ? 'TÍTULO' : 'FECHA';
        searchInput.placeholder = isSearchByDate 
            ? 'Escribe una fecha (dd/mm/aaaa) y presiona Enter...' 
            : 'Escribe un título y presiona Enter...';
        searchInput.value = '';
        searchInput.focus();
    }
    
    // Función para buscar items
    function searchItems() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            resetSearch();
            return;
        }
        
        columnItems.forEach(item => {
            const itemText = item.querySelector('.column-item-text').textContent.toLowerCase();
            const itemDate = item.getAttribute('data-date');
            
            const matches = isSearchByDate 
                ? itemDate.includes(searchTerm)
                : itemText.includes(searchTerm);
            
            item.style.display = matches ? 'block' : 'none';
        });
    }
    
    // Función para resetear la búsqueda
    function resetSearch() {
        searchInput.value = '';
        columnItems.forEach(item => {
            item.style.display = 'block';
        });
    }
    
    // Event listeners
    searchButton.addEventListener('click', openSearchContainer);
    closeSearchButton.addEventListener('click', closeSearchContainer);
    dateButton.addEventListener('click', toggleSearchMode);
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchItems();
        }
    });
    
    // Guardar el orden original de los items
    window.addEventListener('load', function() {
        originalItemsOrder = Array.from(columnItems).map(item => item.cloneNode(true));
    });
    
    // Función para resetear el orden de los items (usada por el botón REINICIAR)
    window.resetItemsOrder = function() {
        const columnsContainer = document.getElementById('columns-container');
        columnsContainer.innerHTML = '';
        originalItemsOrder.forEach(item => {
            columnsContainer.appendChild(item.cloneNode(true));
        });
    };
});