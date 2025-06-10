document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".column-item");
    const mainContainer = document.body;

    // Crear el overlay
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: "999",
        opacity: "0", // Inicialmente transparente
        visibility: "hidden", // Oculto pero ocupa espacio
        transition: "opacity 0.3s ease, visibility 0.3s ease" // Transición suave
    });
    mainContainer.appendChild(overlay);

    // Crear el contenedor padre
    const newsContainer = document.createElement("div");
    Object.assign(newsContainer.style, {
        width: "75%",
        height: "500px",
        backgroundColor: "#fff",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: "1000",
        border: "2px solid red",
        opacity: "0", // Inicialmente transparente
        visibility: "hidden", // Oculto pero ocupa espacio
        transition: "opacity 0.3s ease 0.1s, visibility 0.3s ease 0.1s", // Retraso para que el overlay aparezca primero
        display: "flex" // Siempre flex pero controlado por visibility/opacity
    });

    // Contenedor izquierdo (30%)
    const leftContainer = document.createElement("div");
    Object.assign(leftContainer.style, {
        width: "30%",
        height: "100%",
        backgroundColor: "#0B0E00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
    });

    // Imagen de la noticia
    const newsImage = document.createElement("img");
    Object.assign(newsImage.style, {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "8px"
    });
    leftContainer.appendChild(newsImage);

    // Contenedor derecho (70%)
    const rightContainer = document.createElement("div");
    Object.assign(rightContainer.style, {
        width: "70%",
        height: "100%",
        padding: "20px",
        overflowY: "auto",
        fontSize: "18px",
        textAlign: "justify"
    });

    // Título de la noticia
    const newsTitle = document.createElement("h2");
    rightContainer.appendChild(newsTitle);

    // Contenido de la noticia
    const newsContent = document.createElement("p");
    rightContainer.appendChild(newsContent);

    // Botón de cerrar
    const closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    Object.assign(closeButton.style, {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer"
    });
    closeButton.addEventListener("click", function () {
        // Aplicar fade out
        newsContainer.style.opacity = "0";
        newsContainer.style.visibility = "hidden";
        
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
    });

    // Agregar elementos al contenedor principal
    newsContainer.appendChild(leftContainer);
    newsContainer.appendChild(rightContainer);
    newsContainer.appendChild(closeButton);
    mainContainer.appendChild(newsContainer);

    // Datos de prueba para las noticias
    const noticias = {
        "MEDIO AMBIENTE": { title: "DIA DEL MEDIO AMBIENTE", content: "Se celebra el día del medio ambiente donde se debaten los principales efectos y causantes del cambio climático", image: "./IMG/medio-ambiente.jpg" },
        "VISITA AL TEATRO": { title: "VISITA AL TEATRO", content: "El centro visita el teatro renovado de Huercal-Overa", image: "./NOTICIAS/3-1-1536x1152.jpg" },
        "VISITA AL CONVENTO": { title: "VISITA AL CONVENTO", content: "1º de Bachillerato visita un convento.", image: "./NOTICIAS/3-2.jpeg" },
        "SALÓN DE RECREATIVOS": { title : "SALÓN DE RECREATIVOS", content: "Máquinas recreativas renovadas con cientos de juegos para una diversión sin fin", image: "./NOTICIAS/3-300x169.jpeg" }
    };

    // Evento de clic para mostrar la noticia
    items.forEach(item => {
        item.addEventListener("click", function () {
            const noticia = noticias[item.querySelector(".column-item-text").innerText] || { title: "Noticia no encontrada", content: "No hay información disponible.", image: "" };
            
            newsTitle.innerText = noticia.title;
            newsContent.innerText = noticia.content;
            newsImage.src = noticia.image;
            
            // Aplicar fade in
            overlay.style.visibility = "visible";
            overlay.style.opacity = "1";
            
            // El contenedor aparece con un ligero retraso
            setTimeout(() => {
                newsContainer.style.visibility = "visible";
                newsContainer.style.opacity = "1";
            }, 100);
        });
    });
});