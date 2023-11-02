// librerías necesarias a utilizar
import React, { useState, useEffect } from 'react';
import './App.css';
import ListaContactos from './components/ListaContactos';
import FormularioContacto from './components/FormularioContacto';

// se define el estado del componente App
function App() {
    const [contactos, setContactos] = useState([]);
    const [contactoEditando, setContactoEditando] = useState(null);

    // se cargan los contactos desde localStorage
    useEffect(() => {
        const contactosGuardados = JSON.parse(localStorage.getItem('contactos') || '[]');
        setContactos(contactosGuardados);
    }, []);

    // funcion para guardar los contactos en localStorage
    const guardarEnLocalStorage = (contactos) => {
        localStorage.setItem('contactos', JSON.stringify(contactos));
    };

    // funcion para agregar un contacto
    const agregarContacto = (nuevoContacto) => {
        const nuevosContactos = [...contactos, nuevoContacto];
        setContactos(nuevosContactos);
        guardarEnLocalStorage(nuevosContactos);
    };

    // funcion para editar un contacto
    const editarContacto = (contactoEditado) => {
        const contactosActualizados = contactos.map((contacto) =>
        contacto.id === contactoEditado.id ? contactoEditado : contacto
        );
        setContactos(contactosActualizados);
        guardarEnLocalStorage(contactosActualizados);
        setContactoEditando(null);
    };

    // funcion para eliminar un contacto
    const eliminarContacto = (id) => {
        const contactosFiltrados = contactos.filter((contacto) => contacto.id !== id);
        setContactos(contactosFiltrados);
        guardarEnLocalStorage(contactosFiltrados);
    };

    // se renderiza el componente
    return (
        <div className="container">
            <FormularioContacto
                onAdd={agregarContacto}
                onEdit={editarContacto}
                contactoEditando={contactoEditando}
            />
            <ListaContactos
                contactos={contactos}
                onEdit={(contacto) => setContactoEditando(contacto)}
                onDelete={eliminarContacto}
            />
    </div>
    );
};
// se exporta el componente
export default App;
