// Constantes para estados y configuraciones
const SEARCH_MODES = {
    TITLE: false,
    DATE: true
};

const FILTER_TYPES = {
    DATE_ASC: 'date-asc',
    DATE_DESC: 'date-desc',
    TITLE_ASC: 'title-asc',
    TITLE_DESC: 'title-desc',
    COLOR: 'color'
};

const COLOR_MAP = {
    'verde': 'Verde',
    'rosa': 'Rosa',
    'morado': 'Morado',
    'azul': 'Azul'
};

// Variables de estado
let isDateMode = SEARCH_MODES.TITLE;
let inactivityTimer = null;
let activeFilter = null;
let originalOrder = [];

// Elementos del DOM (cacheados para mejor performance)
const domElements = {
    filterButtons: document.getElementById('filter-buttons'),
    toggleButton: document.getElementById('toggle-button'),
    columnsContainer: document.getElementById('columns-container'),
    newsHeader: document.getElementById('news-header'),
    searchContainer: document.getElementById('search-container'),
    newsText: document.getElementById('news-text'),
    headerLeft: document.getElementById('header-left'),
    searchButton: document.getElementById('search-button'),
    searchInput: document.getElementById('search-input'),
    dateButton: document.getElementById('date-button')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupFilterButtons();
    saveOriginalOrder();
    setupEventListeners();
});

