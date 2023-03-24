import React, { useContext } from 'react';
import Context from "../Context/Context"
import { CiPizza } from "react-icons/ci";

export default function Navigation() {

    const { menu, total, seleccionadas, setSeleccionadas } = useContext(Context);

    //Constante que define las opciones para pasar un número a latino CLP. 
    const option = {
        style: 'decimal',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    //Función que permite aumentar la cantidad de pizza seleccionada en 1. 
    const aumentarCantidad = (id) => {
        const pizzaIndex = seleccionadas.findIndex(pizza => pizza.id === id);
        if (pizzaIndex >= 0) {
            const newPizzas = [...seleccionadas];
            newPizzas[pizzaIndex].cantidad += 1;
            setSeleccionadas(newPizzas);
        } else {
            const pizza = menu.find(pizza => pizza.id === id);
            const newPizza = { id: id, cantidad: 1, price: pizza.price, image_100: pizza.image_100, name: pizza.name };
            setSeleccionadas([...seleccionadas, newPizza]);
        }

    };
    //Función que permite disminuir la cantidad de pizza seleccionada en 1. 
    const disminuirCantidad = (id) => {
        const updatedPizzas = seleccionadas.map(pizza => {
            if (pizza.id === id) {
                // Si la pizza existe y la cantidad es mayor a 0, disminuimos la cantidad
                if (pizza.cantidad > 0) {
                    return { ...pizza, cantidad: pizza.cantidad - 1 };
                }
            }
            return pizza;
        });

        // Eliminamos las pizzas que tengan una cantidad igual a 0
        const filteredPizzas = updatedPizzas.filter(pizza => pizza.cantidad !== 0);

        // Actualizamos el estado de la matriz de pizzas
        setSeleccionadas(filteredPizzas);
    }
    //Función que imprime los registros de las pizzas seleccionadas y permite aumentar o disminuir la cantidad de pizzas seleccionadas.
    const imprimir_carro = () => {
        const arreglo = seleccionadas.map((pizza, index) => (pizza.cantidad > 0 ?

            <tr key={index}>
                <td className='p-1'><img
                    className="card-img-top"
                    src={pizza.image_100}
                    alt={pizza.name}
                />
                </td>
                <td className='izquierda text-center'><span className='text-warning '><CiPizza /></span>{pizza.name}</td>

                <td className='izquierda text-center'>$ {(pizza.price * pizza.cantidad).toLocaleString('es-CL', option)}</td>
                <td><button className="btn btn-danger m-2" onClick={() => disminuirCantidad(pizza.id)}>-</button> </td>
                <td>  {pizza.cantidad}</td>
                <td> <button className="btn btn-primary m-2" onClick={() => aumentarCantidad(pizza.id)}>+</button></td>

            </tr>
            : null));
        return arreglo;
    }

    return (
        <div>
            <p className='display-6 text-white text-center'>Detalles del pedido:</p>
            <div className='abs-center'>
                <div className='card'>
                    <table className='text-center'>
                        <thead>
                            <tr>
                                <th width="20%"></th><th width="40%"></th ><th width="20%"></th><th width="5%"></th ><th width="10%"></th><th width="5%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {imprimir_carro()}
                        </tbody>
                    </table>
                </div>
            </div>
            <p className='total text-white text-center'>Total: $ {total.toLocaleString('es-CL', option)}</p>
            <div className='text-center'>
                <button className="btn btn-success m-2"><span>Ir a pagar</span></button>
            </div>
        </div>
    );
}