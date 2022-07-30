function formatosEspeciales() {
    const dt = DateTime.now()
    let inputSeleccionDia = document.getElementById("creado");

    inputSeleccionDia.min = dt.toFormat('yyyy-MM-dd');

    inputSeleccionDia.addEventListener('change', (e) => {
        let dia = e.currentTarget.valueAsDate.getUTCDay();
        if (dia == 0) {
            e.target.value = ""
            Swal.fire({
                title: 'Domingo nos encontramos cerrados',
                icon: 'error',
                confirmButtonText: 'aceptar',
            });

        }
    });
}



formatosEspeciales();