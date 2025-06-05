import { useLoaderData } from 'react-router-dom'
import Cliente from '../components/Cliente'
import { obtenerClientes } from '../data/clientes'

export function loader(){

    const clientes = obtenerClientes()

    return clientes
       
}

function Index  ()  {

    const clientes = useLoaderData();
    

return (
    <>
            <h1 className="font-black text-4xl text-b">Clientes</h1>
            <p className="mt-3">Administra clientes</p>

            {clientes.length ? (
                    <table className="w-full bg-white shadow mt-5 table-auto rounded-xl overflow-hidden ">
                            <thead className="bg-blue-800 text-white">
                                    <tr>
                                            <th className="p-4 px-6">Clientes</th>
                                            <th className="p-4 px-6">Contacto</th>
                                            <th className="p-4 px-6">Acciones</th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {clientes.map(cliente => (
                                            <Cliente
                                                    cliente={cliente}
                                                    key={cliente.id}
                                            />
                                    ))}
                            </tbody>
                    </table>
            ) : (
                    <p className="text-center mt-10">No hay clientes aun</p>
            )}
    </>
)
}

export default Index
