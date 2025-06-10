document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de colores (puedes ajustar los valores HEX según tus necesidades)
    const colorMap = {
        'rosa': '#ff69b4',
        'morado': '#5d00cf',
        'verde': '#1eff00',
        'azul': '#0000ff'
    };
    
    // Seleccionar todos los elementos column-item
    const columnItems = document.querySelectorAll('.column-item');
    
    columnItems.forEach(item => {
        // Obtener el valor de data-color
        const colorName = item.getAttribute('data-color');
        
        if (colorName && colorMap[colorName]) {
            // Buscar la imagen dentro del column-item-image
            const img = item.querySelector('.column-item-image img');
            
            if (img) {
                // Aplicar el borde con el color correspondiente
                img.style.border = `4px solid ${colorMap[colorName]}`;
                // Aplicar sombra del mismo color
                img.style.boxShadow = `0 0 10px ${colorMap[colorName]}`;
                // Asegurar que el borde sea visible (opcional)
                img.style.boxSizing = 'border-box';
            }
        }
    });
});