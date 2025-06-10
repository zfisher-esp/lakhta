document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de colores para bordes inferiores fluorescentes y fondos
    const neonStyles = {
        'rosa': {
            border: '#FF10F0',
            background: 'rgba(255, 16, 240, 0.2)' // Rosa con opacidad
        },
        'morado': {
            border: '#9D00FF',
            background: 'rgba(157, 0, 255, 0.2)' // Morado con opacidad
        },
        'verde': {
            border: '#39FF14',
            background: 'rgba(57, 255, 20, 0.2)' // Verde con opacidad
        },
        'azul': {
            border: '#00B4FF',
            background: 'rgba(0, 180, 255, 0.2)' // Azul con opacidad
        }
    };

    // Seleccionar todos los textos dentro de column-item
    const textElements = document.querySelectorAll('.column-item-text');

    // Aplicar estilos fluorescentes
    textElements.forEach(textElement => {
        const item = textElement.closest('.column-item');
        if (!item) return;

        const color = item.getAttribute('data-color');
        
        if (color && neonStyles[color]) {
            const style = neonStyles[color];
            
            // Aplicar estilos
            textElement.style.border = 'none';
            textElement.style.borderBottom = `3px solid ${style.border}`;
            textElement.style.boxShadow = `0 0px 0px ${hexToRgba(style.border, 0.4)}`;
            
            // Añadir fondo con opacidad
            textElement.style.backgroundColor = style.background;
            textElement.style.padding = '8px 12px'; // Añadir padding para que el fondo se vea mejor
            textElement.style.borderRadius = '4px'; // Esquinas redondeadas para mejor apariencia
        }
    });

    // Función para convertir HEX a RGBA (para el efecto glow)
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
});