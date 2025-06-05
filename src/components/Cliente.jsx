import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"
import ImgEditar from '../img/edit.svg' //importamos la imagen de editar
// se importa lo necesario
import ImgEliminar from '../img/trash.svg' //importamos la imagen de eliminar
export async function action({params}){
  await eliminarCliente(params.clienteId) //para estar seguros de que sea el id que enviamos
  return redirect('/')
}

function Cliente  ({cliente})  {

    const navigate = useNavigate()


    const { nombre, empresa, email, telefono, _id } = cliente
  return (
    <tr className="border-b rounded-xl hover:bg-gray-50 transition-colors">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
        <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>
      </td>

      <td className="p-6">
        <div className="flex flex-col justify-center h-full items-center">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col items-center text-center">
              <img
                className="w-12 h-12 ml-4 cursor-pointer"
                onClick={() => navigate(`/clientes/${_id}/editar`)}
                alt="Editar"
                src={ImgEditar}
              />
              <span className="font-bold text-sm text-sky-900 mt-1 text-center">Editar</span>
            </div>
            <Form
              method="post"
              action={`/clientes/${_id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm('¿Deseas Eliminar este registro?')) {
                  e.preventDefault()
                }
              }}
            >
              <button
                type="submit"
                className="flex flex-col items-center bg-transparent border-none p-0"
                style={{ outline: "none" }}
              >
                <img
                  className="w-12 h-12 ml-4 cursor-pointer"
                  alt="Eliminar"
                  src={ImgEliminar}
                />
                <span className="font-bold text-sm text-red-700 mt-1">Eliminar</span>
              </button>
            </Form>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Cliente
