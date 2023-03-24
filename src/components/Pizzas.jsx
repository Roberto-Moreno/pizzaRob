import React, { useContext } from 'react';
import Context from "../Context/Context"
import { useNavigate } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export default function Navigation() {
    //Desestructuración global de datos.
    const { menu, seleccionadas, setSeleccionadas } = useContext(Context);

    //Constante que define las opciones para pasar un número a latino CLP. 
    const option = {
        style: 'decimal',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }

    const navigate = useNavigate();

    //Función para navegar a una pizza en particular en caso de seleccionar una del menú.
    const handlePizzaClick = (id) => {
        navigate(`/pizza/${id}`);
    };

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

    return (
        <div className="container">

            <div className="d-flex flex-wrap justify-content-center ">
                {menu.map((pizza) => (
                    <div key={pizza.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-1 mb-2">
                        <div className="card bg bg-white h-100 ">
                            <img
                                className="card-img-top"
                                src={pizza.image_500}
                                alt={pizza.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title izquierda ">{pizza.name}</h5>

                                <p className="card-text izquierda">Ingredientes:</p>
                                <ul className="list-group list-group-flush ">
                                    {pizza.ingredients.map((ingredient) => (
                                        <li key={ingredient} className="izquierdas list-unstyled" >
                                            <span className='text-danger'><CiPizza /></span>{ingredient}
                                        </li>
                                    ))}
                                </ul>
                                <p className="card-text precio">$ {pizza.price.toLocaleString('es-CL', option)}</p>

                            </div>
                            <div className='card-footer border-0 bg-transparent'>
                                <button className="btn btn-primary m-2" onClick={() => handlePizzaClick(pizza.id)}>Ver más <AiOutlineEye /></button><button onClick={() => aumenta(pizza.id)} className="btn btn-danger m-2">Añadir <FaShoppingCart /></button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}