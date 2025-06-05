const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerClientes() {
    try {
        const respuesta = await fetch(`${API_URL}/clientes`);
        if (!respuesta.ok) throw new Error('Error al obtener clientes');
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function obtenerCliente(id) {
    try {
        const respuesta = await fetch(`${API_URL}/clientes/${id}`);
        if (!respuesta.ok) throw new Error('Error al obtener cliente');
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        return null;
    }
}

export async function actualizarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        return null;
    }
}

export async function eliminarCliente(id) {
    try {
        const respuesta = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'DELETE'
        });
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        return null;
    }
}
