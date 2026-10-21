document.getElementById('formUbicacion').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreUbicacion').value.trim();
    const latInput = document.getElementById('latitud');
    const lonInput = document.getElementById('longitud');

    let lat = latInput.value.trim();
    let lon = lonInput.value.trim();

    
    if (nombre !== '') {
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(nombre)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                lat = data[0].lat;
                lon = data[0].lon;
                
                // Rellena los campos visualmente antes de abrir
                latInput.value = lat;
                lonInput.value = lon;
            } else {
                alert('No se encontró la ubicación ingresada.');
                return;
            }
        } catch (error) {
            console.error('Error al consultar la API:', error);
            alert('Hubo un problema al conectar con el servicio de geocodificación.');
            return;
        }
    }

    // 2. Validar que tenga coordenadas
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
        alert('Por favor ingrese coordenadas válidas o un nombre de ubicación.');
        return;
    }

    // 3. Abrir Google Maps en una pestaña nueva con las coordenadas
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(mapsUrl, '_blank');
});