function setupEventListeners() {
    // Evento para el campo de búsqueda
    domElements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Funciones para manejar filtros
function toggleFilterButtons() {
    if (domElements.filterButtons.style.display === 'none' || !domElements.filterButtons.style.display) {
        domElements.filterButtons.style.display = 'flex';
        domElements.toggleButton.textContent = 'CERRAR';
    } else {
        resetFilterState();
    }
}

function resetFilterState() {
    domElements.toggleButton.textContent = 'FILTRO';
    domElements.filterButtons.style.display = 'none';

    if (!activeFilter) {
        resetFilterButtons();
    }
}

function resetFilterButtons() {
    domElements.filterButtons.innerHTML = `
        <button id="sort-by-date">Por Fecha</button>
        <button id="sort-by-name">Por Nombre</button>
        <button id="sort-by-color">Por Colores</button>
    `;
    setupFilterButtons();
    activeFilter = null;
}

function setupFilterButtons() {
    document.getElementById('sort-by-date').addEventListener('click', handleSortByDate);
    document.getElementById('sort-by-name').addEventListener('click', handleSortByName);
    document.getElementById('sort-by-color').addEventListener('click', handleSortByColor);
}

function handleSortByDate() {
    const button = document.getElementById('sort-by-date');
    if (button.textContent === 'Por Fecha') {
        button.dataset.originalText = button.textContent;
        button.textContent = 'ATRÁS';
        
        const nameButton = document.getElementById('sort-by-name');
        const colorButton = document.getElementById('sort-by-color');
        
        nameButton.textContent = 'Mas Reciente';
        colorButton.textContent = 'Mas Antiguo';
        
        nameButton.addEventListener('click', () => toggleFilter(FILTER_TYPES.DATE_ASC, 'sort-by-name'));
        colorButton.addEventListener('click', () => toggleFilter(FILTER_TYPES.DATE_DESC, 'sort-by-color'));
    } else {
        resetFilterButtons();
        showAllItems();
    }
}

function handleSortByName() {
    const button = document.getElementById('sort-by-name');
    if (button.textContent === 'Por Nombre') {
        button.dataset.originalText = button.textContent;
        button.textContent = 'ATRÁS';
        
        const dateButton = document.getElementById('sort-by-date');
        const colorButton = document.getElementById('sort-by-color');
        
        dateButton.textContent = 'A-Z';
        colorButton.textContent = 'Z-A';
        
        dateButton.addEventListener('click', () => toggleFilter(FILTER_TYPES.TITLE_ASC, 'sort-by-date'));
        colorButton.addEventListener('click', () => toggleFilter(FILTER_TYPES.TITLE_DESC, 'sort-by-color'));
    } else {
        resetFilterButtons();
        showAllItems();
    }
}

function handleSortByColor() {
    const button = document.getElementById('sort-by-color');
    if (button.textContent === 'Por Colores') {
        button.dataset.originalText = button.textContent;
        button.textContent = 'ATRÁS';
        
        domElements.filterButtons.innerHTML = `
            ${Object.entries(COLOR_MAP).map(([key, value]) => 
                `<button id="color-${key}">${value}</button>`
            ).join('')}
            <button id="sort-by-color">ATRÁS</button>
        `;
        
        Object.keys(COLOR_MAP).forEach(color => {
            document.getElementById(`color-${color}`).addEventListener('click', 
                () => filterItemsByColor(color)
            );
        });
        
        document.getElementById('sort-by-color').addEventListener('click', () => {
            resetFilterButtons();
            showAllItems();
        });
    }
}

function toggleFilter(filterType, buttonId) {
    const button = document.getElementById(buttonId);
    const backButton = document.querySelector('#filter-buttons button[data-is-back="true"]');

    if (activeFilter) {
        activeFilter.style.backgroundColor = 'orange';
    }

    if (activeFilter === button) {
        button.style.backgroundColor = '';
        activeFilter = null;
        restoreOriginalOrder();
        
        if (backButton) {
            backButton.style.backgroundColor = '';
            backButton.textContent = 'ATRÁS';
            backButton.disabled = false;
        }
    } else {
        button.style.backgroundColor = 'blue';
        activeFilter = button;
        applyFilter(filterType);
        
        if (backButton) {
            backButton.style.backgroundColor = 'gray';
            backButton.textContent = 'ACTIVADO';
            backButton.disabled = true;
        }
    }
}

function applyFilter(filterType) {
    switch (filterType) {
        case FILTER_TYPES.DATE_ASC:
            sortItemsByDate('asc');
            break;
        case FILTER_TYPES.DATE_DESC:
            sortItemsByDate('desc');
            break;
        case FILTER_TYPES.TITLE_ASC:
            sortItemsByTitle('asc');
            break;
        case FILTER_TYPES.TITLE_DESC:
            sortItemsByTitle('desc');
            break;
        default:
            showAllItems();
    }
}

// Funciones para ordenar y filtrar
function sortItemsByDate(order = 'asc') {
    const items = Array.from(domElements.columnsContainer.getElementsByClassName('column-item'));
    
    items.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    items.forEach(item => domElements.columnsContainer.appendChild(item));
}

function sortItemsByTitle(order = 'asc') {
    const items = Array.from(domElements.columnsContainer.getElementsByClassName('column-item'));
    
    items.sort((a, b) => {
        const textA = a.querySelector('.column-item-text').textContent.toLowerCase();
        const textB = b.querySelector('.column-item-text').textContent.toLowerCase();
        return order === 'asc' ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });
    
    items.forEach(item => domElements.columnsContainer.appendChild(item));
}

function filterItemsByColor(color) {
    const items = document.querySelectorAll('.column-item');
    items.forEach(item => {
        item.style.display = item.dataset.color === color ? 'flex' : 'none';
    });
}

function showAllItems() {
    document.querySelectorAll('.column-item').forEach(item => {
        item.style.display = 'flex';
    });
}

// Funciones para manejar el orden original
function saveOriginalOrder() {
    originalOrder = Array.from(document.querySelectorAll('.column-item'));
}

function restoreOriginalOrder() {
    originalOrder.forEach(item => domElements.columnsContainer.appendChild(item));
}

// Funciones para manejar búsqueda
function openSearchContainer() {
    domElements.newsText.style.display = 'none';
    domElements.filterButtons.style.display = 'none';
    domElements.toggleButton.style.display = 'none';
    domElements.searchButton.style.display = 'none';

    resetFilterState();

    domElements.searchContainer.style.display = 'flex';
    domElements.headerLeft.appendChild(domElements.searchContainer);

    resetSearchMode();
    startInactivityTimer();
    domElements.searchInput.addEventListener('input', resetInactivityTimer);
}

function closeSearchContainer() {
    domElements.searchContainer.classList.add('fade-out');
    
    setTimeout(() => {
        domElements.newsText.style.display = 'inline';
        domElements.filterButtons.style.display = 'none';
        domElements.toggleButton.style.display = 'inline-block';
        domElements.searchButton.style.display = 'inline-block';

        resetFilterState();

        domElements.searchContainer.style.display = 'none';
        domElements.searchContainer.classList.remove('fade-out');
        domElements.newsHeader.appendChild(domElements.searchContainer);
        showAllItems();
    }, 300);

    stopInactivityTimer();
}

function toggleSearchMode() {
    isDateMode = !isDateMode;

    if (isDateMode) {
        domElements.dateButton.textContent = 'TÍTULO';
        domElements.searchInput.placeholder = "Busca una fecha (DD/MM/YYYY)...";
        domElements.searchInput.value = "";
        domElements.searchInput.setAttribute('inputmode', 'numeric');
        domElements.searchInput.addEventListener('input', autoFormatDate);
    } else {
        domElements.dateButton.textContent = 'FECHA';
        domElements.searchInput.placeholder = "Buscar una noticia...";
        domElements.searchInput.value = "";
        domElements.searchInput.removeAttribute('inputmode');
        domElements.searchInput.removeEventListener('input', autoFormatDate);
    }
}

function autoFormatDate(event) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (value.length > 5) {
        value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
    }

    event.target.value = value;
}

