document.addEventListener('DOMContentLoaded', function() {
    // Mapeo de colores
    const colorMap = {
        'rosa': '#ff69b4',
        'morado': '#800080',
        'verde': '#008000',
        'azul': '#0000ff'
    };
    
    // Textos personalizados
    const customTexts = {
        'MEDIO AMBIENTE': 'Conoce nuestras iniciativas ecológicas',
        'VISITA AL TEATRO': 'Visita a nuestro nuevo teatro renovado',
        'VISITA AL CONVENTO': 'Jornada de visita al convento',
        'SALÓN DE RECREATIVOS': 'Salón de recreativos', 
        'default': 'Descubre más sobre este tema'
    };
    
    // Seleccionar elementos principales
    const mainSection = document.querySelector('.section');
    const newsHeader = document.querySelector('.news-header');
    const buttonsLeft = document.querySelectorAll('.button-left');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const searchButtons = document.querySelectorAll('.search-container button');
    const calendarButton = document.querySelector('.calendar-button-with-icon');
    const headerLogo = document.querySelector('#header-logo');
    
    // Función para cambiar el estilo del scrollbar
    function setScrollbarColor(colorHex) {
        // Para navegadores WebKit (Chrome, Safari, Edge)
        const style = document.createElement('style');
        style.id = 'dynamic-scrollbar';
        style.textContent = `
            ::-webkit-scrollbar-thumb {
                background: ${colorHex} !important;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${darkenColor(colorHex, 20)} !important;
            }
        `;
        
        // Eliminar estilo anterior si existe
        const oldStyle = document.getElementById('dynamic-scrollbar');
        if (oldStyle) {
            document.head.removeChild(oldStyle);
        }
        
        document.head.appendChild(style);
        
        // Para Firefox
        document.documentElement.style.scrollbarColor = `${colorHex} #000000`;
    }
    
    // Función para oscurecer un color
    function darkenColor(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return `#${(
            0x1000000 +
            (R < 0 ? 0 : R) * 0x10000 +
            (G < 0 ? 0 : G) * 0x100 +
            (B < 0 ? 0 : B)
        ).toString(16).slice(1)}`;
    }
    
    // Función para resetear el scrollbar al color por defecto (rojo)
    function resetScrollbar() {
        const oldStyle = document.getElementById('dynamic-scrollbar');
        if (oldStyle) {
            document.head.removeChild(oldStyle);
        }
        // Restaurar color por defecto (rojo)
        document.documentElement.style.scrollbarColor = '#ff0000 #000000';
    }
    
    // Procesar cada item
    document.querySelectorAll('.column-item').forEach(item => {
        const colorName = item.getAttribute('data-color');
        const colorHex = colorMap[colorName] || '#ffffff';
        const colorRgba = hexToRgba(colorHex, 0.3);
        
        // Configuración inicial del item
        item.style.transition = 'all 0.3s ease';
        item.style.position = 'relative';
        
        // Configurar el overlay
        const overlay = document.createElement('div');
        overlay.className = 'item-overlay';
        
        const itemText = item.querySelector('.column-item-text').textContent;
        const itemDate = item.getAttribute('data-date');
        const customText = customTexts[itemText] || customTexts['default'];
        
        overlay.innerHTML = `
            <div class="date-container">📅 ${itemDate}</div>
            <div class="text-container">
                <div class="main-text">${itemText}</div>
                <div class="custom-text">${customText}</div>
            </div>
            <div class="action-text">LEER NOTICIA</div>
        `;
        
        item.appendChild(overlay);
        
        // Eventos para el hover
        item.addEventListener('mouseenter', function() {
            // Activar overlay
            overlay.style.opacity = '1';
            
            // Cambiar estilos del item
            this.style.border = `2px solid ${colorHex}`;
            this.style.boxShadow = `0 0 15px ${colorHex}`;
            
            // Cambiar estilos de la sección principal
            mainSection.style.border = `2px solid ${colorHex}`;
            mainSection.style.boxShadow = `0 0 20px 10px ${colorHex}`;
            
            // Cambiar estilos del header y botones
            newsHeader.style.borderBottom = `3px solid ${colorHex}`;
            newsHeader.style.boxShadow = `0 5px 15px ${colorHex}`;
            
            buttonsLeft.forEach(btn => {
                btn.style.background = `rgba(${hexToRgbValues(colorHex)}, 0.3)`;
                btn.style.border = `1px solid ${colorHex}`;
                btn.style.boxShadow = `0 0 10px ${colorHex}`;
            });
            
            filterButtons.forEach(btn => {
                btn.style.background = `rgba(${hexToRgbValues(colorHex)}, 0.2)`;
                btn.style.border = `1px solid ${colorHex}`;
            });
            
            searchButtons.forEach(btn => {
                btn.style.background = `rgba(${hexToRgbValues(colorHex)}, 0.2)`;
                btn.style.border = `1px solid ${colorHex}`;
            });
            
            if (calendarButton) {
                calendarButton.style.background = `rgba(${hexToRgbValues(colorHex)}, 0.3)`;
                calendarButton.style.border = `1px solid ${colorHex}`;
            }
            
            // Aplicar filtro de color al logo
            if (headerLogo) {
                headerLogo.style.filter = getColorFilter(colorHex);
            }
            
            // Cambiar color del scrollbar
            setScrollbarColor(colorHex);
        });
        
        item.addEventListener('mouseleave', function() {
            // Desactivar overlay
            overlay.style.opacity = '0';
            
            // Restaurar estilos del item
            this.style.border = '2px solid white';
            this.style.boxShadow = 'none';
            
            // Restaurar estilos de la sección principal
            mainSection.style.border = '2px solid rgba(255, 0, 0, 0.8)';
            mainSection.style.boxShadow = '0 0 20px 10px rgba(255, 0, 0, 0.8)';
            
            // Restaurar estilos del header y botones
            newsHeader.style.borderBottom = '3px solid rgb(255, 0, 0)';
            newsHeader.style.boxShadow = '0 5px 10px rgb(255, 0, 0)';
            
            buttonsLeft.forEach(btn => {
                btn.style.background = 'rgba(168, 7, 7, 0.3)';
                btn.style.border = '1px solid rgb(255, 0, 0)';
                btn.style.boxShadow = 'none';
            });
            
            filterButtons.forEach(btn => {
                btn.style.background = 'rgba(255, 0, 0, 0.2)';
                btn.style.border = '1px solid rgb(131, 1, 1)';
            });
            
            searchButtons.forEach(btn => {
                btn.style.background = 'rgba(255, 0, 0, 0.2)';
                btn.style.border = '1px solid rgb(131, 1, 1)';
            });
            
            if (calendarButton) {
                calendarButton.style.background = '#e40000';
                calendarButton.style.border = 'none';
            }
            
            // Quitar filtro del logo
            if (headerLogo) {
                headerLogo.style.filter = 'none';
            }
            
            // Restaurar scrollbar por defecto (rojo)
            resetScrollbar();
        });
    });
    
    // Función mejorada para generar filtro de color
    function getColorFilter(hex) {
        const colorFilters = {
            '#ff69b4': 'brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(500%) hue-rotate(300deg)',
            '#800080': 'brightness(0) saturate(100%) invert(10%) sepia(100%) saturate(5000%) hue-rotate(250deg)',
            '#008000': 'brightness(0) saturate(100%) invert(30%) sepia(100%) saturate(1000%) hue-rotate(100deg)',
            '#0000ff': 'brightness(0) saturate(100%) invert(10%) sepia(100%) saturate(5000%) hue-rotate(240deg)'
        };
        return colorFilters[hex] || 'none';
    }
    
    // Función para convertir hex a rgb
    function hexToRgbValues(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    }
    
    // Función para convertir hex a rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
});