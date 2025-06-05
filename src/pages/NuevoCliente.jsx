import { useNavigate, Form, useActionData, redirect
    
 } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/clientes'; //importamos el js
import ImagenVolver from '../img/back-arrows.svg' //importamos la imagen de volver

export async function action({ request }) {
    const formData = await request.formData(); //va a tener todos los objetos del formulario
    const datos = Object.fromEntries(formData);
    const email = formData.get('email')

        // Validación
    const errores = []; //arreglo de errores vacio
    if (Object.values(datos).includes('')) {//si alguno de ellos tiene un campo vacio
            errores.push('Todos los campos son obligatorios');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"); //formato especial para los correos
    if(!regex.test(email)) {
        errores.push('El email no es valido')
    }

        // Retornar datos si hay errores

    if (Object.keys(errores).length) {
        return errores
    }

    await agregarCliente(datos)
    return redirect('/')
    }

function NuevoCliente() {

    const errores = useActionData() //con esto se pasa de una funcion a otra 
    const navigate = useNavigate()

    console.log(errores); //con este nos podemos dar cuenta de los errores

    return (
        <>
            <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
                            <p className="mt-3">Llena todos los campos para agregar un nuevo cliente</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                className="w-16 h-16 ml-4 cursor-pointer"
                                onClick={() => navigate(-1)}
                                alt="Volver"
                                src={ImagenVolver}
                            />
                            <span className="font-black text-sm text-sky-900 mt-1">volver</span>
                        </div>
                    </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length && errores.map(( error, i) => <Error key={i}>{error}</Error> )} {/* la "i" seria la posicion o el indice que tiene en ete arreglo */}
                <Form 
                    method='post'
                    noValidate

                >
                    <Formulario />
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    );
}

export default NuevoCliente;
