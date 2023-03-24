import React, { useContext } from 'react';
import Context from "../Context/Context"
import { useParams } from 'react-router-dom';
import { CiPizza } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";


export default function Navigation() {

    //Desestructuración global de datos.
    const { menu,seleccionadas, setSeleccionadas } = useContext(Context);
    //Capturar el valor de id  seleccionado a través de useparams
    const { id } = useParams();

    //Constante que define las opciones para pasar un número a latino CLP. 
    const option = {
        style: 'decimal',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }

    //Constante que almacena una pizza en particular obtenida desde el id de useParams.        
    const pizzaSola = menu.filter(num => num.id.toString() === id.toString());

    //Función que permite aumentar la cantidad de pizza seleccionada en 1. 
    const aumenta = (id) => {
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

    //función que imprime una pizza y sus características en particular. 
    const imprimirPizzaSola = () => {
        const arreglo =
            pizzaSola.map((pizza) => (
                <div key={pizza.id} className="d-flex flex-wrap justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2 px-3">
                        <div className="card mb-3 h-100">
                            <img
                                className="card-img-botton h-100"
                                src={pizza.image}
                                alt={pizza.name}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2 px-3">
                        <div className="card mb-3 h-100 ">
                            <div className="card-body ">
                                <h5 className="card-title">{pizza.name}</h5>
                                <p className="card-text text-justify">{pizza.description}</p>
                                <p className="card-text izquierda">Ingredientes:</p>
                                <ul className="list-group list-group-flush ">
                                    {pizza.ingredients.map((ingredient) => (
                                        <li key={ingredient} className="izquierdas list-unstyled" >
                                            <span className='text-danger'><CiPizza /></span>{ingredient}
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-body d-flex justify-content-between">
                                    <p className="card-text precio">Precio: {pizza.price.toLocaleString('es-CL', option)}</p>
                                    <p> <button onClick={() => aumenta(pizza.id)} className="btn btn-danger m-2">Añadir <FaShoppingCart/></button></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ));
        return arreglo;
    }
    return (
        <>
            {imprimirPizzaSola()}
        </>
    );
}