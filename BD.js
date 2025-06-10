// Función para aplicar bordes de colores según el atributo data-color
function applyColorBorders() {
    const items = document.querySelectorAll('.column-item');
    
    items.forEach(item => {
        const color = item.dataset.color.toLowerCase();
        
        // Eliminar clases de color existentes
        item.classList.remove('border-verde', 'border-rosa', 'border-morado', 'border-azul');
        
        // Añadir clase según el color
        switch(color) {
            case 'verde':
                item.classList.add('border-verde');
                break;
            case 'rosa':
                item.classList.add('border-rosa');
                break;
            case 'morado':
                item.classList.add('border-morado');
                break;
            case 'azul':
                item.classList.add('border-azul');
                break;
            default:
                // Color por defecto si no coincide
                item.style.borderColor = '#ccc';
        }
    });
}

// Añadir estilos CSS dinámicamente para los bordes
function addBorderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .column-item {
            border-width: 2px;
            border-style: solid;
            transition: border-color 0.3s ease;
        }
        .border-verde {
            border-color: #39FF14 !important; /* Verde neón */
            box-shadow: 0 0 5px rgba(57, 255, 20, 0.5);
        }
        .border-rosa {
            border-color: #FF10F0 !important; /* Rosa brillante */
            box-shadow: 0 0 5px rgba(255, 16, 240, 0.5);
        }
        .border-morado {
            border-color: #9D00FF !important; /* Morado vibrante */
            box-shadow: 0 0 5px rgba(157, 0, 255, 0.5);
        }
        .border-azul {
            border-color: #00B4FF !important; /* Azul eléctrico */
            box-shadow: 0 0 5px rgba(0, 180, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    addBorderStyles();
    applyColorBorders();
    
    // También aplicar bordes cuando se filtran items
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                applyColorBorders();
            }
        });
    });
    
    // Observar cambios en los items
    document.querySelectorAll('.column-item').forEach(item => {
        observer.observe(item, { attributes: true });
    });
});

// Asegurarse de que se apliquen los bordes después de filtros
function showAllItems() {
    const items = document.querySelectorAll('.column-item');
    items.forEach(item => {
        item.style.display = 'flex';
        // Reforzar aplicación de bordes
        applyColorBorders();
    });
}