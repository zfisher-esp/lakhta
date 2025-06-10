document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de colores en RGBA (translúcidos, alpha = 0.5)
    const colorBackgrounds = {
        'rosa': 'rgba(175, 22, 124, 0.5)',     // Rosa claro translúcido
        'morado': 'rgba(95, 7, 196, 0.48)',   // Lavanda translúcido
        'verde': 'rgba(152, 251, 152, 0.5)',    // Verde menta translúcido
        'azul': 'rgba(8, 149, 231, 0.46)'      // Azul claro translúcido
    };

    // Seleccionar todos los elementos column-item
    const columnItems = document.querySelectorAll('.column-item');

    // Aplicar fondos degradados (70% inferior translúcido)
    columnItems.forEach(item => {
        const color = item.getAttribute('data-color');
        
        if (color && colorBackgrounds[color]) {
            item.style.background = `linear-gradient(to bottom, transparent 20%, ${colorBackgrounds[color]} 20%)`;
        }
    });
});