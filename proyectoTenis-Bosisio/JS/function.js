function cargarHorario() {
	horasHabilitadas.innerHTML = '';
	for (const hora of horariosDisponibles) {
		const option = document.createElement('option');
		option.innerText = hora;
		option.id = hora + 'horas';
		horasHabilitadas.append(option);
	}
}
cargarHorario();

//con esta funcion el usuario confirma la reserva y es cargada en mi array de reservas
function mostrarReserva() {
	dia = creado.value;
	hora = horasHabilitadas.value;
	nombre = nombreUsuario.value;
	dni = dniUsuario.value;
	precio = calcularPrecio()

	if (nombre !== '' && dni !== '' && dia !== "") {
		(resultadoUs.innerHTML =
			'<tr>' + '<td>' + creado.value + '</td>' +
			'<td>' + horasHabilitadas.value + 'hs' + '<td>' + precio),
			'</td>' + '</tr>';
		setTimeout(() => {
			registrarReserva()
		}, 2000);

	} else {
		Swal.fire({
			title: 'Complete todos los campos',
			icon: 'error',
			confirmButtonText: 'error',
		});
	}
}

function registrarReserva() {
	let nuevaReserva = new Reserva(dia, hora, nombre, dni);
	if (!compararReserva()) {
		alertPago(nuevaReserva);
	}
}

//con esta funcion informo al usuario si fue reservada previamente
function compararReserva() {
	let existeReserva = buscarCoincidencia(dia, hora);
	if (existeReserva) {
		Swal.fire({
			title: 'Lo siento',
			text: 'ese dia y horario ya fue reservado',
			icon: 'warning',
			confirmButtonText: 'vuelve a intentar',
		});
	}
	return existeReserva;
}

//verificaremos si el dia y la hora ya que sencuentran reservados.
function buscarCoincidencia(dia, hora) {
	let existeCita = false;

	for (let citaAux of reservas) {
		citaAux.informacion();
		existeCita = citaAux.verificarExistencia(dia, hora);
		if (existeCita) {
			break;
		}
	}
	return existeCita;
}

//finalización de compra
function alertPago(reserva) {

	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger',
		},
		buttonsStyling: false,
	});

	swalWithBootstrapButtons.fire({
		text: 'Esta a punto de reservar',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Continuar',
		cancelButtonText: 'No, cancelar!',
		confirmButtonColor: '#ffc107',
  		reverseButtons: true,

	})
		.then(result => {

			if (result.isConfirmed) {
				(async () => {
					const { value: email } = await Swal.fire({
						title: 'Le enviaremos el link de pago a su correo!',
						icon: 'info',
						text: 'ingrese su mail',
						input: 'email',
						allowEscapeKey: true,
						confirmButtonText: 'enviar',

					});
					if (email) {
						cargarReserva(reserva);
						swal.fire({
							position: 'top-start',
							icon: 'success',
							title: 'Revisa tu correo, gracias por elegirnos',
							showConfirmButton: false,
							timer: 4000,

						})

						setTimeout(() => {
							window.location.href = "../index.html"
						}, 2000);

					}

				})()

			} else if (result.dismiss === Swal.DismissReason.cancel) {
				swalWithBootstrapButtons.fire('Cancelada', 'Esperamos verte pronto por aca :)', 'error');
			}
		});
}

function cargarReserva(reserva) {
	reservas.push(reserva)
	localStorage.setItem('reservas', JSON.stringify(reservas))
	console.log('Se agregó una reserva nueva.')

}

