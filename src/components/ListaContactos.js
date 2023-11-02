// librerías necesarias
import React, { useState, useEffect } from 'react';

// se define el estado del componente
function ListaContactos({ contactos, onEdit, onDelete }) {

	// variables para almacenar el filtro y los contactos 
	const [filtro, setFiltro] = useState('');
	const [contactosFiltrados, setContactosFiltrados] = useState([]);

	// funcion para actualizar los contactos 
	useEffect(() => {
		setContactosFiltrados(
			contactos.filter((contacto) =>
				contacto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
				contacto.numero.toLowerCase().includes(filtro.toLowerCase()) ||
				contacto.direccion.toLowerCase().includes(filtro.toLowerCase())
			)
		);
		},[filtro, contactos]
		);

	// se rendriza la lista de contactos
	return (
		<div class="container col-md-10">
			<h2>Lista de Contactos</h2>
			<input
				type="text"
				placeholder="Buscar contactos"
				value={filtro}
				onChange={(e) => setFiltro(e.target.value)}
			/>
			<ul>
				{contactosFiltrados.map((contacto) => (
				<li key={contacto.id}>
					<p>Nombre: {contacto.nombre}</p>
					<p>Número: {contacto.numero}</p>
					<p>Dirección: {contacto.direccion}</p>
					<button class="btn btn-sm btn-info" onClick={() => onEdit(contacto)}>Editar</button>
					<button class="btn btn-sm btn-danger" onClick={() => onDelete(contacto.id)}>Eliminar</button>
				</li>
				))}
			</ul>
		</div>
	);
};
// se exporta el componente
export default ListaContactos;
