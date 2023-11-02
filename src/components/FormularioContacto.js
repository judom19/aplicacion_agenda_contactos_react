// librerías necesarias
import React, { useState, useEffect } from 'react';

// se define el estado del componente
function FormularioContacto({ onAdd, onEdit, contactoEditando }) {

    // variables para almacenar los datos del contacto
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [direccion, setDireccion] = useState('');

    // se cargan los datos del contacto que se estan editando
    useEffect(() => {
        if (contactoEditando) {
            setNombre(contactoEditando.nombre);
            setNumero(contactoEditando.numero);
            setDireccion(contactoEditando.direccion);
        }
    }, 
    [contactoEditando]
    );

    // funcion para procesar el envio del formulario
    const handleSubmit = (e) => {

        e.preventDefault();
        // en caso de estar editando un contacto, actualizarlo
        if (contactoEditando) {
            onEdit({ ...contactoEditando, nombre, numero, direccion });
        } 
        else {
            // caso contrario, se agrega un nuevo contacto
            onAdd({
                id: Math.random(),
                nombre,
                numero,
                direccion,
            });
        }
        // se limpian los campos del formulario
        setNombre('');
        setNumero('');
        setDireccion('');
    };

    // se renderiza el formulario
    return (
        <div class="container col-md-10 mt-5 mb-5">
            <h1 class="text-center p-3">Agenda de Contactos</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
                <button type="submit" class="btn btn-sm btn-primary">
                    {contactoEditando ? 'Editar Contacto' : 'Agregar Contacto'}
                </button>
            </form>
        </div>
    );
};
// se exporta el componente
export default FormularioContacto;
