import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Carro from "./views/Carro";
import NotFound from "./views/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context/Context";
import Pizza from "./views/Pizza";

function App() {

  //Generación de estados
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [seleccionadas, setSeleccionadas] = useState([]);


  //carga del listado de pizzas desde un Json.
  async function fetchlist() {

    const response = await fetch(`${process.env.PUBLIC_URL}/lista.json`);
    const data = await response.json();
    setMenu(data);
  }

  useEffect(() => {
    fetchlist();
  }, []);


  //Generación de la estados globales.
  const globalState = { menu, setMenu, total, setTotal, seleccionadas, setSeleccionadas };

  return (
    <div>
      <Context.Provider value={globalState}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/pizzaRob" element={<Home />} />
            <Route path="/carrito/" element={<Carro />} />
            <Route path="/pizza/:id/" element={<Pizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
