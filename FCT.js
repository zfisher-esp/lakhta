document.addEventListener("DOMContentLoaded", function() {
    // Función para manejar el clic en la cortina
    function handleCortinaClick(cortina) {
        cortina.style.opacity = "0";
        setTimeout(() => {
            cortina.style.display = "none";
        }, 500);
    }

    // Configurar observador de mutación para manejar elementos dinámicos
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Solo elementos
                    if (node.classList && node.classList.contains('cortina')) {
                        setupCortina(node);
                    }
                    // Buscar cortinas dentro de nodos añadidos
                    const cortinas = node.querySelectorAll ? node.querySelectorAll('.cortina') : [];
                    cortinas.forEach(setupCortina);
                }
            });
        });
    });

    // Configurar observador para el cuerpo del documento
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Función para configurar una cortina
    function setupCortina(cortina) {
        const imagen = cortina.querySelector("img");
        if (imagen) {
            // Eliminar event listeners previos para evitar duplicados
            imagen.removeEventListener('click', handleCortinaClick);
            // Añadir nuevo event listener
            imagen.addEventListener("click", function() {
                handleCortinaClick(cortina);
            });
        }
    }

    // Configurar cortinas iniciales
    const cortinasIniciales = document.querySelectorAll(".cortina");
    cortinasIniciales.forEach(setupCortina);
});