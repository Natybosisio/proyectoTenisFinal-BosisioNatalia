
function verificarReservasUsuario() {
	let inputDni = document.getElementById('inputDni').value;
	let dniUsuario = inputDni;
	let validado = validadDni(dniUsuario);
	if (validado == false) {
		return;
	} else {

		console.log(reservas);
		const reservasU = reservas.filter(reserva => reserva.dni === dniUsuario);
		console.log(reservasU);

		if (reservasU.length > 0) {
			for (let dniR of reservasU) {
				let resultadosPorId = document.getElementById('resultadosPorId');
				resultadosPorId.innerHTML += '<tr>' + '<th scope="row">' + dniR.dni + '</th>' + '<td>' + dniR.dia + '</td>' + '<td>' + dniR.hora + '</td>' + '<td>' + dniR.nombre + '</td>' + '</tr>';
			}
		} else {
			Swal.fire({
				title: 'No hay reservas guardadas',
			});
		}
	}
	document.querySelector("#inputDni").value = ""
}

function validadDni(dni) {
	let esDniValido = true;
	if (dni.length < 7 || dni.length > 12) {
		Swal.fire({
			icon: 'error',
			title: 'Ingrese un DNI valido',
			showClass: {
				popup: 'animate__animated animate__fadeInDown',

			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp',
			},
		});
		esDniValido = false;
	}
	return esDniValido;
}