function resetSearchMode() {
    isDateMode = SEARCH_MODES.TITLE;
    domElements.dateButton.textContent = 'FECHA';
    domElements.searchInput.placeholder = "Buscar una noticia...";
    domElements.searchInput.value = "";
    domElements.searchInput.removeAttribute('inputmode');
    domElements.searchInput.removeEventListener('input', autoFormatDate);
}

// Funciones para el temporizador de inactividad
function startInactivityTimer() {
    inactivityTimer = setTimeout(closeSearchContainer, 8000);
}

function resetInactivityTimer() {
    stopInactivityTimer();
    startInactivityTimer();
}

function stopInactivityTimer() {
    clearTimeout(inactivityTimer);
}

// Función para realizar la búsqueda
function performSearch() {
    const searchTerm = domElements.searchInput.value.trim();
    if (!searchTerm) return;

    const items = document.querySelectorAll('.column-item');
    
    items.forEach(item => {
        const compareValue = isDateMode ? 
            item.dataset.date : 
            item.querySelector('.column-item-text').textContent.toLowerCase();
            
        const searchValue = isDateMode ? 
            formatDateForSearch(searchTerm) : 
            searchTerm.toLowerCase();
            
        item.style.display = compareValue.includes(searchValue) ? 'flex' : 'none';
    });
}

function formatDateForSearch(dateString) {
    // Implementar lógica de formato de fecha según necesidades
    return dateString;
}



// Agregar esto a las constantes al inicio del código
const BUTTONS = {
    TOGGLE: 'toggle-button',
    SEARCH: 'search-button',
    CALENDAR: 'calendar-button',
    RESET: 'reset-button'
};

function resetItemsOrder() {
    // Restablecer filtros y orden
    resetFilterButtons();
    showAllItems();
    
    // Restablecer búsqueda
    const searchInput = document.getElementById('search-input');
    searchInput.value = "";
    
    // Cerrar contenedor de búsqueda si está abierto
    const searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'flex') {
        closeSearchContainer();
    }
    
    // Volver al modo de búsqueda por título
    isDateMode = false;
    document.getElementById('date-button').textContent = 'FECHA';
    searchInput.placeholder = "Buscar una noticia...";
    
    console.log("Interfaz completamente reiniciada");
}


// Función para abrir el calendario y filtrar por fecha seleccionada
function openCalendar() {
    // Cerrar otros filtros si están abiertos
    closeSearchContainer();
    document.getElementById('filter-buttons').style.display = 'none';
    
    // Configuración de Flatpickr
    const calendar = flatpickr("#calendar-button", {
        dateFormat: "d/m/Y",
        onChange: function(selectedDates, dateStr) {
            if(dateStr) {
                filterItemsByDate(dateStr);
            }
        },
        onClose: function(selectedDates, dateStr) {
            // Restaurar el texto del botón si no se seleccionó fecha
            if(!dateStr) {
                document.getElementById('calendar-button').textContent = 'CALENDARIO';
            }
        },
        locale: {
            firstDayOfWeek: 1 // Lunes como primer día de la semana
        }
    });
    
    // Abrir el calendario al hacer clic
    calendar.open();
    
    // Cambiar texto del botón temporalmente
    document.getElementById('calendar-button').textContent = 'SELECCIONAR FECHA';
}

// Modificación de la función existente para filtrar por fecha
function filterItemsByDate(searchDate) {
    // Formatear la fecha para coincidir con el formato de tus datos (DD/MM/YYYY)
    const formattedDate = formatDateForComparison(searchDate);
    
    const items = document.querySelectorAll('.column-item');
    let hasMatches = false;
    
    items.forEach(item => {
        const itemDate = formatDateForComparison(item.dataset.date);
        if (itemDate === formattedDate) {
            item.style.display = 'flex';
            hasMatches = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Actualizar texto del botón
    const calendarButton = document.getElementById('calendar-button');
    calendarButton.textContent = hasMatches ? 
        `FECHA: ${formattedDate}` : 
        `SIN RESULTADOS (${formattedDate})`;
    
    // Restablecer otros filtros
    resetFilterButtons();
}

// Función auxiliar para formatear fechas para comparación
function formatDateForComparison(dateString) {
    // Asegurar formato DD/MM/YYYY
    const parts = dateString.split('/');
    if(parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${day}/${month}/${year}`;
    }
    return dateString; // Retornar original si no coincide el formato
}

// Añadir esta función para limpiar el filtro de calendario
function resetCalendarFilter() {
    document.getElementById('calendar-button').textContent = 'CALENDARIO';
    showAllItems();
}

// Modificar la función resetItemsOrder para incluir el calendario
function resetItemsOrder() {
    resetFilterButtons();
    resetCalendarFilter();
    closeSearchContainer();
    console.log("Interfaz completamente reiniciada");
}

