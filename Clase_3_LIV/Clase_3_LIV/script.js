const inputArchivo = document.getElementById('archivo');
const infoContainer = document.getElementById('informacion');

inputArchivo.addEventListener('change', (evento) => {
    const archivos = evento.target.files;

    // 1. Validar que exista un archivo seleccionado
    if (archivos.length === 0) {
        infoContainer.innerHTML = '<p>No se seleccionó ningún archivo.</p>';
        return;
    }

    const archivo = archivos[0];
    if (!archivo.type.startsWith('image/')) {
        infoContainer.innerHTML = '<p style="color: red;">El archivo no corresponde a una imagen.</p>';
        inputArchivo.value = ''; // Limpia el input
        return;
    }

    // 3. Extracción de metadatos
    const nombreCompleto = archivo.name;
    const tamano = archivo.size;

    //llamar a filereader api
    const reader = new FileReader();

    // Evento que se dispara cuando la lectura en memoria finaliza con éxito
    reader.addEventListener('load', (e) => {
        const urlBase64 = e.target.result; 

        // manejo de DOM
        infoContainer.innerHTML = `
            <p><strong>Nombre:</strong> ${nombreCompleto}</p>
            <p><strong>Tamaño:</strong> ${archivo.size} bytes </p>
            <div style="margin-top: 15px;">
                <p><strong>Vista previa:</strong></p>
                <img src="${urlBase64}" alt="${nombreCompleto}" style="max-width: 300px; max-height: 300px; border-radius: 8px; border: 1px solid #ccc;">
            </div>
        `;
    });

    // Manejo de errores 
    reader.addEventListener('error', () => {
        infoContainer.innerHTML = '<p style="color: red;">Ocurrió un error al intentar leer el archivo.</p>';
    });

    reader.readAsDataURL(archivo);
});