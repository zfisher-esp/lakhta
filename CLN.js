// Función para abrir el calendario con Flatpickr
function openCalendar() {
    // Lista de fechas con eventos (formato YYYY-MM-DD)
    const eventDates = ["2023-08-20", "2023-09-15", "2024-01-10"];

    // Verificar si ya hay un input de tipo date y eliminarlo
    const existingInput = document.getElementById('date-picker');
    if (existingInput) existingInput.remove();

    // Crear el input de fecha con Flatpickr
    const input = document.createElement('input');
    input.type = 'text'; // Flatpickr requiere un input de tipo texto
    input.id = 'date-picker';
    input.style.position = 'absolute';
    input.style.top = '10px';
    input.style.right = '10px';
    input.style.zIndex = '1000';

    document.body.appendChild(input);

    // Inicializar Flatpickr con eventos resaltados
    flatpickr(input, {
        dateFormat: "d/m/Y",
        onChange: function (selectedDates, dateStr) {
            if (selectedDates.length > 0) {
                filterItemsByDate(dateStr); // Filtrar por la fecha seleccionada

                // Ocultar el botón original de "CALENDARIO", "FILTRO" y "BUSCAR"
                document.getElementById('calendar-button').style.display = 'none';
                document.getElementById('toggle-button').style.display = 'none';
                document.getElementById('search-button').style.display = 'none';

                // Eliminar input después de seleccionar fecha
                document.body.removeChild(input);

                // Verificar si los botones adicionales ya existen y eliminarlos para evitar duplicados
                const existingShowAllButton = document.getElementById('show-all-button');
                const existingCalendarButton = document.getElementById('calendar-button-alt');
                if (existingShowAllButton) existingShowAllButton.remove();
                if (existingCalendarButton) existingCalendarButton.remove();

                // Crear botón "MOSTRAR TODOS"
                const showAllButton = document.createElement('button');
                showAllButton.textContent = 'MOSTRAR TODOS';
                showAllButton.id = 'show-all-button';
                showAllButton.className = 'button-left';
                showAllButton.style.marginLeft = '10px';
                showAllButton.onclick = () => {
                    showAllItems(); // Mostrar todos los ítems
                    showAllButton.remove(); // Eliminar el botón después de usarlo
                    calendarButtonAlt.remove(); // También eliminar el botón alternativo "CALENDARIO"

                    // Restaurar los botones ocultos
                    document.getElementById('calendar-button').style.display = 'inline-block';
                    document.getElementById('toggle-button').style.display = 'inline-block';
                    document.getElementById('search-button').style.display = 'inline-block';
                };

                // Crear un nuevo botón "CALENDARIO" con imagen
                const calendarButtonAlt = document.createElement('button');
                calendarButtonAlt.id = 'calendar-button-alt';
                calendarButtonAlt.className = 'button-left calendar-button-with-icon';
                calendarButtonAlt.style.marginLeft = '-615px'; // Espacio reducido

                // Agregar imagen al botón
                const calendarIcon = document.createElement('img');
                calendarIcon.src = 'calendar-icon.jpg'; // Ruta de la imagen del calendario
                calendarIcon.alt = 'Calendario';
                calendarIcon.className = 'calendar-icon-img';
                calendarIcon.style.width = '100%';
                calendarIcon.style.height = '100%';

                calendarButtonAlt.appendChild(calendarIcon);
                calendarButtonAlt.onclick = openCalendar; // Llamar a la función de calendario sin modificar botones

                // Agregar los botones al encabezado
                document.getElementById('news-header').appendChild(showAllButton);
                document.getElementById('news-header').appendChild(calendarButtonAlt);
            }
        },
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj.toLocaleDateString("en-GB"); // Utilizar el formato de fecha local
            const formattedDate = date.split("/").reverse().join("-"); // Formatear a YYYY-MM-DD

            if (eventDates.includes(formattedDate)) {
                dayElem.style.backgroundColor = "yellow"; // Resaltar en amarillo
            }
        }
    });

    input.showPicker(); // Mostrar el calendario
}
