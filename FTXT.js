document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de colores neón para texto y bordes
    const neonColors = {
        'rosa': '#FF10F0',    // Rosa neón
        'morado': '#9D00FF',  // Morado vibrante
        'verde': '#39FF14',    // Verde neón
        'azul': '#00B4FF'     // Azul eléctrico
    };

    // Seleccionar todos los textos dentro de column-item
    const textElements = document.querySelectorAll('.column-item-text');

    // Aplicar color de texto neón y efecto glow
    textElements.forEach(textElement => {
        const item = textElement.closest('.column-item');
        if (!item) return;

        const color = item.getAttribute('data-color');
        
        if (color && neonColors[color]) {
            // Color del texto fluorescente
            textElement.style.color = neonColors[color];
            
            // Efecto glow neón para el texto
            textElement.style.textShadow = `
                0 0 5px ${neonColors[color]},
                0 0 10px ${neonColors[color]},
                0 0 20px ${neonColors[color]},
                0 0 40px ${hexToRgba(neonColors[color], 0.5)}
            `;
            
            // Conservamos el borde fluorescente del código anterior
            textElement.style.border = 'none';
            textElement.style.borderBottom = `0px solid ${neonColors[color]}`;
            textElement.style.boxShadow = `0 44px 48px ${hexToRgba(neonColors[color], 0.4)}`;
        }
    });

    // Función para convertir HEX a RGBA (para efectos de glow)
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
});